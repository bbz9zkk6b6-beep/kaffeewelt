'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Clock, MessageCircle } from 'lucide-react'
import { setCommentStatus } from '@/app/actions/comments'

interface Comment {
  _id: string
  authorName: string
  body: string
  contentType: string
  contentSlug: string
  createdAt: string
}

const contentLabels: Record<string, string> = {
  artikel: 'Artikel',
  news: 'News',
  rezepte: 'Rezept',
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ModerationList({
  initialPending,
  counts,
}: {
  initialPending: Comment[]
  counts: { pending: number; approved: number; rejected: number }
}) {
  const router = useRouter()
  const [pending, setPending] = useState(initialPending)
  const [isPending, startTransition] = useTransition()
  const [busyId, setBusyId] = useState<string | null>(null)

  function moderate(id: string, status: 'approved' | 'rejected') {
    setBusyId(id)
    startTransition(async () => {
      await setCommentStatus(id, status)
      setPending((prev) => prev.filter((c) => c._id !== id))
      setBusyId(null)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Clock className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Offen
            </span>
          </div>
          <p className="mt-1 font-serif text-2xl font-bold text-foreground">
            {counts.pending}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Check className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Freigegeben
            </span>
          </div>
          <p className="mt-1 font-serif text-2xl font-bold text-foreground">
            {counts.approved}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <X className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Abgelehnt
            </span>
          </div>
          <p className="mt-1 font-serif text-2xl font-bold text-foreground">
            {counts.rejected}
          </p>
        </div>
      </div>

      <h2 className="mt-10 flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
        <MessageCircle className="h-5 w-5 text-accent" />
        Offene Kommentare
      </h2>

      {pending.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-secondary/40 p-8 text-center text-muted-foreground">
          Keine offenen Kommentare. Alles erledigt.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {pending.map((c) => (
            <li
              key={c._id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-foreground">
                  {c.authorName}
                </span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {contentLabels[c.contentType] ?? c.contentType}: {c.contentSlug}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-line text-pretty leading-relaxed text-foreground/90">
                {c.body}
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  disabled={isPending && busyId === c._id}
                  onClick={() => moderate(c._id, 'approved')}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  Freigeben
                </button>
                <button
                  type="button"
                  disabled={isPending && busyId === c._id}
                  onClick={() => moderate(c._id, 'rejected')}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Ablehnen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
