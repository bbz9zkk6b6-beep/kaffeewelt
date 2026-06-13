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
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={newsCrumbs(item)} />
        <div className="mt-4">
          <BackLink href="/news" label="Zurück zu den News" />
        </div>
      </div>

      <header className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
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

      <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="site-image-look object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_260px]">
        <div>
          <ArticleBody blocks={item.content} autolink />
          <div className="mt-12">
            <CommentsSection
              contentType="news"
              contentSlug={item.slug}
              initialComments={comments}
            />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            {item.content.filter((b) => b.type === 'heading').length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-serif text-sm font-semibold uppercase tracking-wider text-foreground">
                  Inhalt
                </p>
                <nav className="mt-3 flex flex-col gap-2">
                  {item.content
                    .filter((b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading')
                    .map((b) => (
                      <a
                        key={b.id}
                        href={`#${b.id}`}
                        className="text-sm leading-snug text-muted-foreground transition-colors hover:text-accent"
                      >
                        {b.text}
                      </a>
                    ))}
                </nav>
              </div>
            )}

            <div className="rounded-xl border border-accent/30 bg-secondary/40 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-serif text-sm font-semibold text-foreground">
                  Empfehlungen
                </p>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                  Anzeige
                </span>
              </div>
              {affiliateProducts.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {affiliateProducts.slice(0, 2).map((product) => (
                    <li key={product.id}>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="group flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent"
                      >
                        <span className="text-sm font-medium text-foreground group-hover:text-accent">
                          {product.name}
                        </span>
                        <span className="text-xs leading-snug text-muted-foreground">
                          {product.description}
                        </span>
                        <span className="mt-1 text-xs font-medium text-accent">
                          Bei Amazon ansehen →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Passende Produkte folgen in Kürze.
                </p>
              )}
              <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
                Affiliate-Links — wir erhalten eine kleine Provision. Für dich ändert sich der Preis nicht.
              </p>
            </div>
          </div>
        </aside>
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
