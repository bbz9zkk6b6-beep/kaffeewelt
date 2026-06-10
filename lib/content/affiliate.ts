import type { Article } from './types'

export type AffiliateProduct = {
  id: string
  name: string
  description: string
  url: string
  image: string
}

// Amazon Associates Produkte — mit Affiliate-Links.
export const affiliateProducts: Record<string, AffiliateProduct> = {
  grinder: {
    id: 'grinder',
    name: 'Premium Kaffeemühle',
    description: 'Hochwertige Burr-Mühle für gleichmäßiges Mahlen',
    url: 'https://amazon.de/s?k=premium+kaffeemühle&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/grinder.jpg',
  },
  scale: {
    id: 'scale',
    name: 'Digitale Kaffeewaage',
    description: 'Genaue Skalenmessung für präzises Brühen',
    url: 'https://amazon.de/s?k=kaffeewaage+digital&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/scale.jpg',
  },
  thermostat: {
    id: 'thermostat',
    name: 'Digitales Thermometer',
    description: 'Temperaturmessung für optimales Brühen',
    url: 'https://amazon.de/s?k=digitales+thermometer+kaffee&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/thermometer.jpg',
  },
  frenchpress: {
    id: 'frenchpress',
    name: 'Stilvelle French Press',
    description: '0,8L Glas French Press für 4 Tassen',
    url: 'https://amazon.de/s?k=french+press+0.8l&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/frenchpress.jpg',
  },
  pour_over: {
    id: 'pour_over',
    name: 'Premium Dripper Set',
    description: 'Pour-Over-Set mit Filter und Ständer',
    url: 'https://amazon.de/s?k=pour+over+dripper+set&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/pourover.jpg',
  },
  aeropress: {
    id: 'aeropress',
    name: 'Aeropress Coffee Maker',
    description: 'Tragbare Aeropress für unterwegs',
    url: 'https://amazon.de/s?k=aeropress+coffee+maker&tag=YOUR_ASSOCIATE_ID',
    image: '/images/products/aeropress.jpg',
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
