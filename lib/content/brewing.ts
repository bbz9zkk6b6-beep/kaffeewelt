import type { Recipe, RecipeType } from './types'

export type BrewingRecommendation = {
  ratio: string
  grind: string
  temperature: string
}

// Empfohlene Eckwerte je Zubereitungsart – als Orientierung fürs Gelingen.
const byType: Record<RecipeType, BrewingRecommendation> = {
  espresso: {
    ratio: '1:2 – ca. 18 g Kaffee auf 36 g Espresso',
    grind: 'fein',
    temperature: '90–94 °C',
  },
  filterkaffee: {
    ratio: '60 g Kaffee pro Liter Wasser',
    grind: 'mittel',
    temperature: '92–96 °C',
  },
  'cold-brew': {
    ratio: '70 g Kaffee pro Liter Wasser',
    grind: 'grob',
    temperature: 'kalt, 12–18 Std. ziehen lassen',
  },
  cappuccino: {
    ratio: '1:2 Espresso, dann ca. 120 ml Milch',
    grind: 'fein',
    temperature: '90–94 °C (Milch 60–65 °C)',
  },
  'latte-macchiato': {
    ratio: '1 Espresso auf ca. 200 ml Milch',
    grind: 'fein',
    temperature: '90–94 °C (Milch 60–65 °C)',
  },
  'iced-coffee': {
    ratio: '60 g Kaffee pro Liter, über Eis brühen',
    grind: 'mittel',
    temperature: '92–96 °C',
  },
  suess: {
    ratio: '1:2 Espresso als Basis',
    grind: 'fein',
    temperature: '90–94 °C',
  },
  alkoholfrei: {
    ratio: 'je nach Rezept, meist 60 g/L',
    grind: 'mittel',
    temperature: '92–96 °C',
  },
}

export function getBrewingRecommendation(recipe: Recipe): BrewingRecommendation {
  return byType[recipe.type]
}

// --- Brüh-Rechner: Methoden mit Mengen pro Portion ---

export type BrewMethodId =
  | 'filterkaffee'
  | 'french-press'
  | 'aeropress'
  | 'cold-brew'
  | 'espresso'
  | 'cappuccino'
  | 'latte-macchiato'
  | 'iced-coffee'

export type BrewMethod = {
  id: BrewMethodId
  label: string
  // Einheit für die Portionsanzahl, z. B. "Tasse" / "Tassen"
  portionUnit: [singular: string, plural: string]
  // Mengen pro Portion
  coffeePerPortion: number // g gemahlener Kaffee
  waterPerPortion?: number // ml Wasser
  milkPerPortion?: number // ml Milch
  drinkPerPortion?: number // g fertiges Getränk (z. B. Espresso)
  withIce?: boolean
  // Anzeige-Eckwerte
  ratio: string
  grind: string
  temperature: string
  hint: string
}

export const brewMethods: BrewMethod[] = [
  {
    id: 'filterkaffee',
    label: 'Filterkaffee',
    portionUnit: ['Tasse', 'Tassen'],
    coffeePerPortion: 12, // 60 g / 1.000 ml, Tasse = 200 ml
    waterPerPortion: 200,
    ratio: '60 g Kaffee pro 1.000 ml Wasser',
    grind: 'mittel',
    temperature: '92–96 °C',
    hint: 'Klassisches goldenes Verhältnis für Hand- und Maschinenfilter.',
  },
  {
    id: 'french-press',
    label: 'French Press',
    portionUnit: ['Tasse', 'Tassen'],
    coffeePerPortion: 17.5, // 70 g / 1.000 ml, Tasse = 250 ml
    waterPerPortion: 250,
    ratio: '70 g Kaffee pro 1.000 ml Wasser',
    grind: 'grob',
    temperature: '92–96 °C',
    hint: 'Ca. 4 Minuten ziehen lassen, dann langsam herunterdrücken.',
  },
  {
    id: 'aeropress',
    label: 'AeroPress',
    portionUnit: ['Portion', 'Portionen'],
    coffeePerPortion: 16,
    waterPerPortion: 230,
    ratio: '16 g Kaffee pro 230 ml Wasser',
    grind: 'mittelfein',
    temperature: '85–92 °C',
    hint: 'Etwas kühleres Wasser sorgt für ein weicheres Aroma.',
  },
  {
    id: 'cold-brew',
    label: 'Cold Brew',
    portionUnit: ['Glas', 'Gläser'],
    coffeePerPortion: 22, // 110 g / 1.000 ml, Glas = 200 ml
    waterPerPortion: 200,
    ratio: '110 g Kaffee pro 1.000 ml Wasser',
    grind: 'grob',
    temperature: 'kalt, 12–18 Std. ziehen',
    hint: 'Im Kühlschrank über Nacht extrahieren, dann filtern.',
  },
  {
    id: 'espresso',
    label: 'Espresso',
    portionUnit: ['Shot', 'Shots'],
    coffeePerPortion: 18,
    drinkPerPortion: 36,
    ratio: '1:2 – ca. 18 g auf 36 g Getränk',
    grind: 'fein',
    temperature: '90–94 °C',
    hint: 'Brühzeit ca. 25–30 Sekunden für eine ausgewogene Tasse.',
  },
  {
    id: 'cappuccino',
    label: 'Cappuccino',
    portionUnit: ['Tasse', 'Tassen'],
    coffeePerPortion: 18,
    drinkPerPortion: 36,
    milkPerPortion: 120,
    ratio: '18 g Espresso + 120 ml Milch',
    grind: 'fein',
    temperature: '90–94 °C (Milch 60–65 °C)',
    hint: 'Feinporiger Milchschaum macht den Cappuccino cremig.',
  },
  {
    id: 'latte-macchiato',
    label: 'Latte Macchiato',
    portionUnit: ['Glas', 'Gläser'],
    coffeePerPortion: 18,
    drinkPerPortion: 36,
    milkPerPortion: 200,
    ratio: '18 g Espresso + 200 ml Milch',
    grind: 'fein',
    temperature: '90–94 °C (Milch 60–65 °C)',
    hint: 'Erst die warme Milch, dann den Espresso langsam eingießen.',
  },
  {
    id: 'iced-coffee',
    label: 'Iced Coffee',
    portionUnit: ['Glas', 'Gläser'],
    coffeePerPortion: 18,
    waterPerPortion: 180,
    withIce: true,
    ratio: '18 g Kaffee + 180 ml Wasser/Milch + Eis',
    grind: 'mittel',
    temperature: '92–96 °C, über Eis',
    hint: 'Heiß über reichlich Eiswürfel brühen, damit nichts verwässert.',
  },
]
