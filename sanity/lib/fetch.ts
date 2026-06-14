import { client } from './client'
import {
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  NEWS_ITEM_QUERY,
  NEWS_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_QUERY,
} from './queries'
import type { Article, ArticleBlock } from '@/lib/content/types'

type SanityArticleRaw = {
  slug: { current: string }
  title: string
  excerpt: string
  date: string
  readingTime: number
  featured?: boolean
  category?: string
  image?: string
  imageLqip?: string
  content?: any[]
  relatedArticles?: any[]
  relatedRecipes?: any[]
}

function parsePortableText(blocks: any[]): ArticleBlock[] {
  if (!Array.isArray(blocks)) return []
  const result: ArticleBlock[] = []
  let headingCount = 0

  blocks.forEach((b) => {
    if (!b) return

    // Bereits konvertierte Custom-Typen (aus alter Migration)
    if (b._type === 'paragraph' && b.text) {
      result.push({ type: 'paragraph', text: b.text })
      return
    }
    if (b._type === 'heading' && b.text) {
      result.push({ type: 'heading', id: b.id ?? `h${headingCount++}`, text: b.text })
      return
    }
    if (b._type === 'quote' && b.text) {
      result.push({ type: 'quote', text: b.text, cite: b.cite })
      return
    }
    if (b._type === 'list' && Array.isArray(b.items)) {
      result.push({ type: 'list', items: b.items })
      return
    }
    if (b._type === 'inlineImage' && b.url) {
      result.push({ type: 'inlineImage', url: b.url, alt: b.alt, caption: b.caption })
      return
    }

    if (b._type === 'image' && b.asset) {
      const url = b.asset?.url ?? b.asset?._ref ?? ''
      if (url) result.push({ type: 'inlineImage', url, alt: b.alt, caption: b.caption })
      return
    }

    if (b._type !== 'block' || !Array.isArray(b.children)) return
    const text = b.children.map((c: any) => c.text ?? '').join('')
    if (!text.trim()) return

    // Bullet-Liste: an letztes list-Element anhängen oder neu anlegen
    if (b.listItem === 'bullet') {
      const last = result[result.length - 1]
      if (last && last.type === 'list') {
        ;(last as { type: 'list'; items: string[] }).items.push(text)
      } else {
        result.push({ type: 'list', items: [text] })
      }
      return
    }

    const parts = text.split(/\n\s*\n+/).map((p: string) => p.trim()).filter(Boolean)
    if (!parts.length) return

    if (b.style === 'h2' || b.style === 'h3') {
      result.push({ type: 'heading', id: `h${headingCount++}`, text: parts.join(' ') })
    } else if (b.style === 'blockquote') {
      result.push({ type: 'quote', text: parts.join(' ') })
    } else {
      parts.forEach((p: string) => result.push({ type: 'paragraph', text: p }))
    }
  })

  return result
}

// Sanity CDN-URL auf optimierte Größe bringen:
// 21:9-Header → 1200px breit, WebP, Q80 → ~100-200 KB statt 2-3 MB
function optimizeSanityImage(url: string | undefined, width = 1200): string {
  if (!url) return '/placeholder.svg'
  if (!url.startsWith('https://cdn.sanity.io')) return url
  return `${url}?w=${width}&auto=format&q=80&fit=crop`
}

function toArticle(raw: SanityArticleRaw): Article {
  return {
    slug: raw.slug.current,
    title: raw.title,
    excerpt: raw.excerpt,
    date: raw.date?.slice(0, 10) ?? '',
    readingTime: raw.readingTime ?? 0,
    featured: raw.featured ?? false,
    category: raw.category ?? '',
    author: '',
    image: optimizeSanityImage(raw.image),
    imageLqip: raw.imageLqip,
    content: parsePortableText(raw.content ?? []),
  }
}

const fetchOpts = { next: { revalidate: 60 } }

export async function getAllArticles(): Promise<Article[]> {
  const data: SanityArticleRaw[] = await client.fetch(ARTICLES_QUERY, {}, fetchOpts)
  return data.map(toArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data: any = await client.fetch(ARTICLE_QUERY, { slug }, fetchOpts)
  if (!data) return null
  const article = toArticle(data) as any
  article.relatedArticles = (data.relatedArticles ?? []).map((a: any) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? '',
    category: a.category ?? '',
    author: '',
    date: a.date?.slice(0, 10) ?? '',
    readingTime: a.readingTime ?? 5,
    featured: a.featured ?? false,
    image: optimizeSanityImage(a.image),
    imageLqip: a.imageLqip,
    content: [],
  }))
  article.relatedRecipes = (data.relatedRecipes ?? []).map((r: any) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? '',
    type: r.type ?? '',
    difficulty: r.difficulty ?? '',
    totalTime: r.totalTime ?? 0,
    image: optimizeSanityImage(r.image, 800),
    imageLqip: r.imageLqip,
  }))
  return article
}

// ── News ──────────────────────────────────────────────────────────────────

import type { NewsItem } from '@/lib/content/types'

type SanityNewsRaw = {
  slug: { current: string }
  title: string
  excerpt?: string
  date?: string
  readingTime?: number
  image?: string
  imageLqip?: string
  category?: string
}

function toNews(raw: SanityNewsRaw): NewsItem {
  return {
    slug: raw.slug.current,
    title: raw.title,
    excerpt: raw.excerpt ?? '',
    category: raw.category ?? '',
    author: '',
    date: raw.date?.slice(0, 10) ?? '',
    readingTime: raw.readingTime ?? 2,
    image: optimizeSanityImage(raw.image, 800),
    imageLqip: raw.imageLqip,
    content: [],
  }
}


