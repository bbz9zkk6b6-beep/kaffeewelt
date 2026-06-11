'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { X, MessageCircle, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import { integratedSearch } from '@/lib/content/integrated-search'
import { SuggestionChips } from '@/components/barista/SuggestionChips'
import { BaristaResponse } from '@/components/barista/BaristaResponse'
import { BrewCalculator } from '@/components/brew-calculator'
import { Button } from '@/components/ui/button'

type UnifiedSearchOverlayProps = {
  isOpen: boolean
  onClose: () => void
}

export function UnifiedSearchOverlay({
  isOpen,
  onClose,
}: UnifiedSearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BaristaRecommendation | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const responseRef = useRef<HTMLDivElement>(null)

  // Live-Such-Ergebnisse
  const searchResults = integratedSearch(searchQuery)

  // Barista-Request
  async function askBarista(value: string) {
    const trimmed = value.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setError(null)
    setSearchQuery('') // Suche leeren bei Barista-Request

    try {
      const res = await fetch('/api/barista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(data?.error ?? 'Es ist ein Fehler aufgetreten.')
      }

      const data = (await res.json()) as BaristaRecommendation
      console.log('[v0] Barista response:', data)
      setResult(data)
      setQuestion(trimmed)

      // Auto-Scroll
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Es ist ein Fehler aufgetreten.',
      )
    } finally {
      setLoading(false)
    }
  }

  // ESC zum Schließen
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - Full page dark overlay with inline styles */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Centered in viewport (above header) */}
      <div 
        className="fixed z-50 flex items-center justify-center p-4"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          pointerEvents: 'none'
        }}
      >
        <div
          className="pointer-events-auto relative w-full max-w-2xl rounded-3xl border border-border bg-background shadow-2xl flex flex-col"
          style={{ maxHeight: '85vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4 flex-shrink-0">
            <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              Frag den Barista
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-6 space-y-6">
              {/* Input + Suggestions Bereich */}
              {!result ? (
                <div className="space-y-4">
                  {/* Intro Text */}
                  <div className="space-y-3 pb-4 border-b border-border/50">
                    <p className="text-sm font-semibold text-foreground">
                      Das Glossar erklärt. Der Barista berät.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Erhalte Empfehlungen, Mengenangaben und passende Rezepte für deinen perfekten Kaffee – und lass dir Fachbegriffe aus dem Glossar erklären.
                    </p>
                  </div>

                  {/* Input-Bereich */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery || question}
                        onChange={(e) => {
                          const val = e.target.value
                          if (result) {
                            setQuestion(val)
                          } else {
                            setSearchQuery(val)
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            askBarista(searchQuery || question)
                          }
                        }}
                        placeholder="Stelle eine Frage zu Kaffee oder beschreibe deine Vorlieben..."
                        autoFocus
                        disabled={loading}
                        className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50"
                      />
                      <Button
                        onClick={() => askBarista(searchQuery || question)}
                        disabled={loading || !(searchQuery || question).trim()}
                        size="sm"
                        className="gap-2"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Fragen'
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Live-Such-Ergebnisse */}
                  {searchQuery && searchResults.hasResults && (
                    <div className="rounded-xl bg-secondary/30 p-4 space-y-3">
                      <p className="text-xs uppercase font-medium text-muted-foreground">
                        Schnelle Ergebnisse
                      </p>

                      {/* Glossar */}
                      {searchResults.glossary.length > 0 && (
                        <div className="space-y-1.5">
                          {searchResults.glossary.slice(0, 3).map((term) => (
                            <Link
                              key={term.slug}
                              href={term.link}
                              onClick={onClose}
                              className="block rounded-lg bg-background/60 px-3 py-2 text-sm hover:bg-accent/20 transition-colors group"
                            >
                              <span className="font-medium text-foreground group-hover:text-accent">
                                {term.title}
                              </span>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {term.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Rezept */}
                      {searchResults.recipe && (
                        <Link
                          href={searchResults.recipe.link}
                          onClick={onClose}
                          className="block rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 hover:bg-accent/20 transition-colors"
                        >
                          <p className="text-xs font-medium text-accent">Rezept</p>
                          <p className="font-medium text-foreground text-sm">
                            {searchResults.recipe.title}
                          </p>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Suggestion-Chips */}
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-medium text-muted-foreground">
                      Beispielfragen
                    </p>
                    <SuggestionChips
                      onSelect={(chip) => {
                        setSearchQuery('')
                        setQuestion(chip)
                        askBarista(chip)
                      }}
                      disabled={loading}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                      <AlertCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Barista-Antwort */}
              {result && (
                <div ref={responseRef} className="space-y-4">
                  {/* Frage Display */}
                  <div className="p-3 bg-secondary/40 rounded-lg border border-border/50">
                    <p className="text-xs uppercase font-medium text-muted-foreground mb-1">
                      Deine Frage
                    </p>
                    <p className="text-sm text-foreground">{question}</p>
                  </div>

                  {/* Antwort mit Links */}
                  <BaristaResponse recommendation={result} />

                  {/* Mengenrechner – immer anzeigen als Standard */}
                  <div className="space-y-3 border-t border-border/50 pt-4">
                    <button
                      onClick={() => setShowCalculator(!showCalculator)}
                      className="w-full text-left p-4 rounded-lg border border-accent/30 bg-accent/10 hover:bg-accent/20 transition-colors font-medium"
                    >
                      <p className="text-sm font-bold text-accent flex items-center gap-2">
                        📐 Rezeptmengen-Rechner
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {showCalculator
                          ? 'Klick um zu verstecken'
                          : 'Klick zum Öffnen – Mengen einfach anpassen'}
                      </p>
                    </button>

                    {showCalculator && (
                      <div className="rounded-xl border border-border p-4 bg-secondary/20">
                        <BrewCalculator
                          initialMethodId="filterkaffee"
                          initialPortions={2}
                        />
                      </div>
                    )}
                  </div>

                  {/* Neue Frage Button */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResult(null)
                      setQuestion('')
                      setSearchQuery('')
                      setError(null)
                      setShowCalculator(false)
                    }}
                    className="w-full"
                  >
                    Neue Frage stellen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
