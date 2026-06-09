'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { RecipeCard } from '@/components/recipe-card'
import { recipeTypeLabels, type Recipe, type RecipeType } from '@/lib/content'
import { cn } from '@/lib/utils'

type Filter = 'alle' | RecipeType

const validTypes = Object.keys(recipeTypeLabels) as RecipeType[]

export function RecipeFilter({ recipes }: { recipes: Recipe[] }) {
  const searchParams = useSearchParams()
  const typParam = searchParams.get('typ')
  const initialFilter: Filter =
    typParam && validTypes.includes(typParam as RecipeType)
      ? (typParam as RecipeType)
      : 'alle'

  const [filter, setFilter] = useState<Filter>(initialFilter)

  // Nur Filter anzeigen, für die es auch Rezepte gibt
  const availableTypes = useMemo(() => {
    const set = new Set<RecipeType>()
    recipes.forEach((r) => set.add(r.type))
    return Array.from(set)
  }, [recipes])

  const filtered = useMemo(
    () =>
      filter === 'alle' ? recipes : recipes.filter((r) => r.type === filter),
    [filter, recipes],
  )

  const filters: Filter[] = ['alle', ...availableTypes]

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Rezepte filtern"
      >
        {filters.map((f) => {
          const active = f === filter
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
              {f === 'alle' ? 'Alle Rezepte' : recipeTypeLabels[f]}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'Rezept' : 'Rezepte'}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
