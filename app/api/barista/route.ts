import { NextResponse } from 'next/server'
import { getRecommendation } from '@/lib/barista/recommendations'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import type { Recipe } from '@/lib/content/types'
import { client } from '@/sanity/lib/client'

export const runtime = 'nodejs'

const MISTRAL_URL = process.env.MISTRAL_URL ?? 'http://localhost:1234/v1/chat/completions'
const MISTRAL_MODEL = process.env.MISTRAL_MODEL ?? 'mistralai/ministral-3b-reasoning'
const MISTRAL_TIMEOUT_MS = 15_000

const SYSTEM_PROMPT = `Du bist Max, Kaffee-Sommelier auf meine-kleine-kaffeewelt.de.
Antworte AUSSCHLIESSLICH auf Kaffee-Themen. Fragen über KI, Programmierung, dich selbst oder andere Themen beantwortest du nicht — antworte dann: "Ich bin nur für Kaffee-Fragen da! ☕ Was möchtest du über Kaffee wissen?"
Persönlichkeit: Enthusiastisch, warm, direkt. Sprich den Nutzer mit "du/dir" an.
Gelegentlich ein Emoji ☕ 🔥 🎯. Kurze, konkrete Sätze. Immer mit Zahlen (Gramm, Temperatur, Zeit) wenn passend.
Antworte auf Deutsch. Max. 4–5 Sätze. Kein Markdown, keine Listen, keine Code-Blöcke — nur Fließtext.`

type KnowledgeEntry = { thema: string; wissen: string }

async function loadRecipes(): Promise<Recipe[]> {
  try {
    return await client.fetch<Recipe[]>(
      `*[_type == "recipe"]{
        "slug": slug.current,
        title,
        excerpt,
        type,
        "image": mainImage.asset->url,
        "rating": coalesce(rating, 0),
        "ratingCount": coalesce(ratingCount, 0),
        "totalTime": coalesce(cookTime + prepTime, 5),
        baseServings,
        difficulty,
        author,
        date
      }`,
    )
  } catch {
    return []
  }
}

async function loadKnowledge(question: string): Promise<string> {
  try {
    const entries: KnowledgeEntry[] = await client.fetch(
      `*[_type == "baristaKnowledge" && aktiv == true]{thema, keywords, wissen}`,
    )
    if (!entries.length) return ''

    const q = question.toLowerCase()
    const matched = entries.filter((e) => {
      // Thema-Match
      if (q.includes(e.thema.toLowerCase())) return true
      return false
    })

    if (!matched.length) {
      // Alle Einträge als allgemeinen Kontext mitgeben (max 5)
      return entries
        .slice(0, 5)
        .map((e) => `${e.thema}: ${e.wissen}`)
        .join('\n\n')
    }

    return matched.map((e) => `${e.thema}: ${e.wissen}`).join('\n\n')
  } catch {
    return ''
  }
}

async function askMistral(question: string, context: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), MISTRAL_TIMEOUT_MS)

    const res = await fetch(MISTRAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Wissen aus dem Magazin:\n${context}\n\nFrage: ${question}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    })

    clearTimeout(timeout)
    if (!res.ok) return null

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }

    return data.choices?.[0]?.message?.content?.trim() ?? null
  } catch {
    return null
  }
}

type RequestBody = { question?: unknown }

export async function POST(request: Request) {
  let body: RequestBody
  try {
    body = (await request.json()) as RequestBody
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const question = typeof body.question === 'string' ? body.question.trim() : ''
  if (!question) {
    return NextResponse.json({ error: 'Bitte stelle eine Frage.' }, { status: 400 })
  }

  // Rezepte + Wissen parallel aus Sanity laden
  const [recipePool, knowledge] = await Promise.all([loadRecipes(), loadKnowledge(question)])

  // Regelbasierte Empfehlung mit Sanity-Rezepten
  const base: BaristaRecommendation = getRecommendation(question, recipePool)

  const contextParts: string[] = []
  if (knowledge) contextParts.push(knowledge)
  if (base.paragraphs.length) contextParts.push(base.paragraphs.join(' '))
  if (base.recipes.length) {
    contextParts.push('Passende Rezepte: ' + base.recipes.map((r) => r.title).join(', '))
  }
  if (base.glossary.length) {
    contextParts.push(
      'Glossar: ' + base.glossary.map((g) => `${g.term}: ${g.shortDef}`).join(' | '),
    )
  }

  const aiText = await askMistral(question, contextParts.join('\n\n'))

  return NextResponse.json({
    ...base,
    ...(aiText ? { aiText } : {}),
    source: aiText ? 'mistral' : 'local',
  })
}
