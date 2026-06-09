import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'kaffeewissen',
    name: 'Kaffeewissen',
    description:
      'Grundlagen, Geschichte und spannende Fakten rund um die schwarze Bohne.',
    icon: 'BookOpen',
  },
  {
    slug: 'bohnenkunde',
    name: 'Bohnenkunde',
    description:
      'Sorten, Anbaugebiete, Röstgrade – alles über die Herkunft deines Kaffees.',
    icon: 'Sprout',
  },
  {
    slug: 'zubereitung',
    name: 'Zubereitung',
    description:
      'Methoden und Techniken für die perfekte Tasse – von Hand bis Maschine.',
    icon: 'Coffee',
  },
  {
    slug: 'zubehoer',
    name: 'Zubehör',
    description:
      'Mühlen, Maschinen, Filter und mehr – das richtige Equipment für Genießer.',
    icon: 'Wrench',
  },
  {
    slug: 'kaffee-news',
    name: 'Kaffee-News',
    description:
      'Aktuelle Trends, Marktentwicklungen und Neuigkeiten aus der Kaffeewelt.',
    icon: 'Newspaper',
  },
  {
    slug: 'rezepte',
    name: 'Rezepte',
    description:
      'Inspiration für jeden Geschmack – heiße und kalte Kaffeekreationen.',
    icon: 'CupSoda',
  },
  {
    slug: 'tests',
    name: 'Tests & Empfehlungen',
    description:
      'Ehrliche Produkttests und Kaufberatung für Hobby-Baristas und Profis.',
    icon: 'Star',
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
