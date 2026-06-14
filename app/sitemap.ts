import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'
import {
  getAllArticles,
  getAllGlossaryTerms,
  getAllNews,
  getAllProducts,
  getAllRecipes,
} from '@/sanity/lib/fetch'

export const revalidate = 60

function toLastModified(value?: string): Date {
  if (!value) return new Date()

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()

  const staticPages = [
    '',
    '/artikel',
    '/news',
    '/rezepte',
    '/produkte',
    '/glossar',
    '/kategorien',
    '/kontakt',
    '/ueber-uns',
    '/impressum',
    '/datenschutz',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))

  const [articles, news, recipes, glossaryTerms, products] = await Promise.all([
    getAllArticles(),
    getAllNews(),
    getAllRecipes(),
    getAllGlossaryTerms(),
    getAllProducts(),
  ])

  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/artikel/${article.slug}`,
    lastModified: toLastModified(article.date),
  }))

  const newsPages = news.map((item) => ({
    url: `${siteUrl}/news/${item.slug}`,
    lastModified: toLastModified(item.date),
  }))

  const recipePages = recipes.map((recipe) => ({
    url: `${siteUrl}/rezepte/${recipe.slug}`,
    lastModified: toLastModified(recipe.date),
  }))

  const glossaryPages = glossaryTerms.map((term) => ({
    url: `${siteUrl}/glossar/${term.slug}`,
    lastModified: new Date(),
  }))

  const productPages = products.map((product) => ({
    url: `${siteUrl}/produkte/${product.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticPages,
    ...articlePages,
    ...newsPages,
    ...recipePages,
    ...glossaryPages,
    ...productPages,
  ]
}
