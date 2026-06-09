import type { Article, NewsItem, Recipe } from './types'
import { recipeTypeLabels } from './types'
import { getCategory } from './categories'

// Zentrale Taxonomie / Seitenstruktur von "Meine kleine Kaffeewelt".
// Definiert die Sektionen der Website und liefert daraus konsistente
// Brotkrumen-Pfade (Breadcrumbs) für jede Inhaltsart.

export type Crumb = {
  name: string
  href?: string
}

export type SectionKey =
  | 'magazin'
  | 'artikel'
  | 'news'
  | 'rezepte'
  | 'kategorien'
  | 'glossar'
  | 'ueber-uns'
  | 'kontakt'
  | 'rechtliches'

type Section = {
  key: SectionKey
  name: string
  href: string
}

export const sections: Record<SectionKey, Section> = {
  magazin: { key: 'magazin', name: 'Magazin', href: '/kategorien' },
  artikel: { key: 'artikel', name: 'Artikel', href: '/artikel' },
  news: { key: 'news', name: 'News', href: '/news' },
  rezepte: { key: 'rezepte', name: 'Rezepte', href: '/rezepte' },
  kategorien: { key: 'kategorien', name: 'Kategorien', href: '/kategorien' },
  glossar: { key: 'glossar', name: 'Glossar', href: '/glossar' },
  'ueber-uns': { key: 'ueber-uns', name: 'Über uns', href: '/ueber-uns' },
  kontakt: { key: 'kontakt', name: 'Kontakt', href: '/kontakt' },
  rechtliches: { key: 'rechtliches', name: 'Rechtliches', href: '#' },
}

// Brotkrumen für eine einfache Sektionsseite (z. B. /news, /rezepte)
export function sectionCrumbs(key: SectionKey): Crumb[] {
  const section = sections[key]
  return [{ name: section.name, href: section.href }]
}

// Brotkrumen für eine Kategorie-Detailseite
export function categoryCrumbs(slug: string): Crumb[] {
  const category = getCategory(slug)
  return [
    { name: sections.kategorien.name, href: sections.kategorien.href },
    { name: category?.name ?? 'Kategorie' },
  ]
}

// Brotkrumen für einen Magazin-Artikel: Kategorien › <Kategorie> › <Titel>
export function articleCrumbs(article: Article): Crumb[] {
  const category = getCategory(article.category)
  return [
    { name: sections.kategorien.name, href: sections.kategorien.href },
    ...(category
      ? [{ name: category.name, href: `/kategorie/${category.slug}` }]
      : []),
    { name: article.title },
  ]
}

// Brotkrumen für einen News-Beitrag: News › <Titel>
export function newsCrumbs(item: NewsItem): Crumb[] {
  return [
    { name: sections.news.name, href: sections.news.href },
    { name: item.title },
  ]
}

// Brotkrumen für einen Glossarbegriff: Glossar › <Begriff>
export function glossaryCrumbs(term: string): Crumb[] {
  return [
    { name: sections.glossar.name, href: sections.glossar.href },
    { name: term },
  ]
}

// Brotkrumen für ein Rezept: Rezepte › <Rezeptart> › <Titel>
export function recipeCrumbs(recipe: Recipe): Crumb[] {
  return [
    { name: sections.rezepte.name, href: sections.rezepte.href },
    {
      name: recipeTypeLabels[recipe.type],
      href: `/rezepte?typ=${recipe.type}`,
    },
    { name: recipe.title },
  ]
}
