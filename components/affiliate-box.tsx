import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { AffiliateProduct } from '@/lib/content'

export function AffiliateBox({ products }: { products: AffiliateProduct[] }) {
  if (products.length === 0) return null

  return (
    <aside
      aria-label="Produktempfehlungen"
      className="my-10 rounded-2xl border border-accent/30 bg-secondary/40 p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Unsere Zubehör-Empfehlungen
        </h2>
        <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
          Anzeige
        </span>
      </div>

      <ul className="mt-5 flex flex-col gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-20 sm:w-20">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground">{product.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ansehen
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Mit einem Stern (*) bzw. als &bdquo;Anzeige&ldquo; gekennzeichnete Links
        sind Partner-/Affiliate-Links. Kaufst du über einen dieser Links,
        erhalten wir eine kleine Provision. Für dich ändert sich der Preis
        nicht.
      </p>
    </aside>
  )
}
