'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { X, Loader2, Sparkles, Send, Coffee } from 'lucide-react'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import { integratedSearch } from '@/lib/content/integrated-search'
import { BaristaResponse } from '@/components/barista/BaristaResponse'
import { cn } from '@/lib/utils'

type Message = {
  role: 'user' | 'assistant'
  content: string
  recommendation?: BaristaRecommendation
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/^[-*•]\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim()
}

const SUGGESTIONS = [
  'Ich bekomme Besuch',
  'Mein Espresso schmeckt bitter',
  'Was ist Crema?',
  'Ich möchte Cold Brew machen',
  'Ich habe eine French Press',
  'Was bedeutet Blooming?',
]

const MAX_QUESTION_LENGTH = 500

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function UnifiedSearchOverlay({ isOpen, onClose }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastAssistantRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Live-Suche für Autocomplete
  const searchResults = integratedSearch(input)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => lastAssistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [messages])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setInput('')
    const userMsg: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/barista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      })

      const data = (await res.json()) as BaristaRecommendation & { aiText?: string }
      if (!res.ok) {
        throw new Error(
          'error' in data && typeof data.error === 'string'
            ? data.error
            : 'Anfrage fehlgeschlagen.',
        )
      }

      const replyText = stripMarkdown(
        data.aiText ?? (data.paragraphs?.join(' ') || 'Ich habe leider keine passende Antwort gefunden.')
      )

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: replyText,
          recommendation: data,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Kurz offline — versuch es gleich noch mal. ☕',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-20 z-40 transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-y-0' : '-translate-y-[calc(100%+5rem)]',
      )}
    >
      {/* Chat-Panel — startet direkt oben, shadow nach unten */}
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-background shadow-[0_16px_48px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.12)]" style={{ maxHeight: 'calc(100vh - 5rem)', marginTop: '6px' }}>

        {/* Brauner Titelbalken */}
        <div className="flex h-12 items-center justify-between bg-primary px-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            Frag den Barista — Max antwortet
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat-Bereich */}
        <div className="overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(100vh - 5rem - 3rem - 4rem - 80px)' }}>
          <div className="rounded-xl px-4 py-4 flex flex-col gap-0" style={{ backgroundColor: '#ead9c4', boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.08), inset 0 2px 4px rgba(0,0,0,0.05)' }}>

          {/* Leerer Zustand */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-1 flex-col gap-6">
              <div className="space-y-1">
                <p className="font-serif text-lg font-semibold text-foreground">
                  Das Glossar erklärt. Der Barista berät.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Frag nach Rezepten, Brühmethoden oder Fachbegriffen — Max findet passende Antworten aus dem Magazin.
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Beispielfragen
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nachrichten */}
          {messages.map((msg, i) => {
            const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1
            const hasCards = msg.recommendation && (
              msg.recommendation.recipes.length > 0 ||
              msg.recommendation.glossary.length > 0 ||
              msg.recommendation.news.length > 0
            )
            return (
              <div
                key={i}
                ref={isLastAssistant ? lastAssistantRef : undefined}
                className={cn('mb-4', msg.role === 'user' ? 'flex justify-end' : 'flex justify-start gap-3')}
              >
                {msg.role === 'assistant' && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground mt-0.5">
                    <Coffee className="h-4 w-4" />
                  </span>
                )}
                <div className={cn(
                  'max-w-[80%]',
                  msg.role === 'user'
                    ? 'rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground'
                    : 'flex flex-col gap-4',
                )}>
                  {msg.role === 'user' ? (
                    <span>{msg.content}</span>
                  ) : (
                    <>
                      <p className="text-base leading-relaxed text-foreground">{msg.content}</p>
                      {hasCards && (
                        <div className="mt-2">
                          <BaristaResponse recommendation={{ ...msg.recommendation!, paragraphs: [], articles: [] }} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {loading && (
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Coffee className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
          </div>
        </div>

        {/* Live-Suche Dropdown */}
        {input.length > 1 && searchResults.hasResults && messages.length === 0 && (
          <div className="border-t border-border bg-secondary/30 px-5 py-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Schnelle Ergebnisse</p>
            <div className="flex flex-col gap-1">
              {searchResults.glossary.slice(0, 2).map((term) => (
                <Link
                  key={term.slug}
                  href={term.link}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-sm hover:bg-background transition-colors"
                >
                  <span className="font-medium text-foreground">{term.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground line-clamp-1">{term.description}</span>
                </Link>
              ))}
              {searchResults.recipe && (
                <Link
                  href={searchResults.recipe.link}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-sm text-accent hover:bg-background transition-colors"
                >
                  Rezept: {searchResults.recipe.title}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-border px-5 py-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_QUESTION_LENGTH}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Frag Max etwas über Kaffee..."
            disabled={loading}
            className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50"
            style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.07), inset 0 1px 2px rgba(0,0,0,0.05)' }}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
            aria-label="Senden"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
