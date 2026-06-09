// Kernlogik: erzeugt aus einer Nutzerfrage eine vollständige Empfehlung.
// Alle Mengen, Rezepte, Begriffe und Artikel stammen aus der lokalen
// Datenbasis – es werden keine Inhalte erfunden.
import { brewMethods, type BrewMethodId } from '@/lib/content/brewing'
import { recipes } from '@/lib/content/recipes'
import { glossary } from '@/lib/content/glossary'
import { articles } from '@/lib/content/articles'
import { news } from '@/lib/content/news'
import type { Recipe, RecipeType } from '@/lib/content/types'
import { parseQuery } from './parser'
import { discoverByKeywords } from './discovery'
import {
  intensityMethod,
  methodArticles,
  methodGlossary,
  methodLabels,
  methodToBrew,
  milkMethod,
  problemAdvice,
  termMethod,
} from './rules'
import type { ParsedQuery, RecognizedMethod } from './types'

// Serialisierbares Ergebnis (für die API und die Server-Komponenten).
export type AmountSuggestion = {
  methodId: BrewMethodId
  methodLabel: string
  servings: number
  portionUnit: string
  coffeeG: number
  waterMl?: number
  milkMl?: number
  drinkG?: number
  withIce?: boolean
  ratio: string
  grind: string
  temperature: string
  hint: string
}

export type RecipeSuggestion = {
  slug: string
  title: string
  excerpt: string
  image: string
  rating: number
  ratingCount: number
  totalTime: number
}

export type GlossarySuggestion = {
  slug: string
  term: string
  shortDef: string
  title: string
}

export type ArticleSuggestion = {
  slug: string
  title: string
  excerpt: string
  image: string
  readingTime: number
}

export type NewsSuggestion = {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
}

export type BaristaRecommendation = {
  source: 'rules' | 'ai'
  parsed: ParsedQuery
  // 3–5 kurze Absätze als freundliche Antwort.
  paragraphs: string[]
  amounts?: AmountSuggestion
  recipes: RecipeSuggestion[]
  glossary: GlossarySuggestion[]
  articles: ArticleSuggestion[]
  news: NewsSuggestion[]
  // Werte zur Übergabe an den Rechner (Deep-Link/Prefill).
  calculator?: { methodId: BrewMethodId; servings: number }
}

const DEFAULT_SERVINGS = 2

// Welche Rezepttypen passen zu welcher erkannten Methode?
const methodRecipeTypes: Record<RecognizedMethod, RecipeType[]> = {
  filterkaffee: ['filterkaffee'],
  v60: ['filterkaffee'],
  chemex: ['filterkaffee'],
  'french-press': ['filterkaffee'],
  aeropress: ['filterkaffee', 'espresso'],
  'cold-brew': ['cold-brew', 'iced-coffee'],
  espresso: ['espresso', 'cappuccino', 'latte-macchiato'],
  cappuccino: ['cappuccino', 'latte-macchiato', 'espresso'],
  'flat-white': ['cappuccino', 'latte-macchiato', 'espresso'],
  'latte-macchiato': ['latte-macchiato', 'cappuccino'],
  'iced-coffee': ['iced-coffee', 'cold-brew'],
}

function toRecipeSuggestion(r: Recipe): RecipeSuggestion {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    rating: r.rating,
    ratingCount: r.ratingCount,
    totalTime: r.totalTime,
  }
}

function pickRecipes(method: RecognizedMethod | undefined): Recipe[] {
  if (method) {
    const types = methodRecipeTypes[method]
    const matched = recipes.filter((r) => types.includes(r.type))
    if (matched.length > 0) {
      return [...matched]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
    }
  }
  // Fallback: bestbewertete Rezepte.
  return [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 3)
}

function pickGlossary(slugs: string[]): GlossarySuggestion[] {
  const seen = new Set<string>()
  const result: GlossarySuggestion[] = []
  for (const slug of slugs) {
    if (seen.has(slug)) continue
    const term = glossary.find((g) => g.slug === slug)
    if (!term) continue
    seen.add(slug)
    result.push({
      slug: term.slug,
      term: term.term,
      shortDef: term.shortDef,
      title: `${term.term} erklärt – Bedeutung und Anwendung beim Kaffee`,
    })
    if (result.length >= 3) break
  }
  return result
}

function pickArticles(slugs: string[]): ArticleSuggestion[] {
  const seen = new Set<string>()
  const result: ArticleSuggestion[] = []
  for (const slug of slugs) {
    if (seen.has(slug)) continue
    const article = articles.find((a) => a.slug === slug)
    if (!article) continue
    seen.add(slug)
    result.push({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      image: article.image,
      readingTime: article.readingTime,
    })
    if (result.length >= 3) break
  }
  return result
}

