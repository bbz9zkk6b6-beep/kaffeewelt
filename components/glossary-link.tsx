'use client'

import Link from 'next/link'
import { useId, useState } from 'react'

type GlossaryLinkProps = {
  href: string
  title: string
  term: string
  shortDef: string
  children: React.ReactNode
}

// Interner DoFollow-Link auf einen Glossarbegriff mit kleinem Vorschau-Tooltip.
// Tooltip öffnet bei Hover/Fokus (Desktop) und bei Tap (Mobil, via Toggle).
export function GlossaryLink({
  href,
  title,
  term,
  shortDef,
  children,
}: GlossaryLinkProps) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        title={title}
        aria-describedby={open ? tooltipId : undefined}
        className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          // Auf Touch-Geräten erster Tap = Vorschau zeigen, zweiter Tap folgt dem Link.
          if (
            !open &&
            typeof window !== 'undefined' &&
            window.matchMedia('(hover: none)').matches
          ) {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {children}
      </Link>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-popover p-3 text-left shadow-lg"
        >
          <span className="block font-serif text-sm font-semibold text-popover-foreground">
            {term}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {shortDef}
          </span>
          <Link
            href={href}
            className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
          >
            Zum Glossar
          </Link>
        </span>
      )}
    </span>
  )
}
