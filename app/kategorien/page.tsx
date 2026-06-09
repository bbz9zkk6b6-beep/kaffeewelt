import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { CategoryIcon } from '@/components/category-icon'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { categories, articles, recipes, news } from '@/lib/content'
import { sectionCrumbs } from '@/lib/content/taxonomy'

export const metadata: Metadata = {
  title: 'Kategorien | Meine kleine Kaffeewelt',
  description:
    'Entdecke alle Themenbereiche rund um Kaffee – von Bohnenkunde über Zubereitung bis zu Rezepten und Produkttests.',
}

function countForCategory(slug: string): number {
  if (slug === 'rezepte') return recipes.length
  if (slug === 'kaffee-news') return news.length
  return articles.filter((a) => a.category === slug).length
}

export default function KategorienPage() {
  return (
    <>
      <PageHeader
        eyebrow="Themen"
        title="Kategorien"
        description="Stöbere durch unsere Themenwelten und finde genau das Wissen, das du suchst – von der ersten Bohne bis zur perfekten Tasse."
        breadcrumbs={<Breadcrumbs items={sectionCrumbs('kategorien')} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = countForCategory(cat.slug)
            return (
              <Link
                key={cat.slug}
                href={`/kategorie/${cat.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <CategoryIcon name={cat.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-serif text-xl font-semibold text-card-foreground">
                  {cat.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
                <span className="mt-5 flex items-center justify-between text-sm font-medium text-accent">
                  {count} {count === 1 ? 'Beitrag' : 'Beiträge'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