function pickNews(slugs: string[]): NewsSuggestion[] {
  const seen = new Set<string>()
  const result: NewsSuggestion[] = []
  for (const slug of slugs) {
    if (seen.has(slug)) continue
    const item = news.find((n) => n.slug === slug)
    if (!item) continue
    seen.add(slug)
    result.push({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      image: item.image,
      date: item.date,
    })
    if (result.length >= 2) break
  }
  return result
}

// Leitet Suchbegriffe für die Auto-Discovery aus der erkannten Frage ab.
// Quellen: die Methode (Label + Slug), Intensität, Milch, Problem sowie
// markante Wörter aus der Originalfrage. So findet die Engine automatisch
// passende Inhalte – auch neue, die noch in keiner manuellen Liste stehen.
const STOPWORDS = new Set([
  'was',
  'ist',
  'wie',
  'eine',
  'einen',
  'für',
  'fur',
  'der',
  'die',
  'das',
  'und',
  'oder',
  'mit',
  'ohne',
  'ich',
  'mir',
  'mich',
  'mein',
  'meine',
  'habe',
  'kaffee',
  'machen',
  'möchte',
  'mochte',
  'bekomme',
  'gibt',
  'kann',
  'soll',
  'bei',
  'zum',
  'zur',
  'den',
  'dem',
])

function deriveKeywords(
  parsed: ParsedQuery,
  method: RecognizedMethod | undefined,
): string[] {
  const keywords: string[] = []
  if (method) {
    keywords.push(methodLabels[method], method.replace(/-/g, ' '))
  }
  if (parsed.intensity) keywords.push(parsed.intensity)
  if (parsed.milk) keywords.push(parsed.milk.replace(/-/g, ' '))
  if (parsed.problem) keywords.push(parsed.problem)

  // Markante Wörter (>3 Zeichen, keine Stoppwörter) aus der Originalfrage.
  for (const word of parsed.raw.toLowerCase().split(/[^a-zäöüß]+/)) {
    if (word.length > 3 && !STOPWORDS.has(word)) keywords.push(word)
  }
  return keywords
}

// Führt kuratierte Slugs (aus rules.ts) mit automatisch entdeckten zusammen.
// Kuratierte Einträge haben Vorrang, danach folgen die Discovery-Treffer.
function mergeSlugs(curated: string[], discovered: string[]): string[] {
  const result: string[] = []
  const seen = new Set<string>()
  for (const slug of [...curated, ...discovered]) {
    if (seen.has(slug)) continue
    seen.add(slug)
    result.push(slug)
  }
  return result
}

function buildAmounts(
  method: RecognizedMethod,
  servings: number,
): AmountSuggestion | undefined {
  const brewId = methodToBrew[method]
  const brew = brewMethods.find((m) => m.id === brewId)
  if (!brew) return undefined
  const unit = servings === 1 ? brew.portionUnit[0] : brew.portionUnit[1]
  return {
    methodId: brew.id,
    methodLabel: methodLabels[method],
    servings,
    portionUnit: unit,
    coffeeG: Math.round(brew.coffeePerPortion * servings),
    waterMl: brew.waterPerPortion ? brew.waterPerPortion * servings : undefined,
    milkMl: brew.milkPerPortion ? brew.milkPerPortion * servings : undefined,
    drinkG: brew.drinkPerPortion ? brew.drinkPerPortion * servings : undefined,
    withIce: brew.withIce,
    ratio: brew.ratio,
    grind: brew.grind,
    temperature: brew.temperature,
    hint: brew.hint,
  }
}

function intensityWord(intensity?: string): string {
  if (intensity === 'kräftig') return 'kräftigen'
  if (intensity === 'mild') return 'milden'
  return 'ausgewogenen'
}

