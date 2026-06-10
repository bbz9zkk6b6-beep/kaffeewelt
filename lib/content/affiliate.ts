import type { Article } from './types'

// Affiliate-Produkte für Zubehör-Artikel.
// Der Amazon Partner-Tag kommt aus der Umgebungsvariable NEXT_PUBLIC_AMAZON_TAG.
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

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || 'DEIN-PARTNER-TAG'

function amazonLink(searchTerm: string): string {
  return `https://www.amazon.de/s?k=${encodeURIComponent(searchTerm)}&tag=${AMAZON_TAG}`
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
    url: amazonLink('kaffeemühle kegelmahlwerk'),
  },
  scale: {
    id: 'scale',
    name: 'Kaffeewaage mit Timer',
    description:
      'Präzise auf 0,1 g genau, mit integriertem Timer für reproduzierbare Brüh-Rezepte.',
    image: '/images/affiliate-scale.png',
    price: 'ab 29 €',
    retailer: 'Amazon',
    url: amazonLink('kaffeewaage timer 0.1g'),
  },
  kettle: {
    id: 'kettle',
    name: 'Schwanenhals-Wasserkocher',
    description:
      'Dünner Ausguss für kontrollierten Wasserfluss beim Handaufguss – ideal für Pour Over.',
    image: '/images/affiliate-kettle.png',
    price: 'ab 59 €',
    retailer: 'Amazon',
    url: amazonLink('schwanenhals wasserkocher'),
  },
  thermostat: {
    id: 'thermostat',
    name: 'Digitales Thermometer',
    description: 'Präzise Temperaturmessung für optimales Brühen.',
    image: '/images/affiliate-thermostat.png',
    price: 'ab 19 €',
    retailer: 'Amazon',
    url: amazonLink('digitales thermometer kaffee'),
  },
  frenchpress: {
    id: 'frenchpress',
    name: 'Stilvolle French Press',
    description: '0,8 L Glas French Press für 4 Tassen.',
    image: '/images/affiliate-frenchpress.png',
    price: 'ab 35 €',
    retailer: 'Amazon',
    url: amazonLink('french press 0.8l'),
  },
  pour_over: {
    id: 'pour_over',
    name: 'Premium Dripper Set',
    description: 'Pour-Over-Set mit Filter und Ständer.',
    image: '/images/affiliate-pourover.png',
    price: 'ab 39 €',
    retailer: 'Amazon',
    url: amazonLink('pour over dripper set'),
  },
  aeropress: {
    id: 'aeropress',
    name: 'Aeropress Coffee Maker',
    description: 'Tragbare Aeropress für unterwegs.',
    image: '/images/affiliate-aeropress.png',
    price: 'ab 35 €',
    retailer: 'Amazon',
    url: amazonLink('aeropress coffee maker'),
  },
}

// Zuordnung: welcher Artikel zeigt welche Produkte.
const articleAffiliateMap: Record<string, string[]> = {
  'die-richtige-muehle': ['grinder', 'scale'],
}

// Zuordnung: welcher News-Artikel zeigt welche Produkte.
const newsAffiliateMap: Record<string, string[]> = {
  // Beispiel: 'neue-espressomaschinen-generation-2025': ['thermostat', 'scale'],
}

/** Liefert die Affiliate-Produkte für einen Artikel (falls hinterlegt). */
export function getAffiliateProducts(article: Article): AffiliateProduct[] {
  const ids = articleAffiliateMap[article.slug] ?? []
  return ids
    .map((id) => affiliateProducts[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
}

/** Liefert die Affiliate-Produkte für einen News-Artikel (falls hinterlegt). */
export function getAffiliateProductsForNews(slug: string): AffiliateProduct[] {
  const ids = newsAffiliateMap[slug] ?? []
  return ids
    .map((id) => affiliateProducts[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
}
