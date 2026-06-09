'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { recipes } from '@/lib/content'
import { RecipeCard } from '@/components/recipe-card'

const STORAGE_KEY = 'mkk:saved-recipes'

function readSaved(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function FavoritesList() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSlugs(readSaved())

    function sync() {
      setSlugs(readSaved())
    }
    window.addEventListener('mkk:saved-recipes-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('mkk:saved-recipes-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!mounted) return null

  const saved = recipes.filter((r) => slugs.includes(r.slug))

  if (saved.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <Heart className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
          Noch keine Favoriten
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Klicke bei einem Rezept auf {'"'}Rezept merken{'"'}, um es hier zu
          sammeln. Deine Merkliste wird lokal in diesem Browser gespeichert.
        </p>
        <Link
          href="/rezepte"
          className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Rezepte entdecken
        </Link>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6 text-sm text-muted-foreground">
        {saved.length} {saved.length === 1 ? 'gemerktes Rezept' : 'gemerkte Rezepte'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
