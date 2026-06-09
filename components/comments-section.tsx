'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Send } from 'lucide-react'
import {
  submitComment,
  type CommentContentType,
  type PublicComment,
} from '@/app/actions/comments'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function CommentsSection({
  contentType,
  contentSlug,
  initialComments,
}: {
  contentType: CommentContentType
  contentSlug: string
  initialComments: PublicComment[]
}) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setMessage(null)
    const res = await submitComment(
      contentType,
      contentSlug,
      name,
      body,
      honeypot,
    )
    setPending(false)
    if (res.ok) {
      setName('')
      setBody('')
      setMessage({
        type: 'success',
        text: 'Danke! Dein Kommentar wird nach einer kurzen Prüfung veröffentlicht.',
      })
      router.refresh()
    } else {
      setMessage({ type: 'error', text: res.error })
    }
  }

  return (
    <section className="no-print" aria-labelledby="kommentare-titel">
      <div className="flex items-center gap-2 text-foreground">
        <MessageCircle className="h-5 w-5 text-accent" />
        <h2
          id="kommentare-titel"
          className="font-serif text-2xl font-semibold"
        >
          Kommentare
          {initialComments.length > 0 && (
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({initialComments.length})
            </span>
          )}
        </h2>
      </div>

      {/* Liste */}
      {initialComments.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-5">
          {initialComments.map((c) => (
            <li
              key={c.id}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                {initials(c.authorName)}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium text-foreground">
                    {c.authorName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          Noch keine Kommentare. Sei die erste Person, die etwas schreibt!
        </p>
      )}

      {/* Formular */}
      <form
        onSubmit={handleSubmit}
        className="relative mt-8 rounded-2xl border border-border bg-secondary/40 p-6"
      >
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Schreib einen Kommentar
        </h3>

        {/* Honeypot: für Menschen unsichtbar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={`website-${contentSlug}`}>
            Bitte nicht ausfüllen
          </label>
          <input
            id={`website-${contentSlug}`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label
              htmlFor={`name-${contentSlug}`}
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id={`name-${contentSlug}`}
              type="text"
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="Wie heißt du?"
            />
          </div>
          <div>
            <label
              htmlFor={`body-${contentSlug}`}
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Kommentar
            </label>
            <textarea
              id={`body-${contentSlug}`}
              required
              rows={4}
              maxLength={2000}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full resize-y rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
              placeholder="Teile deine Gedanken, Fragen oder Tipps ..."
            />
          </div>
        </div>

        {message && (
          <p
            role="status"
            className={
              message.type === 'success'
                ? 'mt-4 text-sm font-medium text-accent'
                : 'mt-4 text-sm font-medium text-destructive'
            }
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {pending ? 'Wird gesendet ...' : 'Kommentar absenden'}
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Kommentare werden vor der Veröffentlichung moderiert.
        </p>
      </form>
    </section>
  )
}
