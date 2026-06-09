import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/page-header'
import { ArticleFilter } from '@/components/article-filter'
import { Newsletter } from '@/components/newsletter'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { articles } from '@/lib/content/articles'
import { sectionCrumbs } from '@/lib/content/taxonomy'

export const metadata: Metadata = {
  title: 'Artikel & Ratgeber',
  description:
    'Fundierte Artikel rund um Kaffee: Bohnenkunde, Zubereitung, Zubehör und mehr – verständlich erklärt.',
}

export default function ArticlesPage() {
  // Neueste zuerst
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <>
      <PageHeader
        eyebrow="Wissen & Ratgeber"
        title="Artikel & Ratgeber"
        description="Hintergründe, Anleitungen und Empfehlungen rund um die schwarze Bohne – von den Grundlagen bis zu Profi-Tipps."
        breadcrumbs={<Breadcrumbs items={sectionCrumbs('artikel')} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Suspense fallback={null}>
          <ArticleFilter articles={sorted} />
        </Suspense>
        <div className="mt-14">
          <Newsletter />
        </div>
      </div>
    </>
  )
}
