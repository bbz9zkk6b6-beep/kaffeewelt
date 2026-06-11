'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UnifiedSearchOverlay } from '@/components/unified-search-overlay'

export function BaristaAssistant() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex flex-col gap-6 p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <MessageCircle className="h-4 w-4" />
              Frag den Barista
            </span>
            <h2 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Dein persönlicher Kaffeeberater
            </h2>
            <p className="font-serif text-lg font-medium text-accent">
              Rezepte, Glossar und Tipps in einer Suche.
            </p>
            <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Finde Rezepte, lass dir Fachbegriffe erklären und erhalte personalisierte Kaffee-Empfehlungen – alles durchsucht unser komplettes Archiv.
            </p>
          </div>

          {/* Button */}
          <div>
            <Button
              onClick={() => setOverlayOpen(true)}
              size="lg"
              className="gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Jetzt fragen
            </Button>
          </div>
        </div>
      </div>

      <UnifiedSearchOverlay isOpen={overlayOpen} onClose={() => setOverlayOpen(false)} />
    </>
  )
}

