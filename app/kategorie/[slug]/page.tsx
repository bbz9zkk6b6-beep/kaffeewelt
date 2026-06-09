import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { ArticleCard } from '@/components/article-card'
import { RecipeCard } from '@/components/recipe-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import {
  categories,
  getCategory,
  articles,
  recipes,
  news,
  categoryCrumbs,
} from '@/lib/content'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return { title: 'Kategorie nicht gefunden' }
  return {
    title: `${category.name} | Meine kleine Kaffeewelt`,
    description: category.description,
  }
}

export default async function KategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const categoryArticles = articles.filter((a) => a.category === slug)
  const showRecipes = slug === 'rezepte'
  const showNews = slug === 'kaffee-news'

  const isEmpty =
    categoryArticles.length === 0 && !showRecipes && !showNews

  return (
    <>
      <PageHeader
        eyebrow="Kategorie"
        title={category.name}
        description={category.description}
        breadcrumbs={<Breadcrumbs items={categoryCrumbs(category.slug)} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {showNews && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <ArticleCard key={item.slug} post={item} basePath="news" />
            ))}
          </div>
        )}

        {showRecipes && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        )}

        {!showRecipes && !showNews && categoryArticles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} post={article} basePath="artikel" />
            ))}
          </div>
        )}

        {isEmpty && (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              In dieser Kategorie sind bald neue Beiträge verfügbar. Schau
              gerne später wieder vorbei!
            </p>
          </div>
        )}
      </div>
    </>
  )
}
