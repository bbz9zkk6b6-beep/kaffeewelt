'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, Coffee, ArrowRight, BookOpen, Newspaper } from 'lucide-react'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import { autolinkGlossary } from '@/lib/glossary-autolink'
import { RatingStars } from '@/components/rating-stars'
import { formatTime } from '@/lib/content'

export function BaristaResponse({
  recommendation,
  onUseAmounts,
}: {
  recommendation: BaristaRecommendation
  onUseAmounts?: (methodId: string, servings: number) => void
}) {
  const { paragraphs, recipes, glossary, articles, news } =
    recommendation

  // Jeder Begriff im gesamten Antwortblock wird nur einmal automatisch verlinkt.
  const linkedSlugs = new Set<string>()

  return (
    <div className="flex flex-col gap-8">
      {/* Antworttext mit automatischer Glossar-Verlinkung */}
      {paragraphs.length > 0 && <div className="flex gap-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
        >
          <Coffee className="h-5 w-5" />
        </span>
        <div className="flex flex-col gap-3 pt-1">
          {paragraphs.map((text, i) => (
            <p key={i} className="leading-relaxed text-foreground">
              {autolinkGlossary(text, { linkedSlugs })}
            </p>
          ))}
        </div>
      </div>}

      {/* Mengenempfehlung: ENTFERNT — wird nur bei Bedarf im Modal angezeigt */}

      {/* Passende Rezepte */}
      {recipes.length > 0 && (
        <div>
          <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
            Passende Rezepte
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {recipes.map((r) => (
              <Link
                key={r.slug}
                href={`/rezepte/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.image || '/placeholder.svg'}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="site-image-look object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="font-serif text-base font-semibold leading-snug text-foreground text-balance transition-colors group-hover:text-accent">
                    {r.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    {r.rating > 0 ? (
                      <span className="flex items-center gap-1">
                        <RatingStars rating={r.rating} size={12} />
                        {r.rating.toFixed(1)}
                      </span>
                    ) : <span />}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(r.totalTime)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Passende Glossar-Begriffe */}
      {glossary.length > 0 && (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
              <BookOpen className="h-5 w-5 text-accent" />
              Begriffe einfach erklärt
            </h3>
            <Link
              href="/glossar"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline"
            >
              Zum Glossar
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {glossary.map((g) => (
              <Link
                key={g.slug}
                href={`/glossar/${g.slug}`}
                title={g.title}
                className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent hover:bg-secondary"
              >
                <span className="font-serif text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                  {g.term}
                </span>
                <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {g.shortDef}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Passende Artikel */}
      {articles.length > 0 && (
        <div>
          <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
            Passende Artikel
          </h3>
          <div className="flex flex-col gap-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/artikel/${a.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-accent hover:bg-secondary"
              >
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={a.image || '/placeholder.svg'}
                    alt={a.title}
                    fill
                    sizes="64px"
                    className="site-image-look object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {a.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {a.readingTime} Min. Lesezeit
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Passende News */}
      {news.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-foreground">
            <Newspaper className="h-5 w-5 text-accent" />
            Passende News
          </h3>
          <div className="flex flex-col gap-3">
            {news.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-accent hover:bg-secondary"
              >
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={n.image || '/placeholder.svg'}
                    alt={n.title}
                    fill
                    sizes="64px"
                    className="site-image-look object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {n.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(n.date).toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
