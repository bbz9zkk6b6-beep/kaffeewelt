// Auto-Discovery: verknüpft Barista-Empfehlungen automatisch mit allen
// Inhalten (Artikel, News, Rezepte, Glossar). Die Engine "lernt" dadurch
// mit jedem neuen Inhalt mit – es müssen keine manuellen Listen in rules.ts
// gepflegt werden. Neue Einträge in den Content-Arrays werden sofort
// berücksichtigt, sobald ihre Schlüsselwörter zur Frage passen.
import { articles } from '@/lib/content/articles'
import { news } from '@/lib/content/news'
import { recipes } from '@/lib/content/recipes'
import { glossary } from '@/lib/content/glossary'
import { recipeTypeLabels } from '@/lib/content/types'

// Akzente entfernen + klein schreiben, damit "Brühen" und "bruehen" matchen.
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Volltext eines Inhalts-Blocks (heading/paragraph/quote/list) extrahieren.
function blocksToText(
  blocks: { type: string; text?: string; items?: string[] }[],
): string {
  return blocks
    .flatMap((b) => (b.items ? b.items : b.text ? [b.text] : []))
    .join(' ')
}

type ContentKind = 'article' | 'news' | 'recipe' | 'glossary'

type IndexEntry = {
  kind: ContentKind
  slug: string
  // Titel separat, damit Titeltreffer höher gewichtet werden können.
  title: string
  haystack: string
}

// Einmalig aufgebauter Schlüsselwort-Index über ALLE Inhalte.
// Wird bei jedem neuen Eintrag automatisch größer (kein manuelles Mapping).
const index: IndexEntry[] = [
  ...articles.map((a) => ({
    kind: 'article' as const,
    slug: a.slug,
    title: a.title,
    haystack: normalize(
      [a.title, a.excerpt, a.category, blocksToText(a.content)].join(' '),
    ),
  })),
  ...news.map((n) => ({
    kind: 'news' as const,
    slug: n.slug,
    title: n.title,
    haystack: normalize(
      [n.title, n.excerpt, n.category, blocksToText(n.content)].join(' '),
    ),
  })),
  ...recipes.map((r) => ({
    kind: 'recipe' as const,
    slug: r.slug,
    title: r.title,
    haystack: normalize(
      [
        r.title,
        r.excerpt,
        recipeTypeLabels[r.type],
        ...r.ingredients.map((i) => i.name),
      ].join(' '),
    ),
  })),
  ...glossary.map((g) => ({
    kind: 'glossary' as const,
    slug: g.slug,
    title: g.term,
    haystack: normalize(
      [
        g.term,
        g.shortDef,
        ...(g.synonyms ?? []),
        blocksToText(g.content),
      ].join(' '),
    ),
  })),
]

export type DiscoveryResult = {
  articles: string[]
  news: string[]
  recipes: string[]
  glossary: string[]
}

// Findet zu einer Liste von Suchbegriffen die relevantesten Inhalte je Art.
// Ein Treffer im Titel zählt mehr als einer im Fließtext. Begriffe werden
// als ganze Phrasen gesucht (z. B. "french press").
export function discoverByKeywords(
  keywords: string[],
  limitPerKind = 4,
): DiscoveryResult {
  const phrases = keywords
    .map((k) => normalize(k.trim()))
    .filter((k) => k.length >= 3)

  if (phrases.length === 0) {
    return { articles: [], news: [], recipes: [], glossary: [] }
  }

  const scored = index
    .map((entry) => {
      let score = 0
      for (const phrase of phrases) {
        if (entry.title.length > 0 && normalize(entry.title).includes(phrase)) {
          score += 3
        } else if (entry.haystack.includes(phrase)) {
          score += 1
        }
      }
      return { entry, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  const result: DiscoveryResult = {
    articles: [],
    news: [],
    recipes: [],
    glossary: [],
  }

  for (const { entry } of scored) {
    const bucket =
      entry.kind === 'article'
        ? result.articles
        : entry.kind === 'news'
          ? result.news
          : entry.kind === 'recipe'
            ? result.recipes
            : result.glossary
    if (bucket.length < limitPerKind) bucket.push(entry.slug)
  }

  return result
}
