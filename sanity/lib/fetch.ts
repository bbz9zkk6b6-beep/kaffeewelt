import { client } from './client'
import { ARTICLES_QUERY, ARTICLE_QUERY } from './queries'
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
