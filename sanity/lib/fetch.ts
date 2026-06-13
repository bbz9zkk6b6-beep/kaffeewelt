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

type SanityBlock = {
  type: string
  id: string
  text?: string
  cite?: string
  url?: string
  alt?: string
  caption?: string
}

type SanityArticleRaw = {
  slug: { current: string }
  title: string
  excerpt: string
  date: string
  readingTime: number
  featured?: boolean
  category?: string
  image?: string
  content?: SanityBlock[]
}

function mapBlock(b: SanityBlock): ArticleBlock | null {
  switch (b.type) {
    case 'heading':
      return { type: 'heading', id: b.id, text: b.text ?? '' }
    case 'paragraph':
      return { type: 'paragraph', text: b.text ?? '' }
    case 'quote':
      return { type: 'quote', text: b.text ?? '', cite: b.cite }
    case 'inlineImage':
      if (!b.url) return null
      return { type: 'inlineImage', url: b.url, alt: b.alt, caption: b.caption }
    default:
      return null
  }
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
    content: (raw.content ?? [])
      .map(mapBlock)
      .filter((b): b is ArticleBlock => b !== null),
  }
}

const fetchOpts = { next: { revalidate: 60 } }

export async function getAllArticles(): Promise<Article[]> {
  const data: SanityArticleRaw[] = await client.fetch(ARTICLES_QUERY, {}, fetchOpts)
  return data.map(toArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data: SanityArticleRaw | null = await client.fetch(
    ARTICLE_QUERY,
    { slug },
    fetchOpts,
  )
  if (!data) return null
  return toArticle(data)
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
    content: [],
  }
}

function parseNewsContent(blocks: any[]): ArticleBlock[] {
  if (!Array.isArray(blocks)) return []
  const result: ArticleBlock[] = []
  let headingCount = 0

  blocks.forEach((b) => {
    if (!b) return
    if (b._type !== 'block' || !Array.isArray(b.children)) return

    const text = b.children.map((c: any) => c.text ?? '').join('')
    if (!text) return

    if (b.style === 'h2' || b.style === 'h3') {
      result.push({ type: 'heading' as const, id: `h${headingCount++}`, text })
    } else {
      result.push({ type: 'paragraph' as const, text })
    }
  })

  return result
}

export async function getAllNews(): Promise<NewsItem[]> {
  const sanityData: SanityNewsRaw[] = await client.fetch(NEWS_QUERY, {}, fetchOpts)
  return sanityData.map(toNews)
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const data: any = await client.fetch(NEWS_ITEM_QUERY, { slug }, fetchOpts)
  if (data) {
    const item = toNews(data)
    item.content = parseNewsContent(data.content)
    return item
  }
  return null
}

// ── Glossar ───────────────────────────────────────────────────────────────

export type SanityGlossaryTerm = {
  slug: string
  term: string
  definition: string
  category: string
}

export async function getAllGlossaryTerms(): Promise<SanityGlossaryTerm[]> {
  const data = await client.fetch(
    `*[_type == "glossaryTerm"] | order(term asc) { "slug": slug.current, term, definition, category }`,
    {},
    fetchOpts,
  )
  return data
}

export async function getGlossaryTermBySlug(slug: string): Promise<SanityGlossaryTerm | null> {
  const data = await client.fetch(
    `*[_type == "glossaryTerm" && slug.current == $slug][0] { "slug": slug.current, term, definition, category }`,
    { slug },
    fetchOpts,
  )
  return data ?? null
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
