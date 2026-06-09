'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { searchContent, type SearchResult } from '@/lib/content'
import { cn } from '@/lib/utils'

const typeStyles: Record<string, string> = {
  Artikel: 'bg-secondary text-secondary-foreground',
  News: 'bg-accent/15 text-accent',
  Rezept: 'bg-primary/10 text-primary',
  Kategorie: 'bg-muted text-muted-foreground',
  Glossar: 'bg-accent/15 text-accent',
}

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => searchContent(query, 8), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // Fokus nach dem Öffnen setzen.
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(href: string) {
    onClose()
    router.push(href)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active].href)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Suche"
    >
      <button
        type="button"
        aria-label="Suche schließen"
        className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rezepte, Artikel, Glossar durchsuchen ..."
            className="h-14 w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Suchbegriff"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Gib mindestens zwei Zeichen ein, um zu suchen.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Keine Treffer für {'"'}
              {query}
              {'"'}.
            </p>
          ) : (
            <ul className="py-2">
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    type="button"
                    onClick={() => go(r.href)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                      i === active ? 'bg-secondary' : 'hover:bg-secondary/60',
                    )}
                  >
                    {r.image ? (
                      <Image
                        src={r.image || '/placeholder.svg'}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                            typeStyles[r.type],
                          )}
                        >
                          {r.type}
                        </span>
                        {r.meta && (
                          <span className="truncate text-xs text-muted-foreground">
                            {r.meta}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block truncate font-medium text-foreground">
                        {r.title}
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {r.excerpt}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-2 text-[11px] text-muted-foreground">
          <span>Navigieren mit ↑ ↓</span>
          <span>Enter zum Öffnen · Esc zum Schließen</span>
        </div>
      </div>
    </div>
  )
}
