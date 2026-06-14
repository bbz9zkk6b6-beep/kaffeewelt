import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, Gauge, Flame, Lightbulb, Thermometer } from 'lucide-react'
import {
  recipeTypeLabels,
  formatTime,
  recipeCrumbs,
  getBrewingRecommendation,
} from '@/lib/content'
import { getAllRecipes, getRecipeBySlug } from '@/sanity/lib/fetch'
import { PortionCalculator } from '@/components/portion-calculator'
import { RatingStars } from '@/components/rating-stars'
import { RecipeCard } from '@/components/recipe-card'
import { BackLink } from '@/components/author-byline'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { RecipeRatingWidget } from '@/components/recipe-rating-widget'
import { SaveRecipeButton } from '@/components/save-recipe-button'
import { PrintRecipeButton } from '@/components/print-recipe-button'
import { CommentsSection } from '@/components/comments-section'
import { getRecipeRating } from '@/app/actions/ratings'
import { getApprovedComments } from '@/app/actions/comments'
import { autolinkGlossary } from '@/lib/glossary-autolink'

export const revalidate = 60

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) return { title: 'Rezept nicht gefunden' }
  const canonical = `/rezepte/${recipe.slug}`
  return {
    title: recipe.title,
    description: recipe.excerpt,
    alternates: { canonical },
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      url: canonical,
      type: 'article',
      images: [recipe.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.excerpt,
      images: [recipe.image],
    },
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) notFound()

  const ratingData = await getRecipeRating(recipe.slug)
  const comments = await getApprovedComments('rezepte', recipe.slug)
  // Für die Anzeige: echte Bewertungen, sonst Fallback auf den Seed-Wert.
  const displayRating =
    ratingData.count > 0 ? ratingData.average : recipe.rating
  const displayCount =
    ratingData.count > 0 ? ratingData.count : recipe.ratingCount

  // JSON-LD nur mit ECHTEN Bewertungen – Google verlangt überprüfbare Daten.
  const recipeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: [recipe.image],
    recipeCategory: recipeTypeLabels[recipe.type],
    totalTime: `PT${recipe.totalTime}M`,
    recipeYield: `${recipe.baseServings} Portionen`,
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.kcal} kcal`,
    },
    recipeIngredient: recipe.ingredients.map((ing) =>
      `${ing.amount} ${ing.unit} ${ing.name}`.trim(),
    ),
    recipeInstructions: recipe.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.text,
    })),
    ...(ratingData.count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: ratingData.average.toFixed(1),
            reviewCount: ratingData.count,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  }


  const allRecipes = await getAllRecipes()
  const related = allRecipes
    .filter((r) => r.slug !== recipe.slug && r.type === recipe.type)
    .concat(allRecipes.filter((r) => r.slug !== recipe.slug && r.type !== recipe.type))
    .slice(0, 3)

  const nutritionItems = [
    { label: 'Kalorien', value: `${recipe.nutrition.kcal} kcal` },
    { label: 'Fett', value: `${recipe.nutrition.fett} g` },
    { label: 'Kohlenhydrate', value: `${recipe.nutrition.kohlenhydrate} g` },
    { label: 'Eiweiß', value: `${recipe.nutrition.eiweiss} g` },
  ]

  // Gemeinsames Set: jeder Glossarbegriff wird pro Rezeptseite nur einmal verlinkt.
  const linkedSlugs = new Set<string>()

  const brewing = getBrewingRecommendation(recipe)

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={recipeCrumbs(recipe)} />
        <div className="mt-4">
          <BackLink href="/rezepte" label="Zurück zu den Rezepten" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={recipe.image || '/placeholder.svg'}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder={recipe.imageLqip ? 'blur' : 'empty'}
            blurDataURL={recipe.imageLqip}
            className="site-image-look object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {recipeTypeLabels[recipe.type]}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
            {autolinkGlossary(recipe.excerpt, { linkedSlugs })}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <RatingStars rating={displayRating} size={18} />
            <span className="text-sm text-muted-foreground">
              {displayRating.toFixed(1)} ({displayCount}{' '}
              {displayCount === 1 ? 'Bewertung' : 'Bewertungen'})
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 text-center">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-xs text-muted-foreground">Zeit</span>
              <span className="text-sm font-medium text-foreground">
                {formatTime(recipe.totalTime)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 text-center">
              <Gauge className="h-5 w-5 text-accent" />
              <span className="text-xs text-muted-foreground">Niveau</span>
              <span className="text-sm font-medium text-foreground">
                {recipe.difficulty}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 text-center">
              <Flame className="h-5 w-5 text-accent" />
              <span className="text-xs text-muted-foreground">pro Portion</span>
              <span className="text-sm font-medium text-foreground">
                {recipe.nutrition.kcal} kcal
              </span>
            </div>
          </div>

          <div className="no-print mt-6 flex flex-wrap gap-3">
            <SaveRecipeButton slug={recipe.slug} />
            <PrintRecipeButton />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[340px_1fr]">
        {/* Sidebar: Calculator + Brewing + Nutrition */}
        <div className="lg:order-2">
          <div className="flex flex-col gap-6 lg:sticky lg:top-20">
            <PortionCalculator
              ingredients={recipe.ingredients}
              baseServings={recipe.baseServings}
            />

            <div className="rounded-2xl border border-accent/30 bg-secondary/50 p-6">
              <div className="flex items-center gap-2 text-foreground">
                <Thermometer className="h-5 w-5 text-accent" />
                <h2 className="font-serif text-lg font-semibold">
                  Brühempfehlung
                </h2>
              </div>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Empfohlenes Verhältnis
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {brewing.ratio}
                  </dd>
                </div>
                <div className="flex gap-6">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Mahlgrad
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {brewing.grind}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Brühtemperatur
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {brewing.temperature}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Nährwerte
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Pro Portion (Richtwert)
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {nutritionItems.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl bg-secondary p-3 text-center"
                  >
                    <dt className="text-xs text-muted-foreground">{n.label}</dt>
                    <dd className="mt-1 font-serif text-lg font-bold text-foreground">
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Steps + Tips */}
        <div className="lg:order-1">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Zubereitung
          </h2>
          <ol className="mt-6 flex flex-col gap-6">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-foreground/80">
                    {autolinkGlossary(step.text, { linkedSlugs })}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {recipe.tips.length > 0 && (
            <div className="mt-10 rounded-2xl border border-accent/30 bg-secondary/50 p-6">
              <div className="flex items-center gap-2 text-foreground">
                <Lightbulb className="h-5 w-5 text-accent" />
                <h2 className="font-serif text-lg font-semibold">
                  Tipps vom Barista
                </h2>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {recipe.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-3 leading-relaxed text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {autolinkGlossary(tip, { linkedSlugs })}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="no-print mt-10">
            <RecipeRatingWidget recipeSlug={recipe.slug} initial={ratingData} />
          </div>


          <div className="no-print mt-12">
            <CommentsSection
              contentType="rezepte"
              contentSlug={recipe.slug}
              initialComments={comments}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="no-print border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Weitere Rezepte
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
