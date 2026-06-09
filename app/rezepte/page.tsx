import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/page-header'
import { RecipeFilter } from '@/components/recipe-filter'
import { Newsletter } from '@/components/newsletter'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { recipes } from '@/lib/content/recipes'
import { sectionCrumbs } from '@/lib/content/taxonomy'

export const metadata: Metadata = {
  title: 'Kaffee-Rezepte',
  description:
    'Von Espresso über Cold Brew bis zu süßen Spezialitäten – Rezepte mit praktischem Portionsrechner.',
}

export default function RecipesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zum Nachmachen"
        title="Kaffee-Rezepte"
        description="Heiße und kalte Kaffeekreationen mit Schritt-für-Schritt-Anleitung und praktischem Portionsrechner."
        breadcrumbs={<Breadcrumbs items={sectionCrumbs('rezepte')} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Suspense fallback={null}>
          <RecipeFilter recipes={recipes} />
        </Suspense>
        <div className="mt-14">
          <Newsletter />
        </div>
      </div>
    </>
  )
}
