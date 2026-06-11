import { client } from './client'
import { ARTICLES_QUERY, ARTICLE_QUERY } from './queries'
import type { Article, ArticleBlock } from '@/lib/content/types'

type SanityBlock = {
  type: string
  id: string
  text?: string
  cite?: string
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
    default:
      return null
  }
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
    image: raw.image ?? '/placeholder.svg',
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
