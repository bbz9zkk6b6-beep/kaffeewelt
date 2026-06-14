import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { sectionCrumbs } from '@/lib/content/taxonomy'
import { getAllNews } from '@/sanity/lib/fetch'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Kaffee-News',
  description:
    'Aktuelle Neuigkeiten, Trends und Entwicklungen aus der Welt des Kaffees.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'Kaffee-News',
    description:
      'Aktuelle Neuigkeiten, Trends und Entwicklungen aus der Welt des Kaffees.',
    url: '/news',
    type: 'website',
  },
}

export default async function NewsPage() {
  const news = await getAllNews()
  const [lead, ...rest] = news

  return (
    <>
      <PageHeader
        eyebrow="Aktuelles"
        title="Kaffee-News"
        description="Trends, Marktentwicklungen und Neuigkeiten aus der Kaffeebranche – kompakt zusammengefasst."
        breadcrumbs={<Breadcrumbs items={sectionCrumbs('news')} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {lead && (
          <div className="mb-10">
            <ArticleCard post={lead} basePath="news" />
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <ArticleCard key={item.slug} post={item} basePath="news" />
          ))}
        </div>
        <div className="mt-14">
          <Newsletter />
        </div>
      </div>
    </>
  )
}
