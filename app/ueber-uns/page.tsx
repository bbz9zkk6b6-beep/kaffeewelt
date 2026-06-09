import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Coffee, Heart, Leaf, Target } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { authors } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Über uns | Meine kleine Kaffeewelt',
  description:
    'Lerne das Team hinter Meine kleine Kaffeewelt kennen – unsere Mission, unsere Werte und unsere Leidenschaft für guten Kaffee.',
}

const values = [
  {
    icon: Heart,
    title: 'Leidenschaft',
    text: 'Kaffee ist für uns mehr als ein Getränk – es ist Handwerk, Genuss und ein Stück Lebensfreude in jeder Tasse.',
  },
  {
    icon: Target,
    title: 'Unabhängigkeit',
    text: 'Unsere Tests und Empfehlungen sind ehrlich und unbestechlich. Wir berichten so, wie wir es selbst erleben.',
  },
  {
    icon: Leaf,
    title: 'Nachhaltigkeit',
    text: 'Fairer Handel und schonender Anbau liegen uns am Herzen. Guter Kaffee soll allen schmecken – auch der Natur.',
  },
]

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Aus Liebe zum Kaffee"
        description="Meine kleine Kaffeewelt ist das Online-Magazin für alle, die Kaffee nicht nur trinken, sondern erleben wollen."
        breadcrumbs={<Breadcrumbs items={[{ name: 'Über uns' }]} />}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-team.png"
              alt="Das Team von Meine kleine Kaffeewelt"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Unsere Geschichte
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Was als kleiner Blog in einer Hamburger Küche begann, ist heute
                eine wachsende Community von Kaffeeliebhabern. Wir haben uns
                gefragt: Warum gibt es so wenig verständliches, ehrliches Wissen
                über Kaffee auf Deutsch?
              </p>
              <p>
                Also haben wir es selbst in die Hand genommen. Seitdem teilen wir
                fundiertes Wissen, erprobte Rezepte und ehrliche Tests – immer
                mit dem Ziel, dir zu deiner besten Tasse zu verhelfen.
              </p>
              <p>
                Ob blutiger Anfänger oder erfahrener Home-Barista: Bei uns findest
                du Inspiration, Anleitung und Antworten auf all deine Fragen rund
                um die schwarze Bohne.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Wofür wir stehen
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent">
                  <value.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-center font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Das Team
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Hinter jedem Artikel und Rezept stecken echte Menschen mit echter
          Begeisterung für Kaffee.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={author.avatar || '/placeholder.svg'}
                  alt={author.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {author.name}
              </h3>
              <p className="text-sm font-medium text-accent">{author.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <Coffee className="h-10 w-10 text-accent" />
          <h2 className="mt-4 text-balance font-serif text-2xl font-bold sm:text-3xl">
            Lust auf eine richtig gute Tasse?
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-primary-foreground/80">
            Stöbere durch unsere Rezepte und finde deine neue Lieblings-Kreation.
          </p>
          <Link
            href="/rezepte"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Zu den Rezepten
          </Link>
        </div>
      </section>
    </>
  )
}
