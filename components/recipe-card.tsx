import Link from 'next/link'
import Image from 'next/image'
import { Clock, Gauge } from 'lucide-react'
import type { Recipe } from '@/lib/content'
import { recipeTypeLabels, formatTime } from '@/lib/content'
import { RatingStars } from '@/components/rating-stars'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/rezepte/${recipe.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={recipe.image || '/placeholder.svg'}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="site-image-look object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {recipeTypeLabels[recipe.type]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground text-balance">
          <Link
            href={`/rezepte/${recipe.slug}`}
            className="transition-colors hover:text-accent"
          >
            {recipe.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {recipe.excerpt}
        </p>
        {recipe.rating != null && (
          <div className="mt-4 flex items-center gap-2">
            <RatingStars rating={recipe.rating} size={14} />
            <span className="text-xs text-muted-foreground">
              {recipe.rating.toFixed(1)} ({recipe.ratingCount ?? 0})
            </span>
          </div>
        )}
        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(recipe.totalTime)}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </article>
  )
}
