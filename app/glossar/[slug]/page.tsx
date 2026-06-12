import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import {
  getGlossaryTerm,
  glossary,
  glossaryCategoryLabels,
  glossaryCrumbs,
  glossarySeoTitle,
  glossarySeoDescription,
  getArticle,
  getRecipe,
} from '@/lib/content'
import { ArticleBody } from '@/components/article-body'
import { ArticleCard } from '@/components/article-card'
import { RecipeCard } from '@/components/recipe-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { BackLink } from '@/components/author-byline'
import { GlossaryDiscovery } from '@/components/glossary-discovery'

const SITE_URL = 'https://meine-kleine-kaffeewelt.de'

export function generateStaticParams() {
  return glossary.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = getGlossaryTerm(slug)
  if (!term) return { title: 'Begriff nicht gefunden' }
  const canonical = `/glossar/${term.slug}`
  return {
    title: glossarySeoTitle(term),
    description: glossarySeoDescription(term),
    alternates: { canonical },
    openGraph: {
      title: glossarySeoTitle(term),
      description: glossarySeoDescription(term),
      url: canonical,
      type: 'article',
    },
  }
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const term = getGlossaryTerm(slug)
  if (!term) notFound()

  const related = (term.related ?? [])
    .map((s) => getGlossaryTerm(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 4)

  const relatedArticles = (term.relatedArticles ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3)

  const relatedRecipes = (term.relatedRecipes ?? [])
    .map((s) => getRecipe(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 3)

  const definedTermLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/glossar/${term.slug}`,
    name: term.term,
    description: term.shortDef,
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

  const faqLd =
    term.faq && term.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: term.faq.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Breadcrumbs items={glossaryCrumbs(term.term)} />
      <div className="mt-4">
        <BackLink href="/glossar" label="Zurück zum Glossar" />
      </div>

      <header className="mt-6">
        <span className="text-sm font-medium uppercase tracking-wider text-accent">
          {glossaryCategoryLabels[term.category]}
        </span>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-foreground">
          {term.term}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {term.shortDef}
        </p>
        {term.synonyms && term.synonyms.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Auch bekannt als: </span>
            {term.synonyms.join(', ')}
          </p>
        )}
      </header>

      <div className="mt-10">
        <ArticleBody blocks={term.content} autolink currentGlossarySlug={term.slug} />
      </div>

      {term.faq && term.faq.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Häufige Fragen
          </h2>
          <dl className="mt-4 flex flex-col gap-4">
            {term.faq.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5"
              >
                <dt className="font-medium text-foreground">{f.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Verwandte Begriffe
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
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
                    {r.shortDef}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedRecipes.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Passende Rezepte
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRecipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Passende Artikel
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} post={a} basePath="artikel" />
            ))}
          </div>
        </section>
      )}

      <GlossaryDiscovery />
    </article>
  )
}
