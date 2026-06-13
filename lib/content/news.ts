import type { NewsItem } from './types'

// News werden ausschließlich in Sanity gepflegt.
export const news: NewsItem[] = []

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug)
}
