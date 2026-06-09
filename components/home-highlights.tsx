import Link from 'next/link'
import { Star, TrendingUp, Lightbulb, FlaskConical } from 'lucide-react'
import { getFactOfTheDay } from '@/lib/content/facts'
import type { Recipe } from '@/lib/content'
import type { NewsItem } from '@/lib/content'

export function HomeHighlights({
  recipeOfWeek,
  trend,
  tested,
}: {
  recipeOfWeek: Recipe
  trend: NewsItem
  tested: Recipe
}) {
  const fact = getFactOfTheDay()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Link
        href={`/rezepte/${recipeOfWeek.slug}`}
        className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
          <Star className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Rezept der Woche
        </span>
        <span className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-accent">
          {recipeOfWeek.title}
        </span>
        <span className="text-sm text-muted-foreground">
          {recipeOfWeek.excerpt}
        </span>
      </Link>

      <Link
        href={`/news/${trend.slug}`}
        className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
          <TrendingUp className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Trend des Monats
        </span>
        <span className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-accent">
          {trend.title}
        </span>
        <span className="text-sm text-muted-foreground">{trend.excerpt}</span>
      </Link>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
          <Lightbulb className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Kaffee-Fakt des Tages
        </span>
        <span className="font-serif text-lg font-bold leading-snug text-foreground">
          {fact.title}
        </span>
        <span className="text-sm text-muted-foreground">{fact.text}</span>
      </div>

      <Link
        href={`/rezepte/${tested.slug}`}
        className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
          <FlaskConical className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Neu getestet
        </span>
        <span className="font-serif text-lg font-bold leading-snug text-foreground group-hover:text-accent">
          {tested.title}
        </span>
        <span className="text-sm text-muted-foreground">{tested.excerpt}</span>
      </Link>
    </div>
  )
}
