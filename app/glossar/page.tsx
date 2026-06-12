import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { getAllGlossaryTerms } from '@/sanity/lib/fetch'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kaffee-Glossar: Begriffe einfach erklärt — Meine kleine Kaffeewelt',
  description:
    'Von Arabica bis Terroir – das Kaffee-Glossar erklärt die wichtigsten Begriffe rund um Bohne, Röstung, Mahlgrad und Zubereitung.',
}

const CATEGORY_LABELS: Record<string, string> = {
  zubereitungsmethoden: 'Zubereitung',
  'bohnen-herkunft': 'Herkunft',
  'anbau-aufbereitung': 'Anbau',
  roestung: 'Röstung',
  sensorik: 'Sensorik',
  geraete: 'Geräte',
  kaffeekultur: 'Kultur',
}

const CATEGORY_STYLES: Record<string, string> = {
  zubereitungsmethoden: 'bg-accent/15 text-accent',
  'bohnen-herkunft': 'bg-primary/10 text-primary',
  'anbau-aufbereitung': 'bg-primary/10 text-primary',
  roestung: 'bg-accent/15 text-accent',
  sensorik: 'bg-primary/10 text-primary',
  geraete: 'bg-muted text-muted-foreground',
  kaffeekultur: 'bg-secondary text-secondary-foreground',
}

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms()

  const groups = terms.reduce<Record<string, typeof terms>>((acc, t) => {
    const letter = t.term[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(t)
    return acc
  }, {})

  const letters = Object.keys(groups).sort()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mt-6 max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <BookOpen className="h-6 w-6" />
          </span>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Kaffee-Glossar
          </h1>
        </div>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {terms.length} Begriffe rund um Kaffee — von der Bohne über die Röstung bis zur Zubereitung.
        </p>
      </header>

      <nav aria-label="Alphabetische Navigation" className="mt-8 flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#buchstabe-${letter}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card font-serif text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {letter}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-10">
        {letters.map((letter) => (
          <section key={letter} id={`buchstabe-${letter}`} className="scroll-mt-24">
            <h2 className="mb-4 font-serif text-2xl font-bold text-accent">{letter}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {groups[letter].map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossar/${term.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent">
                      {term.term}
                    </h3>
                    {term.category && (
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CATEGORY_STYLES[term.category] ?? 'bg-muted text-muted-foreground'}`}>
                        {CATEGORY_LABELS[term.category] ?? term.category}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {term.definition}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