// Hauptfunktion der regelbasierten Engine.
export function getRecommendation(input: string): BaristaRecommendation {
  const parsed = parseQuery(input)
  const paragraphs: string[] = []

  // 0) Definitionsfrage ("Was ist Crema?"): Begriff direkt erklären.
  if (parsed.definitionSlug) {
    const term = glossary.find((g) => g.slug === parsed.definitionSlug)
    if (term) {
      paragraphs.push(`${term.term}: ${term.shortDef}`)
      // Erster Fließtext-Block aus dem Glossar als vertiefende Erklärung.
      const firstText = term.content.find((b) => b.type === 'paragraph')
      if (firstText && 'text' in firstText) paragraphs.push(firstText.text)
      paragraphs.push(
        `Mehr Details findest du im Glossar – dort sind auch verwandte Begriffe verlinkt.`,
      )

      // Verwandte Begriffe + den Begriff selbst empfehlen.
      const glossarySlugs = [term.slug, ...(term.related ?? [])]
      // Passende Methode (falls der Begriff einer zugeordnet ist) für Rezepte.
      const relatedMethod = termMethod[term.slug]

      // Auto-Discovery: aus dem Begriff + seinen Synonymen passende Inhalte
      // über die gesamte Wissensbasis finden (lernt mit neuen Inhalten mit).
      const discovered = discoverByKeywords([
        term.term,
        ...(term.synonyms ?? []),
      ])

      return {
        source: 'rules',
        parsed,
        paragraphs,
        recipes: pickRecipes(relatedMethod).map(toRecipeSuggestion),
        glossary: pickGlossary(
          mergeSlugs(glossarySlugs, discovered.glossary),
        ),
        articles: pickArticles(
          mergeSlugs(
            [
              ...(term.relatedArticles ?? []),
              ...(relatedMethod ? methodArticles[relatedMethod] ?? [] : []),
            ],
            discovered.articles,
          ),
        ),
        news: pickNews(discovered.news),
      }
    }
  }

  // 1) Methode bestimmen (explizit > über Milch > über Intensität > Default).
  const method: RecognizedMethod =
    parsed.method ??
    (parsed.milk && milkMethod[parsed.milk]) ??
    (parsed.intensity && intensityMethod[parsed.intensity]) ??
    'filterkaffee'

  const servings = parsed.servings ?? DEFAULT_SERVINGS

  // 2) Problem-Fall: gezielte Ursachen + Tipps.
  if (parsed.problem) {
    const advice = problemAdvice[parsed.problem]
    paragraphs.push(`${advice.label}? ${advice.cause}`)
    paragraphs.push(
      `Das hilft meist: ${advice.tips.join(' ')}`,
    )
    if (parsed.method) {
      paragraphs.push(
        `Für deine Zubereitung mit ${methodLabels[method]} findest du unten die passenden Eckwerte und Rezepte.`,
      )
    }

    const glossarySlugs = [
      ...advice.glossary,
      ...(methodGlossary[method] ?? []),
    ]
    const amounts = buildAmounts(method, servings)
    const discovered = discoverByKeywords(deriveKeywords(parsed, method))
    return {
      source: 'rules',
      parsed,
      paragraphs,
      amounts: parsed.method ? amounts : undefined,
      recipes: pickRecipes(parsed.method ? method : undefined).map(
        toRecipeSuggestion,
      ),
      glossary: pickGlossary(mergeSlugs(glossarySlugs, discovered.glossary)),
      articles: pickArticles(
        mergeSlugs(methodArticles[method] ?? [], discovered.articles),
      ),
      news: pickNews(discovered.news),
      calculator:
        parsed.method && amounts
          ? { methodId: amounts.methodId, servings }
          : undefined,
    }
  }

  // 3) Empfehlungsfall: freundliche Begründung zusammensetzen.
  const label = methodLabels[method]
  const intro = parsed.servings
    ? `Für ${servings} ${servings === 1 ? 'Person' : 'Personen'} empfehle ich ${label}.`
    : `Ich empfehle dir ${label}.`

  let reason = ''
  if (parsed.intensity) {
    reason = `Diese Zubereitung passt gut zu einem ${intensityWord(parsed.intensity)} Kaffee`
    reason += parsed.servings ? ' und lässt sich unkompliziert für mehrere Tassen zubereiten.' : '.'
  } else if (parsed.milk === 'mit-milch' || parsed.milk === 'viel-milch') {
    reason =
      'Mit aufgeschäumter Milch entsteht ein cremiges Getränk, das vielen besonders gut schmeckt.'
  } else if (parsed.servings && parsed.servings >= 4) {
    reason =
      'Sie eignet sich hervorragend für größere Runden und ist dabei unkompliziert.'
  } else {
    reason =
      'Sie ist vielseitig, gelingt zuverlässig und eignet sich gut für den Alltag.'
  }

  paragraphs.push(intro + ' ' + reason)

  // Den zentralen Glossarbegriff der Methode kurz erklären (Glossar-Mehrwert
  // direkt in der Antwort, nicht nur als Kartenverweis).
  const keyGlossarySlug = (methodGlossary[method] ?? [])[0]
  const keyTerm = keyGlossarySlug
    ? glossary.find((g) => g.slug === keyGlossarySlug)
    : undefined
  if (keyTerm) {
    paragraphs.push(`Gut zu wissen – ${keyTerm.term}: ${keyTerm.shortDef}`)
  }

  paragraphs.push(
    'Unten findest du die genauen Mengen für deine Tasse – die Werte kannst du direkt in den Rezeptmengen-Rechner übernehmen.',
  )

  const amounts = buildAmounts(method, servings)
  const discovered = discoverByKeywords(deriveKeywords(parsed, method))

  return {
    source: 'rules',
    parsed,
    paragraphs,
    amounts,
    recipes: pickRecipes(method).map(toRecipeSuggestion),
    glossary: pickGlossary(
      mergeSlugs(methodGlossary[method] ?? [], discovered.glossary),
    ),
    articles: pickArticles(
      mergeSlugs(methodArticles[method] ?? [], discovered.articles),
    ),
    news: pickNews(discovered.news),
    calculator: amounts ? { methodId: amounts.methodId, servings } : undefined,
  }
}
