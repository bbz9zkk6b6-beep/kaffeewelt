// Zentrale Inhaltstypen für "Meine kleine Kaffeewelt"
// CMS-orientiert: Diese Typen bilden die spätere Datenstruktur eines Headless-CMS ab.

export type Author = {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
}

export type Category = {
  slug: string
  name: string
  description: string
  icon: string // lucide icon name
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string // category slug
  author: string // author slug
  date: string // ISO
  readingTime: number // minutes
  image: string
  featured?: boolean
  content: ArticleBlock[]
}

export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readingTime: number
  image: string
  content: ArticleBlock[]
}

export type ArticleBlock =
  | { type: 'heading'; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] }

export type RecipeType =
  | 'espresso'
  | 'filterkaffee'
  | 'cold-brew'
  | 'cappuccino'
  | 'latte-macchiato'
  | 'iced-coffee'
  | 'suess'
  | 'alkoholfrei'

export type Unit = 'ml' | 'g' | 'EL' | 'TL' | 'Stück' | 'Prise'

export type Ingredient = {
  name: string
  amount: number
  unit: Unit
}

export type RecipeStep = {
  title: string
  text: string
}

export type Nutrition = {
  kcal: number
  fett: number
  kohlenhydrate: number
  eiweiss: number
}

export type Recipe = {
  slug: string
  title: string
  excerpt: string
  type: RecipeType
  difficulty: 'Einfach' | 'Mittel' | 'Anspruchsvoll'
  totalTime: number // minutes
  baseServings: number
  rating: number
  ratingCount: number
  image: string
  author: string
  date: string
  featured?: boolean
  ingredients: Ingredient[]
  steps: RecipeStep[]
  tips: string[]
  nutrition: Nutrition
}

export const recipeTypeLabels: Record<RecipeType, string> = {
  espresso: 'Espresso',
  filterkaffee: 'Filterkaffee',
  'cold-brew': 'Cold Brew',
  cappuccino: 'Cappuccino',
  'latte-macchiato': 'Latte Macchiato',
  'iced-coffee': 'Iced Coffee',
  suess: 'Süße Kaffeegetränke',
  alkoholfrei: 'Alkoholfreie Spezialitäten',
}
