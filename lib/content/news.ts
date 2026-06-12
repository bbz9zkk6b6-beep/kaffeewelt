import type { NewsItem } from './types'

export const news: NewsItem[] = [
  {
    slug: 'neue-espressomaschinen-generation-2025',
    title: 'Neue Generation smarter Espressomaschinen vorgestellt',
    excerpt:
      'Mehrere Hersteller zeigen Maschinen mit App-Steuerung und automatischer Druckprofilierung.',
    category: 'kaffee-news',
    author: 'jonas-keller',
    date: '2025-06-02',
    readingTime: 4,
    image: '/images/news-machine.png',
    content: [
      {
        type: 'paragraph',
        text: 'Auf der diesjährigen Kaffeemesse standen smarte Espressomaschinen im Mittelpunkt. Per App lassen sich Druckprofile speichern und für jede Bohne individuell anpassen.',
      },
      {
        type: 'paragraph',
        text: 'Besonders Einsteiger profitieren von geführten Modi, die Schritt für Schritt durch die Zubereitung leiten. Profis schätzen die volle Kontrolle über Temperatur und Druckverlauf.',
      },
    ],
  },
  {
    slug: 'fairer-handel-rekordjahr',
    title: 'Fairer Handel verzeichnet Rekordjahr bei Kaffee',
    excerpt:
      'Der Absatz von fair gehandeltem Kaffee ist in Deutschland erneut deutlich gestiegen.',
    category: 'kaffee-news',
    author: 'lena-brandt',
    date: '2025-05-30',
    readingTime: 3,
    image: '/images/news-fairtrade.png',
    content: [
      {
        type: 'paragraph',
        text: 'Immer mehr Verbraucherinnen und Verbraucher greifen zu fair gehandeltem Kaffee. Der Marktanteil wächst stetig und erreichte zuletzt einen neuen Höchststand.',
      },
      {
        type: 'paragraph',
        text: 'Produzentinnen und Produzenten profitieren von stabileren Preisen, die Investitionen in Qualität und Nachhaltigkeit ermöglichen.',
      },
    ],
  },
  {
    slug: 'trend-cold-brew-sommer',
    title: 'Cold Brew bleibt der Sommertrend 2025',
    excerpt:
      'Kalt aufgebrühter Kaffee erobert die Cafés – mild, aromatisch und erfrischend.',
    category: 'kaffee-news',
    author: 'marie-hoffmann',
    date: '2025-05-25',
    readingTime: 3,
    image: '/images/news-trend.png',
    content: [
      {
        type: 'paragraph',
        text: 'Cold Brew ist aus den Cafés nicht mehr wegzudenken. Die kalte Extraktion über viele Stunden sorgt für einen milden, säurearmen Geschmack.',
      },
      {
        type: 'paragraph',
        text: 'Auch zu Hause lässt sich Cold Brew einfach zubereiten – alles, was du brauchst, ist Zeit und grob gemahlener Kaffee.',
      },
    ],
  },
  {
    slug: 'kaffeepreise-weltmarkt',
    title: 'Weltmarktpreise für Rohkaffee weiter in Bewegung',
    excerpt:
      'Ernteausfälle und gestiegene Nachfrage sorgen für Schwankungen an den Märkten.',
    category: 'kaffee-news',
    author: 'lena-brandt',
    date: '2025-05-18',
    readingTime: 4,
    image: '/images/news-prices.png',
    content: [
      {
        type: 'paragraph',
        text: 'Die Preise für Rohkaffee unterliegen aktuell starken Schwankungen. Wetterextreme in wichtigen Anbauregionen und eine wachsende globale Nachfrage treffen aufeinander.',
      },
      {
        type: 'paragraph',
        text: 'Für Endverbraucher bedeutet das mittelfristig leicht steigende Preise – Qualität und Herkunft gewinnen dadurch zusätzlich an Bedeutung.',
      },
    ],
  },
  {
    slug: 'neue-roesterei-szene',
    title: 'Junge Röstereien beleben die Kaffeeszene',
    excerpt:
      'In vielen Städten eröffnen kleine Röstereien mit Fokus auf Transparenz und Qualität.',
    category: 'kaffee-news',
    author: 'jonas-keller',
    date: '2025-05-10',
    readingTime: 3,
    image: '/images/news-cafe.png',
    content: [
      {
        type: 'paragraph',
        text: 'Die Specialty-Coffee-Bewegung wächst: Junge Röstereien setzen auf direkte Handelsbeziehungen, transparente Herkunft und schonende Röstung.',
      },
      {
        type: 'paragraph',
        text: 'Für Genießer bedeutet das eine größere Vielfalt an Aromen und die Chance, ungewöhnliche Sorten zu entdecken.',
      },
    ],
  },
]

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug)
}
