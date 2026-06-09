import { NextResponse } from 'next/server'
import { getRecommendation } from '@/lib/barista/recommendations'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'

// Feature-Flag: standardmäßig deaktiviert. Solange FALSE, antwortet
// ausschließlich die lokale, regelbasierte Engine – ohne externe Kosten.
const AI_ENABLED = process.env.ENABLE_AI_BARISTA === 'true'

export const runtime = 'nodejs'

type RequestBody = {
  question?: unknown
}

/**
 * Spätere KI-Erweiterung.
 *
 * TODO:
 * OpenAI-Integration aktivieren, wenn ENABLE_AI_BARISTA=true gesetzt ist.
 *
 * Die Infrastruktur ist bereits vorbereitet:
 *  - Das Flag oben schaltet zwischen lokaler Engine und KI um.
 *  - Diese Funktion erhält die geparste Empfehlung der Regel-Engine als
 *    Kontext ("grounding"), damit die KI nur auf Basis echter Daten
 *    (Mengen, Rezepte, Glossar) formuliert und nicht halluziniert.
 *  - Mengen, Rezepte, Glossar- und Artikel-Empfehlungen MÜSSEN weiterhin
 *    aus der lokalen Datenbasis stammen; die KI darf ausschließlich den
 *    Antworttext (paragraphs) veredeln.
 *
 * Beispielhafte spätere Implementierung:
 *
 *   import { generateText } from 'ai'
 *
 *   const { text } = await generateText({
 *     model: 'openai/gpt-5-mini',
 *     system: 'Du bist ein freundlicher, kompetenter Barista. Nutze ausschließlich die übergebenen Fakten.',
 *     prompt: buildPrompt(question, base),
 *   })
 *   return { ...base, source: 'ai', paragraphs: splitIntoParagraphs(text) }
 */
async function getAiRecommendation(
  question: string,
  base: BaristaRecommendation,
): Promise<BaristaRecommendation> {
  // Solange keine KI implementiert ist, geben wir die Regel-Empfehlung zurück.
  return base
}

export async function POST(request: Request) {
  let body: RequestBody
  try {
    body = (await request.json()) as RequestBody
  } catch {
    return NextResponse.json(
      { error: 'Ungültige Anfrage.' },
      { status: 400 },
    )
  }

  const question = typeof body.question === 'string' ? body.question.trim() : ''
  if (!question) {
    return NextResponse.json(
      { error: 'Bitte stelle eine Frage oder beschreibe deine Vorlieben.' },
      { status: 400 },
    )
  }

  // Immer zuerst die lokale, regelbasierte Empfehlung berechnen.
  const base = getRecommendation(question)

  // Wenn das Flag aktiv ist, später an die KI delegieren (aktuell No-Op).
  const recommendation = AI_ENABLED
    ? await getAiRecommendation(question, base)
    : base

  return NextResponse.json(recommendation)
}
