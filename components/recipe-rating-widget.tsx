'use client'

import { useState, useTransition } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  submitRecipeRating,
  type RatingAggregate,
} from '@/app/actions/ratings'

export function RecipeRatingWidget({
  recipeSlug,
  initial,
}: {
  recipeSlug: string
  initial: RatingAggregate
}) {
  const [aggregate, setAggregate] = useState<RatingAggregate>(initial)
  const [hovered, setHovered] = useState<number | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [isPending, startTransition] = useTransition()

  const userRating = aggregate.userRating ?? 0
  const display = hovered ?? userRating

  function handleRate(stars: number) {
    if (isPending) return
    setMessage(null)
    setIsError(false)
    startTransition(async () => {
      const result = await submitRecipeRating(recipeSlug, stars, honeypot)
      if (result.ok) {
        setAggregate(result.aggregate)
        setMessage('Danke für deine Bewertung!')
        setIsError(false)
      } else {
        setMessage(result.error)
        setIsError(true)
      }
    })
  }

  return (
    <section
      aria-labelledby="rating-heading"
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <h2
        id="rating-heading"
        className="font-serif text-xl font-semibold text-card-foreground"
      >
        Wie gut schmeckt dir dieses Rezept?
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {aggregate.count > 0 ? (
          <>
            Durchschnittlich{' '}
            <span className="font-semibold text-card-foreground">
              {aggregate.average.toFixed(1)}
            </span>{' '}
            von 5 Sternen ({aggregate.count}{' '}
            {aggregate.count === 1 ? 'Bewertung' : 'Bewertungen'})
          </>
        ) : (
          'Sei der oder die Erste und bewerte dieses Rezept!'
        )}
      </p>

      <div
        className="mt-4 flex items-center gap-1"
        role="radiogroup"
        aria-label="Sterne vergeben"
        onMouseLeave={() => setHovered(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const active = display >= star
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={userRating === star}
              aria-label={`${star} ${star === 1 ? 'Stern' : 'Sterne'}`}
              disabled={isPending}
              onMouseEnter={() => setHovered(star)}
              onFocus={() => setHovered(star)}
              onBlur={() => setHovered(null)}
              onClick={() => handleRate(star)}
              className={cn(
                'rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60',
              )}
            >
              <Star
                width={32}
                height={32}
                className={cn(
                  'transition-colors',
                  active
                    ? 'fill-accent text-accent'
                    : 'fill-muted text-muted-foreground/40',
                )}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>

      {/* Honeypot: für Menschen unsichtbar, fängt Spam-Bots ab. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="rating-website">
          Bitte dieses Feld leer lassen
          <input
            id="rating-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {message && (
        <p
          className={cn(
            'mt-3 text-sm',
            isError ? 'text-destructive' : 'text-accent',
          )}
          role="status"
        >
          {message}
        </p>
      )}
      {userRating > 0 && !message && (
        <p className="mt-3 text-sm text-muted-foreground">
          Deine Bewertung: {userRating} von 5 Sternen. Du kannst sie jederzeit
          ändern.
        </p>
      )}
    </section>
  )
}
