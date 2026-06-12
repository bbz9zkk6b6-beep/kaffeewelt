import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { getAllProducts } from '@/sanity/lib/fetch'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Empfehlungen — Meine kleine Kaffeewelt',
  description: 'Kaffee-Zubehör das ich selbst nutze und empfehle — Mühlen, Maschinen, Zubehör.',
}

const CATEGORY_LABELS: Record<string, string> = {
  muehlen: 'Kaffeemühlen',
  espressomaschinen: 'Espressomaschinen',
  vollautomaten: 'Vollautomaten',
  filterkaffee: 'Filterkaffee & Pour-over',
  zubehoer: 'Zubehör',
  wasserkocher: 'Wasserkocher',
  waagen: 'Waagen & Messgeräte',
}

export default async function ProdukteUebersichtPage() {
  const products = await getAllProducts()

  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    const cat = p.category ?? 'zubehoer'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Noch keine Empfehlungen vorhanden.</p>
      </main>
    )
  }

  return (
    <main>
      <header className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          Empfehlungen
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Ausrüstung die ich kenne und empfehle — mit ehrlicher Einschätzung.
          Bei einem Kauf über meine Links erhalte ich eine kleine Provision,
          für dich ändert sich nichts am Preis.
        </p>
      </header>

      <div className="mx-auto max-w-5xl space-y-14 px-4 pb-20 sm:px-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat}>
            <h2 className="mb-6 font-serif text-xl font-semibold text-foreground">
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <Link
                  key={product.slug}
                  href={`/produkte/${product.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 [filter:brightness(0.95)_saturate(0.85)_sepia(0.12)]"
                    />
                    {product.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        Empfohlen
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                      {product.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {product.excerpt}
                    </p>
                    {product.priceHint && (
                      <p className="mt-3 text-sm font-medium text-accent">
                        {product.priceHint}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
