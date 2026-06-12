import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, Check, X, ChevronLeft } from 'lucide-react'
import { getAllProducts, getProductBySlug } from '@/sanity/lib/fetch'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Produkt nicht gefunden' }
  return {
    title: `${product.title} — Meine kleine Kaffeewelt`,
    description: product.excerpt,
    openGraph: { images: [product.image] },
  }
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

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const buyHref = product.affiliateSlug
    ? `/r/${product.affiliateSlug}`
    : product.affiliateUrl ?? '#'

  return (
    <main>
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Alle Empfehlungen
        </Link>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        {/* Bild */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover [filter:brightness(0.95)_saturate(0.85)_sepia(0.12)]"
          />
        </div>

        {/* Inhalt */}
        <div className="flex flex-col">
          {product.category && (
            <span className="text-sm font-medium uppercase tracking-wider text-accent">
              {CATEGORY_LABELS[product.category] ?? product.category}
            </span>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground">
            {product.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {product.excerpt}
          </p>

          {product.priceHint && (
            <p className="mt-3 text-base font-medium text-accent">
              {product.priceHint}
            </p>
          )}

          {/* Pros & Cons */}
          {((product.pros?.length ?? 0) > 0 || (product.cons?.length ?? 0) > 0) && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(product.pros?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-foreground">Vorteile</p>
                  <ul className="space-y-1.5">
                    {product.pros!.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(product.cons?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-foreground">Nachteile</p>
                  <ul className="space-y-1.5">
                    {product.cons!.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Kauf-Button */}
          <div className="mt-8">
            <a
              href={buyHref}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Bei Amazon kaufen
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Affiliate-Link — ich erhalte eine kleine Provision, für dich
              ändert sich nichts am Preis.
            </p>
          </div>
        </div>
      </div>

      {/* Ausführliche Beschreibung */}
      {(product.body?.length ?? 0) > 0 && (
        <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
          <div className="prose prose-neutral max-w-none">
            {product.body!.map((block) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={block.id} className="mt-8 font-serif text-2xl font-bold text-foreground">
                    {block.text}
                  </h2>
                )
              }
              return (
                <p key={block.id} className="mt-4 leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
