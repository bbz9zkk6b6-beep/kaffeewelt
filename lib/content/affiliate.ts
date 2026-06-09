import type { Article } from './types'

// Affiliate-Produkte für Zubehör-Artikel.
// Hinterlege bei `url` deinen echten Partnerlink (z. B. Amazon-Partnerprogramm).
// Die Boxen kennzeichnen Werbung transparent und nutzen rel="sponsored nofollow".

export type AffiliateProduct = {
  id: string
  name: string
  description: string
  image: string
  price?: string // z. B. "ab 129 €"
  retailer: string // z. B. "Amazon"
  url: string
}

export const affiliateProducts: Record<string, AffiliateProduct> = {
  grinder: {
    id: 'grinder',
    name: 'Elektrische Kegelmahlwerk-Mühle',
    description:
      'Stufenlos einstellbares Kegelmahlwerk für gleichmäßigen Mahlgrad – von Espresso bis French Press.',
    image: '/images/affiliate-grinder.png',
    price: 'ab 129 €',
    retailer: 'Amazon',
    url: 'https://www.amazon.de/?tag=DEIN-PARTNER-TAG',
  },
  scale: {
    id: 'scale',
    name: 'Kaffeewaage mit Timer',
    description:
      'Präzise auf 0,1 g genau, mit integriertem Timer für reproduzierbare Brüh-Rezepte.',
    image: '/images/affiliate-scale.png',
    price: 'ab 29 €',
    retailer: 'Amazon',
    url: 'https://www.amazon.de/?tag=DEIN-PARTNER-TAG',
  },
  kettle: {
    id: 'kettle',
    name: 'Schwanenhals-Wasserkocher',
    description:
      'Dünner Ausguss für kontrollierten Wasserfluss beim Handaufguss – ideal für Pour Over.',
    image: '/images/affiliate-kettle.png',
    price: 'ab 59 €',
    retailer: 'Amazon',
    url: 'https://www.amazon.de/?tag=DEIN-PARTNER-TAG',
  },
}

// Zuordnung: welcher Artikel zeigt welche Produkte.
const articleAffiliateMap: Record<string, string[]> = {
  'die-richtige-muehle': ['grinder', 'scale'],
}

/** Liefert die Affiliate-Produkte für einen Artikel (falls hinterlegt). */
export function getAffiliateProducts(article: Article): AffiliateProduct[] {
  const ids = articleAffiliateMap[article.slug] ?? []
  return ids
    .map((id) => affiliateProducts[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
}
