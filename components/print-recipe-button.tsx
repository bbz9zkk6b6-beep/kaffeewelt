'use client'

import { Printer } from 'lucide-react'

export function PrintRecipeButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-accent hover:text-accent'
      }
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Rezept drucken
    </button>
  )
}
