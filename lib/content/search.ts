import { articles } from './articles'
import { news } from './news'
import { recipes } from './recipes'
import { categories } from './categories'
import { glossary } from './glossary'
import { recipeTypeLabels } from './types'

export type SearchResultType =
  | 'Artikel'
  | 'News'
  | 'Rezept'
  | 'Kategorie'
  | 'Glossar'

export interface SearchResult {
  type: SearchResultType
  title: string
  excerpt: string
  href: string
  image?: string
  meta?: string
}

interface IndexEntry extends SearchResult {
  haystack: string
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Akzente entfernen
}

// Statischen Suchindex einmalig aufbauen.
const index: IndexEntry[] = [
  ...articles.map((a) => ({
    type: 'Artikel' as const,
    title: a.title,
    excerpt: a.excerpt,
    href: `/artikel/${a.slug}`,
    image: a.image,
    meta: 'Magazin',
    haystack: normalize(
      [
        a.title,
        a.excerpt,
        a.category,
        ...a.content.flatMap((b) =>
          'text' in b ? [b.text] : 'items' in b ? b.items : [],
        ),
      ].join(' '),
    ),
  })),
  ...news.map((n) => ({
    type: 'News' as const,
    title: n.title,
    excerpt: n.excerpt,
    href: `/news/${n.slug}`,
    image: n.image,
    meta: 'Aktuelles',
    haystack: normalize([n.title, n.excerpt, n.category].join(' ')),
  })),
  ...recipes.map((r) => ({
    type: 'Rezept' as const,
    title: r.title,
    excerpt: r.excerpt,
    href: `/rezepte/${r.slug}`,
    image: r.image,
    meta: recipeTypeLabels[r.type],
    haystack: normalize(
      [
        r.title,
        r.excerpt,
        recipeTypeLabels[r.type],
        ...r.ingredients.map((i) => i.name),
      ].join(' '),
    ),
  })),
  ...categories.map((c) => ({
    type: 'Kategorie' as const,
    title: c.name,
    excerpt: c.description,
    href: `/kategorie/${c.slug}`,
    meta: 'Thema',
    haystack: normalize([c.name, c.description].join(' ')),
  })),
  ...glossary.map((g) => ({
    type: 'Glossar' as const,
    title: g.term,
    excerpt: g.shortDef,
    href: `/glossar/${g.slug}`,
    meta: 'Begriff',
    haystack: normalize(
      [
        g.term,
        g.shortDef,
        ...g.content.flatMap((b) =>
          'text' in b ? [b.text] : 'items' in b ? b.items : [],
        ),
      ].join(' '),
    ),
  })),
]

export function searchContent(query: string, limit?: number): SearchResult[] {
  const q = normalize(query.trim())
  if (q.length < 2) return []

  const terms = q.split(/\s+/).filter(Boolean)

  const scored = index
    .map((entry) => {
      let score = 0
      for (const term of terms) {
        if (!entry.haystack.includes(term)) {
          score = -1
          break
        }
        // Treffer im Titel höher gewichten.
        if (normalize(entry.title).includes(term)) score += 3
        else score += 1
      }
      return { entry, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => {
      // haystack nicht nach außen geben.
      const { haystack, ...result } = s.entry
      void haystack
      return result
    })

  return typeof limit === 'number' ? scored.slice(0, limit) : scored
}