export async function getAllNews(): Promise<NewsItem[]> {
  const sanityData: SanityNewsRaw[] = await client.fetch(NEWS_QUERY, {}, fetchOpts)
  return sanityData.map(toNews)
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const data: any = await client.fetch(NEWS_ITEM_QUERY, { slug }, fetchOpts)
  if (data) {
    const item = toNews(data) as any
    item.content = parsePortableText(data.content)
    item.relatedNews = (data.relatedNews ?? []).map((n: any) => ({
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt ?? '',
      category: n.category ?? '',
      author: '',
      date: n.date?.slice(0, 10) ?? '',
      readingTime: n.readingTime ?? 2,
      image: optimizeSanityImage(n.image, 800),
      imageLqip: n.imageLqip,
      content: [],
    }))
    item.relatedArticles = (data.relatedArticles ?? []).map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? '',
      category: a.category ?? '',
      author: '',
      date: a.date?.slice(0, 10) ?? '',
      readingTime: a.readingTime ?? 5,
      featured: a.featured ?? false,
      image: optimizeSanityImage(a.image),
      imageLqip: a.imageLqip,
      content: [],
    }))
    return item
  }
  return null
}

// ── Glossar ───────────────────────────────────────────────────────────────

import { GLOSSARY_QUERY, GLOSSARY_TERM_QUERY } from './queries'

export type SanityGlossaryTerm = {
  slug: string
  term: string
  definition: string
  category: string
  categoryTitle: string
  synonyms?: string[]
  content?: any[]
  faq?: { question: string; answer: string }[]
  relatedTerms?: { term: string; slug: string; definition: string }[]
  relatedArticles?: { slug: string; title: string; excerpt: string; date: string; readingTime: number; featured?: boolean; category?: string; image?: string }[]
  relatedRecipes?: { slug: string; title: string; excerpt: string; type?: string; difficulty?: string; totalTime?: number; image?: string }[]
}

export async function getAllGlossaryTerms(): Promise<SanityGlossaryTerm[]> {
  const data = await client.fetch(GLOSSARY_QUERY, {}, fetchOpts)
  return data
}

export async function getGlossaryTermBySlug(slug: string): Promise<SanityGlossaryTerm | null> {
  const data = await client.fetch(GLOSSARY_TERM_QUERY, { slug }, fetchOpts)
  if (!data) return null
  return { ...data, content: parsePortableText(data.content ?? []) }
}

// ── Rezepte ───────────────────────────────────────────────────────────────

import { RECIPES_QUERY, RECIPE_QUERY } from './queries'
import type { Recipe } from '@/lib/content/types'

type SanityRecipeRaw = {
  slug: { current: string }
  title: string
  excerpt: string
  type: string
  difficulty: string
  totalTime: number
  baseServings: number
  ingredients: any[]
  steps: any[]
  tips: string[]
  nutrition: any
  image?: string
  imageLqip?: string
  featured?: boolean
  date?: string
}

function toRecipe(raw: SanityRecipeRaw): Recipe {
  return {
    slug: raw.slug.current,
    title: raw.title,
    excerpt: raw.excerpt ?? '',
    type: raw.type as Recipe['type'],
    difficulty: raw.difficulty as Recipe['difficulty'],
    totalTime: raw.totalTime ?? 0,
    baseServings: raw.baseServings ?? 1,
    rating: 0,
    ratingCount: 0,
    image: optimizeSanityImage(raw.image, 800),
    imageLqip: raw.imageLqip,
    author: '',
    date: raw.date?.slice(0, 10) ?? '',
    featured: raw.featured ?? false,
    ingredients: raw.ingredients ?? [],
    steps: raw.steps ?? [],
    tips: raw.tips ?? [],
    nutrition: raw.nutrition ?? { kcal: 0, fett: 0, kohlenhydrate: 0, eiweiss: 0 },
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const data: SanityRecipeRaw[] = await client.fetch(RECIPES_QUERY, {}, fetchOpts)
  return data.map(toRecipe)
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const data: SanityRecipeRaw | null = await client.fetch(RECIPE_QUERY, { slug }, fetchOpts)
  if (!data) return null
  return toRecipe(data)
}

// ── Produkte ──────────────────────────────────────────────────────────────

export type SanityProduct = {
  slug: string
  title: string
  excerpt: string
  category: string
  featured: boolean
  priceHint?: string
  pros?: string[]
  cons?: string[]
  affiliateUrl?: string
  affiliateSlug?: string
  image: string
  body?: Array<{ type: string; id: string; text?: string }>
}

type SanityProductRaw = {
  slug: { current: string }
  title: string
  excerpt: string
  category: string
  featured?: boolean
  priceHint?: string
  pros?: string[]
  cons?: string[]
  affiliateUrl?: string
  affiliateSlug?: string
  image?: string
  body?: Array<{ type: string; id: string; text?: string }>
}

function toProduct(raw: SanityProductRaw): SanityProduct {
  return {
    slug: raw.slug.current,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    featured: raw.featured ?? false,
    priceHint: raw.priceHint,
    pros: raw.pros ?? [],
    cons: raw.cons ?? [],
    affiliateUrl: raw.affiliateUrl,
    affiliateSlug: raw.affiliateSlug,
    image: optimizeSanityImage(raw.image, 800),
    body: raw.body ?? [],
  }
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  const data: SanityProductRaw[] = await client.fetch(PRODUCTS_QUERY, {}, fetchOpts)
  return data.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  const data: SanityProductRaw | null = await client.fetch(
    PRODUCT_QUERY,
    { slug },
    fetchOpts,
  )
  if (!data) return null
  return toProduct(data)
}
