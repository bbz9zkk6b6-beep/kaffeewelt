import type { Article } from './types'

export type AffiliateProduct = {
  id: string
  name: string
  description: string
  url: string
  image: string
}

const TAG = 'kaffeewelt21-21'

// Produkt-Katalog — Amazon-Suche mit Affiliate-Tag.
// Sobald du konkrete ASINs hast, tausche die Suchanfragen gegen direkte Links:
// `https://www.amazon.de/dp/ASIN?tag=${TAG}`
export const affiliateProducts: Record<string, AffiliateProduct> = {
  grinder_electric: {
    id: 'grinder_electric',
    name: 'Elektrische Kaffeemühle',
    description: 'Kegelmahlwerk, 40+ Mahlstufen — der Standard für Filterkaffee und Espresso ab ~120 €.',
    url: `https://www.amazon.de/s?k=elektrische+kaffeemühle+kegelmahlwerk&tag=${TAG}`,
    image: '/images/affiliate-grinder.png',
  },
  grinder_hand: {
    id: 'grinder_hand',
    name: 'Handmühle (z. B. Comandante C40)',
    description: 'Kompakt, leise, erstklassiges Mahlbild — ideal für Reisen und Single-Portionen.',
    url: `https://www.amazon.de/s?k=comandante+c40+handmühle&tag=${TAG}`,
    image: '/images/affiliate-grinder.png',
  },
  scale: {
    id: 'scale',
    name: 'Kaffeewaage mit Timer',
    description: 'Präzision auf 0,1 g genau — für reproduzierbare Ergebnisse bei jeder Brühmethode.',
    url: `https://www.amazon.de/s?k=kaffeewaage+timer+0.1g&tag=${TAG}`,
    image: '/images/affiliate-scale.png',
  },
  kettle: {
    id: 'kettle',
    name: 'Wasserkocher mit Temperaturkontrolle',
    description: '60–100 °C stufenlos einstellbar — Filter braucht 93 °C, Espresso eher 90 °C.',
    url: `https://www.amazon.de/s?k=wasserkocher+temperaturregelung+kaffee&tag=${TAG}`,
    image: '/images/affiliate-kettle.png',
  },
  milk_frother: {
    id: 'milk_frother',
    name: 'Milchaufschäumer',
    description: 'Für cremige Milch zuhause — elektrisch oder manuell, beide taugen für Latte Art.',
    url: `https://www.amazon.de/s?k=milchaufschäumer+elektrisch&tag=${TAG}`,
    image: '/images/affiliate-scale.png',
  },
  espresso_machine: {
    id: 'espresso_machine',
    name: 'Espressomaschine (Siebträger)',
    description: 'Der Einstieg in echten Espresso — mit Dampflanze für Milchschaum.',
    url: `https://www.amazon.de/s?k=espressomaschine+siebträger+einsteiger&tag=${TAG}`,
    image: '/images/affiliate-kettle.png', // TODO: echtes Produktbild ersetzen
  },
  vollautomat: {
    id: 'vollautomat',
    name: 'Kaffeevollautomat',
    description: 'Bohne rein, Kaffee raus — mit Mahlwerk, Brühgruppe und Milchsystem.',
    url: `https://www.amazon.de/s?k=kaffeevollautomat+mit+mahlwerk&tag=${TAG}`,
    image: '/images/affiliate-kettle.png', // TODO: echtes Produktbild ersetzen
  },
  water_filter: {
    id: 'water_filter',
    name: 'Wasserfilter für Kaffee',
    description: 'Reduziert Chlor und Kalk — macht den größten Unterschied bei hartem Leitungswasser.',
    url: `https://www.amazon.de/s?k=wasserfilter+kaffee+brita&tag=${TAG}`,
    image: '/images/affiliate-kettle.png',
  },
  aeropress: {
    id: 'aeropress',
    name: 'AeroPress Coffee Maker',
    description: 'Schnell, kompakt, flexibel — funktioniert mit jeder Röstung, überall.',
    url: `https://www.amazon.de/s?k=aeropress+coffee+maker&tag=${TAG}`,
    image: '/images/affiliate-scale.png',
  },
}

// Artikel → Produktempfehlungen (maximal 2–3 pro Artikel).
const articleAffiliateMap: Record<string, string[]> = {
  'die-richtige-muehle':          ['grinder_electric', 'grinder_hand', 'scale'],
  'kaffeeanbau-weltweit':         ['grinder_electric', 'scale'],
  'latte-art-fuer-einsteiger':    ['milk_frother', 'espresso_machine', 'scale'],
  'wasser-die-unterschaetzte-zutat': ['kettle', 'water_filter'],
  'roestgrade-verstehen':         ['grinder_electric', 'scale'],
  'roestung-espresso':            ['espresso_machine', 'grinder_electric'],
  'koffein-dunkle-roestung':      ['grinder_electric', 'scale'],
  'roestung-vollautomat':         ['vollautomat'],
  'saeurearmer-roestgrad':        ['grinder_electric', 'aeropress'],
}

const newsAffiliateMap: Record<string, string[]> = {}

export function getAffiliateProducts(article: Article): AffiliateProduct[] {
  const ids = articleAffiliateMap[article.slug] ?? []
  return ids
    .map((id) => affiliateProducts[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
}

export function getAffiliateProductsForNews(slug: string): AffiliateProduct[] {
  const ids = newsAffiliateMap[slug] ?? []
  return ids
    .map((id) => affiliateProducts[id])
    .filter((p): p is AffiliateProduct => Boolean(p))
}
