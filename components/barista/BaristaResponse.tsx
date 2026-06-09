'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, Coffee, Droplets, Gauge, Scale, Thermometer, Snowflake, ArrowRight, BookOpen, Newspaper } from 'lucide-react'
import type { BaristaRecommendation } from '@/lib/barista/recommendations'
import { autolinkGlossary } from '@/lib/glossary-autolink'
import { RatingStars } from '@/components/rating-stars'
import { formatTime } from '@/lib/content'

function formatNumber(value: number): string {
  return value.toLocaleString('de-DE', { maximumFractionDigits: 0 })
}

function formatLiquid(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toLocaleString('de-DE', { maximumFractionDigits: 2 })} l`
  }
  return `${formatNumber(ml)} ml`
}

export function BaristaResponse({
  recommendation,
  onUseAmounts,
}: {
  recommendation: BaristaRecommendation
  onUseAmounts?: (methodId: string, servings: number) => void
}) {
  const { paragraphs, amounts, recipes, glossary, articles, news, calculator } =
    recommendation

  // Jeder Begriff im gesamten Antwortblock wird nur einmal automatisch verlinkt.
  const linkedSlugs = new Set<string>()

  return (
    <div className="flex flex-col gap-8">
      {/* Antworttext mit automatischer Glossar-Verlinkung */}
      <div className="flex gap-4">
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
      </div>

      {/* Mengenempfehlung */}
      {amounts && (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-foreground">
              Mengenempfehlung · {amounts.methodLabel}
            </h3>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              {amounts.servings} {amounts.portionUnit}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-secondary/50 p-4 text-center">
              <div className="font-serif text-2xl font-bold text-accent">
                {formatNumber(amounts.coffeeG)}
                <span className="text-base"> g</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Kaffee</div>
            </div>
            {amounts.waterMl !== undefined && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <div className="font-serif text-2xl font-bold text-accent">
                  {formatLiquid(amounts.waterMl)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Wasser</div>
              </div>
            )}
            {amounts.drinkG !== undefined && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <div className="font-serif text-2xl font-bold text-accent">
                  {formatNumber(amounts.drinkG)}
                  <span className="text-base"> g</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Espresso
                </div>
              </div>
            )}
            {amounts.milkMl !== undefined && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <div className="font-serif text-2xl font-bold text-accent">
                  {formatLiquid(amounts.milkMl)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Milch</div>
              </div>
            )}
            {amounts.withIce && (
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <div className="flex justify-center font-serif text-2xl font-bold text-accent">
                  <Snowflake className="h-6 w-6" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Eis</div>
              </div>
            )}
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2 text-sm">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Verhältnis
                </dt>
                <dd className="font-medium text-foreground">{amounts.ratio}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Mahlgrad
                </dt>
                <dd className="font-medium text-foreground">{amounts.grind}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <Thermometer className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Brühtemperatur
                </dt>
                <dd className="font-medium text-foreground">
                  {amounts.temperature}
                </dd>
              </div>
            </div>
          </dl>

          {calculator && onUseAmounts && (
            <button
              type="button"
              onClick={() =>
                onUseAmounts(calculator.methodId, calculator.servings)
              }
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Droplets className="h-4 w-4" />
              Mengen in den Rechner übernehmen
            </button>
          )}
        </div>
      )}

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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <span className="flex items-center gap-1">
                      <RatingStars rating={r.rating} size={12} />
                      {r.rating.toFixed(1)}
                    </span>
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
                    className="object-cover"
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
                    className="object-cover"
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
