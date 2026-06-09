'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Search, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { SearchOverlay } from '@/components/search-overlay'

const navItems = [
  { label: 'Startseite', href: '/' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'News', href: '/news' },
  { label: 'Rezepte', href: '/rezepte' },
  { label: 'Kategorien', href: '/kategorien' },
  { label: 'Glossar', href: '/glossar' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo size="md" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Suche öffnen"
            className="hidden h-9 items-center gap-2 rounded-md px-3 text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:flex"
          >
            <Search className="h-5 w-5" />
            <span className="hidden text-sm text-muted-foreground lg:inline">
              Suchen
            </span>
          </button>
          <Link
            href="/favoriten"
            aria-label="Meine Favoriten"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-accent sm:flex"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-border bg-background lg:hidden',
          open ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
        style={{ transition: 'max-height 0.3s ease' }}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile Navigation"
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setSearchOpen(true)
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
          >
            <Search className="h-4 w-4" />
            Suchen
          </button>
          <Link
            href="/favoriten"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Heart className="h-4 w-4" />
            Meine Favoriten
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
