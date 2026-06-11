import { articles, recipes, news } from './index'
import { glossary } from './glossary'
import type { Article, NewsItem, Recipe } from './types'

export type IntegratedSearchResult = {
  type: 'glossary' | 'recipe' | 'article' | 'news'
  title: string
  slug: string
  description?: string
  image?: string
  link: string
  priority: number // 0 = highest (glossary), 1 = recipe, 2 = article/news
}

export type IntegratedSearchResponse = {
  glossary: IntegratedSearchResult[]
  recipe: IntegratedSearchResult | null
  articles: IntegratedSearchResult[]
  news: IntegratedSearchResult[]
  hasResults: boolean
}

/** Kombinierte Suche: durchsucht Glossar, Rezepte, Artikel und News mit intelligenter Priorität */
export function integratedSearch(query: string): IntegratedSearchResponse {
  const q = query.toLowerCase().trim()
  if (!q) {
    return {
      glossary: [],
      recipe: null,
      articles: [],
      news: [],
      hasResults: false,
    }
  }

  const glossaryResults: IntegratedSearchResult[] = []
  const recipeResults: IntegratedSearchResult[] = []
  const articleResults: IntegratedSearchResult[] = []
  const newsResults: IntegratedSearchResult[] = []

  // 1. Glossar durchsuchen (höchste Priorität)
  glossary.forEach((term) => {
    const textContent = term.content
      .filter((block) => block.type === 'paragraph')
      .map((block) => 'text' in block ? block.text : '')
      .join(' ')

    const matches =
      term.term.toLowerCase().includes(q) ||
      term.shortDef.toLowerCase().includes(q) ||
      (term.synonyms?.some((k: string) => k.toLowerCase().includes(q)) ?? false) ||
      textContent.toLowerCase().includes(q)

    if (matches) {
      glossaryResults.push({
        type: 'glossary',
        title: term.term,
        slug: term.slug,
        description: term.shortDef.substring(0, 120) + '...',
        priority: 0,
        link: `/glossar#${term.slug}`,
      })
    }
  })

  // 2. Rezepte durchsuchen (zweite Priorität)
  recipes.forEach((recipe: Recipe) => {
    const matches =
      recipe.title.toLowerCase().includes(q) ||
      recipe.excerpt.toLowerCase().includes(q) ||
      recipe.type.toLowerCase().includes(q)

    if (matches) {
      recipeResults.push({
        type: 'recipe',
        title: recipe.title,
        slug: recipe.slug,
        description: recipe.excerpt.substring(0, 120) + '...',
        image: recipe.image,
        priority: 1,
        link: `/rezepte/${recipe.slug}`,
      })
    }
  })

  // 3. Artikel durchsuchen
  articles.forEach((article: Article) => {
    const textContent = article.content
      .filter((block) => block.type === 'paragraph')
      .map((block) => 'text' in block ? block.text : '')
      .join(' ')

    const matches =
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      textContent.toLowerCase().includes(q)

    if (matches) {
      articleResults.push({
        type: 'article',
        title: article.title,
        slug: article.slug,
        description: article.excerpt.substring(0, 120) + '...',
        image: article.image,
        priority: 2,
        link: `/artikel/${article.slug}`,
      })
    }
  })

  // 4. News durchsuchen
  news.forEach((item: NewsItem) => {
    const textContent = item.content
      .filter((block) => block.type === 'paragraph')
      .map((block) => 'text' in block ? block.text : '')
      .join(' ')

    const matches =
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      textContent.toLowerCase().includes(q)

    if (matches) {
      newsResults.push({
        type: 'news',
        title: item.title,
        slug: item.slug,
        description: item.excerpt.substring(0, 120) + '...',
        image: item.image,
        priority: 2,
        link: `/news/${item.slug}`,
      })
    }
  })

  // Nur das erste Rezept als Haupt-Ergebnis
  const mainRecipe = recipeResults.length > 0 ? recipeResults[0] : null

  // Glossar-Ergebnisse limitieren (max 5)
  const limitedGlossary = glossaryResults.slice(0, 5)

  return {
    glossary: limitedGlossary,
    recipe: mainRecipe,
    articles: articleResults.slice(0, 4),
    news: newsResults.slice(0, 4),
    hasResults:
      limitedGlossary.length > 0 ||
      mainRecipe !== null ||
      articleResults.length > 0 ||
      newsResults.length > 0,
  }
}

