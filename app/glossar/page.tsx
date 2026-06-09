import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import {
  getGlossaryByLetter,
  glossaryCategoryLabels,
  type GlossaryCategory,
} from '@/lib/content'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Kaffee-Glossar: Begriffe einfach erklärt',
  description:
    'Von Arabica bis Terroir – das Kaffee-Glossar von Meine kleine Kaffeewelt erklärt die wichtigsten Begriffe rund um Bohne, Röstung, Mahlgrad und Zubereitung.',
}

const categoryStyles: Record<GlossaryCategory, string> = {
  bohne: 'bg-primary/10 text-primary',
  roesten: 'bg-accent/15 text-accent',
  mahlen: 'bg-secondary text-secondary-foreground',
  zubereitung: 'bg-accent/15 text-accent',
  geschmack: 'bg-primary/10 text-primary',
  ausstattung: 'bg-muted text-muted-foreground',
}

export default function GlossaryPage() {
  const groups = getGlossaryByLetter()
  const letters = groups.map((g) => g.letter)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Glossar' }]} />

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
          Die wichtigsten Begriffe rund um Kaffee – von der Bohne über die
          Röstung bis zur Zubereitung. Klick dich durch und vertiefe dein Wissen
          Begriff für Begriff.
        </p>
      </header>

      {/* A–Z Sprungnavigation */}
      <nav
        aria-label="Alphabetische Navigation"
        className="mt-8 flex flex-wrap gap-2"
      >
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
        {groups.map((group) => (
          <section
            key={group.letter}
            id={`buchstabe-${group.letter}`}
            className="scroll-mt-24"
          >
            <h2 className="mb-4 font-serif text-2xl font-bold text-accent">
              {group.letter}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.terms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossar/${term.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent">
                      {term.term}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${categoryStyles[term.category]}`}
                    >
                      {glossaryCategoryLabels[term.category]}
                    </span>
                  </div>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {term.shortDef}
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
