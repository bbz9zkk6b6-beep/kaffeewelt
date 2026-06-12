import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllNews, getNewsBySlug } from '@/sanity/lib/fetch'
import { getCategory, newsCrumbs, getAffiliateProductsForNews } from '@/lib/content'
import { ArticleBody } from '@/components/article-body'
import { ArticleCard } from '@/components/article-card'
import { BackLink } from '@/components/author-byline'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { AffiliateBox } from '@/components/affiliate-box'
import { CommentsSection } from '@/components/comments-section'
import { getApprovedComments } from '@/app/actions/comments'

export const revalidate = 60

export async function generateStaticParams() {
  const news = await getAllNews()
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  if (!item) return { title: 'News nicht gefunden' }
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { images: [item.image] },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  if (!item) notFound()

  const category = getCategory(item.category)
  const allNews = await getAllNews()
  const related = allNews.filter((n) => n.slug !== item.slug).slice(0, 3)
  const comments = await getApprovedComments('news', item.slug)
  const affiliateProducts = getAffiliateProductsForNews(item.slug)

  return (
    <article>
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={newsCrumbs(item)} />
        <div className="mt-4">
          <BackLink href="/news" label="Zurück zu den News" />
        </div>
      </div>

      <header className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        {category && (
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            {category.name}
          </span>
        )}
        <h1 className="mt-2 text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {item.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">{item.date} · {item.readingTime} Min. Lesezeit</p>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover [filter:brightness(0.95)_saturate(0.85)_sepia(0.12)]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <ArticleBody blocks={item.content} autolink />
        {affiliateProducts.length > 0 && (
          <AffiliateBox products={affiliateProducts} />
        )}
        <div className="mt-12">
          <CommentsSection
            contentType="news"
            contentSlug={item.slug}
            initialComments={comments}
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Weitere News
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <ArticleCard key={n.slug} post={n} basePath="news" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
