import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getAllGlossaryTerms, getGlossaryTermBySlug } from '@/sanity/lib/fetch'

export const revalidate = 60

const CATEGORY_LABELS: Record<string, string> = {
  zubereitungsmethoden: 'Zubereitung',
  'bohnen-herkunft': 'Herkunft',
  'anbau-aufbereitung': 'Anbau',
  roestung: 'Röstung',
  sensorik: 'Sensorik',
  geraete: 'Geräte',
  kaffeekultur: 'Kaffeekultur',
}

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms()
  return terms.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)
  if (!term) return { title: 'Begriff nicht gefunden' }
  return {
    title: `${term.term} — Kaffee-Glossar | Meine kleine Kaffeewelt`,
    description: term.definition.slice(0, 160),
  }
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)
  if (!term) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/glossar"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Zurück zum Glossar
      </Link>

      <header className="mt-6">
        {term.category && (
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            {CATEGORY_LABELS[term.category] ?? term.category}
          </span>
        )}
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-foreground">
          {term.term}
        </h1>
      </header>

      <div className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
        {term.definition}
      </div>
    </article>
  )
}
