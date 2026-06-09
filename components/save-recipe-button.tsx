'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function SaveRecipeButton({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSaved(readSaved().includes(slug))
  }, [slug])

  function toggle() {
    const current = readSaved()
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // localStorage nicht verfügbar – ignorieren
    }
    setSaved(next.includes(slug))
    // Andere Komponenten (z. B. eine Merkliste) informieren.
    window.dispatchEvent(new CustomEvent('mkk:saved-recipes-changed'))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? saved : undefined}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        saved
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border bg-card text-foreground/80 hover:border-accent hover:text-accent',
        className,
      )}
    >
      <Heart
        className={cn('h-4 w-4', saved && 'fill-current')}
        aria-hidden="true"
      />
      {saved ? 'Gemerkt' : 'Rezept merken'}
    </button>
  )
}
