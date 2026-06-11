import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCategory, articleCrumbs, getAffiliateProducts } from '@/lib/content'
import { ArticleBody } from '@/components/article-body'
import { ArticleCard } from '@/components/article-card'
import { BackLink } from '@/components/author-byline'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { AffiliateBox } from '@/components/affiliate-box'
import { CommentsSection } from '@/components/comments-section'
import { getApprovedComments } from '@/app/actions/comments'
import { getAllArticles, getArticleBySlug } from '@/sanity/lib/fetch'
import { formatDate } from '@/lib/content'

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Artikel nicht gefunden' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [article.image] },
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
  ])
  if (!article) notFound()

  const category = getCategory(article.category)
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3)
  const comments = await getApprovedComments('artikel', article.slug)
  const affiliateProducts = getAffiliateProducts(article)

  const headings = article.content.filter(
    (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading',
  )

  return (
    <article>
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={articleCrumbs(article)} />
        <div className="mt-4">
          <BackLink href="/kategorien" label="Zur Übersicht" />
        </div>
      </div>

      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        {category && (
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            {category.name}
          </span>
        )}
        <h1 className="mt-2 text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">{formatDate(article.date)} · {article.readingTime} Min. Lesezeit</p>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_260px]">
        <div className="max-w-3xl">
          <ArticleBody blocks={article.content} autolink />
          {affiliateProducts.length > 0 && (
            <AffiliateBox products={affiliateProducts} />
          )}
          <div className="mt-12">
            <CommentsSection
              contentType="artikel"
              contentSlug={article.slug}
              initialComments={comments}
            />
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <p className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
                Inhalt
              </p>
              <nav className="mt-3 flex flex-col gap-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="text-sm leading-snug text-muted-foreground transition-colors hover:text-accent"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Das könnte dich auch interessieren
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} post={a} basePath="artikel" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
