import type { Author } from './types'

export const authors: Author[] = [
  {
    slug: 'lena-brandt',
    name: 'Lena Brandt',
    role: 'Chefredakteurin & Kaffee-Sommelière',
    bio: 'Lena hat ihre Leidenschaft für Kaffee bei einer Reise durch Äthiopien entdeckt. Heute verkostet sie Bohnen aus aller Welt und teilt ihr Wissen in fundierten Artikeln.',
    avatar: '/images/author-1.png',
  },
  {
    slug: 'jonas-keller',
    name: 'Jonas Keller',
    role: 'Redakteur & Technik-Experte',
    bio: 'Jonas tüftelt für sein Leben gern an Espressomaschinen und Mühlen. In seinen Tests geht er den Dingen auf den Grund – objektiv, ehrlich und immer mit dem perfekten Shot im Blick.',
    avatar: '/images/author-2.png',
  },
  {
    slug: 'marie-hoffmann',
    name: 'Marie Hoffmann',
    role: 'Rezeptentwicklerin & Barista',
    bio: 'Marie entwickelt kreative Kaffeerezepte – von klassisch bis ausgefallen. Latte Art ist ihre große Stärke, aber auch süße Kaffeekreationen liegen ihr am Herzen.',
    avatar: '/images/author-3.png',
  },
]

export function getAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}
