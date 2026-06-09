'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArticleCard } from '@/components/article-card'
import { getCategory, type Article } from '@/lib/content'
import { cn } from '@/lib/utils'

type Filter = 'alle' | string

export function ArticleFilter({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('kategorie')

  // Nur Kategorien anzeigen, für die es auch Artikel gibt
  const availableCategories = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => set.add(a.category))
    return Array.from(set)
  }, [articles])

  const initialFilter: Filter =
    catParam && availableCategories.includes(catParam) ? catParam : 'alle'

  const [filter, setFilter] = useState<Filter>(initialFilter)

  const filtered = useMemo(
    () =>
      filter === 'alle'
        ? articles
        : articles.filter((a) => a.category === filter),
    [filter, articles],
  )

  const filters: Filter[] = ['alle', ...availableCategories]

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Artikel filtern"
      >
        {filters.map((f) => {
          const active = f === filter
          const label = f === 'alle' ? 'Alle Artikel' : getCategory(f)?.name ?? f
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                active
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-card text-foreground/80 hover:border-accent hover:text-foreground',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'Artikel' : 'Artikel'}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} post={article} basePath="artikel" />
        ))}
      </div>
    </div>
  )
}
