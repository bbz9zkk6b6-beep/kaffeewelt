import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getCommentsByStatus,
  getModerationCounts,
} from '@/app/actions/comments'
import { ModerationList } from '@/components/moderation-list'

export const metadata: Metadata = {
  title: 'Kommentar-Moderation',
  robots: { index: false, follow: false },
}

export default async function ModerationPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const expected = process.env.ADMIN_TOKEN

  // Schutz: Ohne korrekten Token wird die Seite versteckt.
  if (!expected || token !== expected) {
    notFound()
  }

  const [pending, counts] = await Promise.all([
    getCommentsByStatus('pending'),
    getModerationCounts(),
  ])

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Kommentar-Moderation
        </h1>
        <p className="mt-2 text-muted-foreground">
          Prüfe eingereichte Kommentare und gib sie frei oder lehne sie ab.
          Freigegebene Kommentare erscheinen sofort beim jeweiligen Inhalt.
        </p>
      </header>
      <ModerationList initialPending={pending} counts={counts} />
    </main>
  )
}
