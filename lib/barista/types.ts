// Gemeinsame Typen für die Barista-Empfehlungs-Engine.
import type { BrewMethodId } from '@/lib/content/brewing'

// Erkannte Intensität aus der Nutzerfrage.
export type Intensity = 'mild' | 'ausgewogen' | 'kräftig'

// Erkannte Milchpräferenz.
export type MilkPreference = 'schwarz' | 'wenig-milch' | 'mit-milch' | 'viel-milch'

// Bekannte Probleme, für die wir gezielte Tipps liefern.
export type BrewProblem =
  | 'bitter'
  | 'sauer'
  | 'duenn'
  | 'wenig-aroma'
  | 'kalt'
  | 'ueberextrahiert'

// Zubereitungsarten, die der Parser erkennt. Mehr als die reinen
// Rechner-Methoden, damit auch V60, Chemex und Flat White verstanden werden.
export type RecognizedMethod =
  | BrewMethodId
  | 'v60'
  | 'chemex'
  | 'flat-white'

// Strukturiertes Ergebnis des Parsers.
export type ParsedQuery = {
  raw: string
  method?: RecognizedMethod
  intensity?: Intensity
  servings?: number
  milk?: MilkPreference
  problem?: BrewProblem
  // Slug eines Glossarbegriffs, wenn die Frage nach einer Definition klingt
  // (z. B. "Was ist Crema?", "Was bedeutet Blooming?").
  definitionSlug?: string
  // True, wenn die Frage explizit eine Erklärung verlangt ("was ist …").
  asksDefinition?: boolean
}
