import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Coffee, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ArticleCard } from '@/components/article-card'
import { RecipeCard } from '@/components/recipe-card'
import { Newsletter } from '@/components/newsletter'
import { CategoryIcon } from '@/components/category-icon'
import { HomeHighlights } from '@/components/home-highlights'
import { BaristaButton } from '@/components/barista-button'
import { categories } from '@/lib/content/categories'
import { news } from '@/lib/content/news'
import { getFeaturedRecipes, recipes } from '@/lib/content/recipes'
import { getCategory, formatDate } from '@/lib/content'
import { getAllArticles } from '@/sanity/lib/fetch'

export const revalidate = 60

export default async function HomePage() {
  const sanityArticles = await getAllArticles()
  const featured = sanityArticles.find((a) => a.featured) ?? sanityArticles[0]
  const featuredCategory = featured ? getCategory(featured.category) : null
  const secondaryArticles = featured
    ? sanityArticles.filter((a) => a.slug !== featured.slug).slice(0, 3)
    : []
  const latestNews = news.slice(0, 4)
  const featuredRecipes = getFeaturedRecipes().length
    ? getFeaturedRecipes()
    : recipes
  const popularRecipes = featuredRecipes.slice(0, 3)

  // Highlights
  const recipeOfWeek = featuredRecipes[0] ?? recipes[0]
  const tested = recipes[recipes.length - 1]
  const trend = news[0] ?? null

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              <Coffee className="h-4 w-4" />
              Dein Magazin rund um Kaffee
            </span>
            <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Meine kleine Kaffeewelt
            </h1>
            <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Von der ersten Bohne bis zum letzten Schluck – entdecke Rezepte,
              Kaffeewissen und die neuesten Trends für deine perfekte Tasse
              Kaffee.
            </p>
            <div className="flex flex-wrap gap-3">
              <BaristaButton />
              <Link
                href="/rezepte"
                className={buttonVariants({ size: 'lg', variant: 'outline' })}
              >
                Rezepte entdecken
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/hero-home.png"
              alt="Hände halten eine warme Kaffeetasse an einem sonnigen Frühstückstisch"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Diese Woche frisch aufgebrüht
            </h2>
            <p className="mt-1 text-muted-foreground">
              Unsere Empfehlungen, Trends und ein Kaffee-Fakt zum Mitnehmen
            </p>
          </div>
          <HomeHighlights
            recipeOfWeek={recipeOfWeek}
            trend={trend}
            tested={tested}
          />
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Beliebte Rezepte
              </h2>
              <p className="mt-1 text-muted-foreground">
                Die Lieblinge unserer Community
              </p>
            </div>
            <Link
              href="/rezepte"
              className={`${buttonVariants({ variant: 'ghost' })} hidden sm:inline-flex`}
            >
              Alle Rezepte
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Magazine */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Aus dem Magazin
              </h2>
              <p className="mt-1 text-muted-foreground">
                Lesenswertes für Kaffeeliebhaber
              </p>
            </div>
            <Link
              href="/kategorien"
              className={`${buttonVariants({ variant: 'ghost' })} hidden sm:inline-flex`}
            >
              Alle Themen
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featured && (
              <Link
                href={`/artikel/${featured.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featured.image || '/placeholder.svg'}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  {featuredCategory && (
                    <span className="text-sm font-medium text-accent">
                      {featuredCategory.name}
                    </span>
                  )}
                  <h3 className="text-balance font-serif text-2xl font-bold text-foreground">
                    {featured.title}
                  </h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <span className="mt-auto text-sm text-muted-foreground">
                    {formatDate(featured.date)} · {featured.readingTime} Min.
                    Lesezeit
                  </span>
                </div>
              </Link>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {secondaryArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  post={article}
                  basePath="artikel"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Neuigkeiten
              </h2>
              <p className="mt-1 text-muted-foreground">
                Aktuelles aus der Kaffeebranche
              </p>
            </div>
            <Link
              href="/news"
              className={`${buttonVariants({ variant: 'ghost' })} hidden sm:inline-flex`}
            >
              Alle News
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestNews.map((item) => (
              <ArticleCard key={item.slug} post={item} basePath="news" />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Kategorien
            </h2>
            <p className="mt-1 text-muted-foreground">
              Stöbere nach Themen, die dich interessieren
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategorie/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 text-center transition-colors hover:border-accent hover:bg-secondary"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <CategoryIcon name={cat.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Newsletter />
      </section>
    </div>
  )
}
