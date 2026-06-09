'use client'

import { useRef, useState } from 'react'
import { Sparkles, Send, Loader2, Calculator } from 'lucide-react'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import type { BrewMethod } from '@/lib/content/brewing'
import { BrewCalculator } from '@/components/brew-calculator'
import { SuggestionChips } from '@/components/barista/SuggestionChips'
import { BaristaResponse } from '@/components/barista/BaristaResponse'

type Prefill = {
  methodId: BrewMethod['id']
  portions: number
  requestId: number
}

export function BaristaAssistant() {
  // Lokaler State des Beraters (Frage, Ladezustand, Ergebnis, Rechner-Prefill).
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BaristaRecommendation | null>(null)
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)

  async function ask(value: string) {
    const trimmed = value.trim()
    if (!trimmed || loading) return
    setLoading(true)
    setError(null)
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
      setResult(data)
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    void ask(question)
  }

  function handleChip(value: string) {
    setQuestion(value)
    void ask(value)
  }

  function handleUseAmounts(methodId: string, portions: number) {
    setPrefill({
      methodId: methodId as BrewMethod['id'],
      portions,
      requestId: Date.now(),
    })
    calculatorRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex flex-col gap-6 p-6 sm:p-10">
        {/* Kopf */}
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4" />
            Frag den Barista
          </span>
          <h2 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Dein persönlicher Kaffeeberater
          </h2>
          <p className="font-serif text-lg font-medium text-accent">
            Das Glossar erklärt. Der Barista berät.
          </p>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Erhalte Empfehlungen, Mengenangaben und passende Rezepte für deinen
            perfekten Kaffee – und lass dir Fachbegriffe aus dem Glossar
            erklären.
          </p>
        </div>

        {/* Eingabe */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void ask(question)
                }
              }}
              rows={2}
              placeholder="Stelle eine Frage zu Kaffee oder beschreibe deine Vorlieben ..."
              aria-label="Deine Frage an den Barista"
              className="flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="inline-flex h-fit items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:self-stretch"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Empfehlung erhalten
            </button>
          </div>

          <SuggestionChips onSelect={handleChip} disabled={loading} />
        </form>

        {/* Fehler */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        {/* Antwort */}
        {result && (
          <div className="border-t border-border pt-6">
            <BaristaResponse
              recommendation={result}
              onUseAmounts={handleUseAmounts}
            />
          </div>
        )}

        {/* Integrierter Rechner – übernimmt die Werte aus der Empfehlung */}
        <div
          ref={calculatorRef}
          className="scroll-mt-24 rounded-2xl border border-border bg-background p-5 sm:p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-lg font-bold text-foreground">
              Rezeptmengen-Rechner
            </h3>
            {prefill && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                Mengen übernommen
              </span>
            )}
          </div>
          <BrewCalculator
            initialMethodId="filterkaffee"
            initialPortions={4}
            prefill={prefill ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}
