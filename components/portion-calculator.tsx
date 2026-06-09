'use client'

import { useState } from 'react'
import { Minus, Plus, Users } from 'lucide-react'
import type { Ingredient } from '@/lib/content'

function formatAmount(value: number): string {
  // Auf eine sinnvolle Genauigkeit runden
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded)
    ? rounded.toString()
    : rounded.toLocaleString('de-DE', { maximumFractionDigits: 1 })
}

export function PortionCalculator({
  ingredients,
  baseServings,
}: {
  ingredients: Ingredient[]
  baseServings: number
}) {
  const [servings, setServings] = useState(baseServings)
  const factor = servings / baseServings

  function decrease() {
    setServings((s) => Math.max(1, s - 1))
  }
  function increase() {
    setServings((s) => Math.min(99, s + 1))
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 text-foreground">
        <Users className="h-5 w-5 text-accent" />
        <h2 className="font-serif text-xl font-semibold">Zutaten</h2>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-secondary p-3">
        <span className="text-sm font-medium text-secondary-foreground">
          Portionen
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={decrease}
            disabled={servings <= 1}
            aria-label="Eine Portion weniger"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            className="min-w-8 text-center font-serif text-xl font-bold text-foreground"
            aria-live="polite"
          >
            {servings}
          </span>
          <button
            type="button"
            onClick={increase}
            disabled={servings >= 99}
            aria-label="Eine Portion mehr"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <span className="text-foreground/85">{ing.name}</span>
            <span className="shrink-0 font-medium tabular-nums text-foreground">
              {formatAmount(ing.amount * factor)} {ing.unit}
            </span>
          </li>
        ))}
      </ul>

      {servings !== baseServings && (
        <button
          type="button"
          onClick={() => setServings(baseServings)}
          className="mt-4 text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          Zurücksetzen ({baseServings}{' '}
          {baseServings === 1 ? 'Portion' : 'Portionen'})
        </button>
      )}
    </div>
  )
}
