import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { getAllGlossaryTerms, getGlossaryTermBySlug } from '@/sanity/lib/fetch'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { BackLink } from '@/components/author-byline'

const SITE_URL = 'https://meine-kleine-kaffeewelt.de'

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
  const canonical = `/glossar/${term.slug}`
  const title = `${term.term} – Kaffee-Glossar | Meine kleine Kaffeewelt`
  const description = term.definition
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'article' },
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

  const definedTermLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/glossar/${term.slug}`,
    name: term.term,
    description: term.definition,
    url: `${SITE_URL}/glossar/${term.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Kaffee-Glossar – Meine kleine Kaffeewelt',
      url: `${SITE_URL}/glossar`,
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Glossar', item: `${SITE_URL}/glossar` },
      { '@type': 'ListItem', position: 2, name: term.term, item: `${SITE_URL}/glossar/${term.slug}` },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Breadcrumbs items={[{ name: 'Glossar', href: '/glossar' }, { name: term.term }]} />
      <div className="mt-4">
        <BackLink href="/glossar" label="Zurück zum Glossar" />
      </div>

      <header className="mt-6">
        {term.categoryTitle && (
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            {term.categoryTitle}
          </span>
        )}
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-foreground">
          {term.term}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {term.definition}
        </p>
      </header>

      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Verwandte Begriffe
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {term.relatedTerms.map((r) => (
              <Link
                key={r.slug}
                href={`/glossar/${r.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
              >
                <span className="min-w-0">
                  <span className="block font-medium text-foreground group-hover:text-accent">
                    {r.term}
                  </span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {r.definition}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
