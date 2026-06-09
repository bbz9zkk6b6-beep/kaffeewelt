// Regelwerk der Barista-Engine: statische Wissensbasis, aus der die
// Empfehlungen zusammengesetzt werden. Alle Werte sind redaktionell gepflegt,
// damit keine erfundenen Angaben entstehen (keine Halluzinationen).
import type { BrewMethodId } from '@/lib/content/brewing'
import type {
  BrewProblem,
  Intensity,
  MilkPreference,
  RecognizedMethod,
} from './types'

// Mappt jede erkannte Methode auf eine konkrete Rechner-Methode.
// V60/Chemex nutzen die Filterkaffee-Werte, Flat White die Cappuccino-Werte.
export const methodToBrew: Record<RecognizedMethod, BrewMethodId> = {
  filterkaffee: 'filterkaffee',
  v60: 'filterkaffee',
  chemex: 'filterkaffee',
  'french-press': 'french-press',
  aeropress: 'aeropress',
  'cold-brew': 'cold-brew',
  espresso: 'espresso',
  cappuccino: 'cappuccino',
  'flat-white': 'cappuccino',
  'latte-macchiato': 'latte-macchiato',
  'iced-coffee': 'iced-coffee',
}

// Schöner Anzeigename je erkannter Methode (auch für die, die der Rechner
// nicht separat führt).
export const methodLabels: Record<RecognizedMethod, string> = {
  filterkaffee: 'Filterkaffee',
  v60: 'V60 Handfilter',
  chemex: 'Chemex',
  'french-press': 'French Press',
  aeropress: 'AeroPress',
  'cold-brew': 'Cold Brew',
  espresso: 'Espresso',
  cappuccino: 'Cappuccino',
  'flat-white': 'Flat White',
  'latte-macchiato': 'Latte Macchiato',
  'iced-coffee': 'Iced Coffee',
}

// Verwandte Glossar-Slugs je Methode (für die Begriffsempfehlung).
export const methodGlossary: Partial<Record<RecognizedMethod, string[]>> = {
  filterkaffee: ['blooming', 'extraktion', 'mahlgrad'],
  v60: ['blooming', 'extraktion', 'mahlgrad'],
  chemex: ['blooming', 'extraktion'],
  'french-press': ['french-press', 'mahlgrad', 'extraktion'],
  aeropress: ['extraktion', 'mahlgrad'],
  'cold-brew': ['cold-brew', 'extraktion'],
  espresso: ['espresso', 'crema', 'extraktion'],
  cappuccino: ['crema', 'espresso'],
  'flat-white': ['crema', 'espresso'],
  'latte-macchiato': ['espresso', 'crema'],
  'iced-coffee': ['extraktion', 'mahlgrad'],
}

// Verwandte Artikel-Slugs je Methode.
export const methodArticles: Partial<Record<RecognizedMethod, string[]>> = {
  filterkaffee: ['die-richtige-muehle', 'wasser-die-unterschaetzte-zutat'],
  v60: ['die-richtige-muehle', 'wasser-die-unterschaetzte-zutat'],
  chemex: ['wasser-die-unterschaetzte-zutat'],
  'french-press': ['die-richtige-muehle'],
  aeropress: ['die-richtige-muehle'],
  'cold-brew': ['wasser-die-unterschaetzte-zutat'],
  espresso: ['latte-art-fuer-einsteiger', 'die-richtige-muehle'],
  cappuccino: ['latte-art-fuer-einsteiger'],
  'flat-white': ['latte-art-fuer-einsteiger'],
  'latte-macchiato': ['latte-art-fuer-einsteiger'],
  'iced-coffee': ['kaffeeanbau-weltweit'],
}

// Empfohlene Methode je Intensität, wenn der Nutzer keine Methode nennt.
export const intensityMethod: Record<Intensity, RecognizedMethod> = {
  mild: 'filterkaffee',
  ausgewogen: 'aeropress',
  kräftig: 'french-press',
}

// Methode passend zur Milchpräferenz, falls keine Methode genannt wird.
export const milkMethod: Partial<Record<MilkPreference, RecognizedMethod>> = {
  schwarz: 'filterkaffee',
  'wenig-milch': 'espresso',
  'mit-milch': 'cappuccino',
  'viel-milch': 'latte-macchiato',
}

// Ordnet einen Glossarbegriff einer Zubereitungsmethode zu – für den Fall,
// dass jemand direkt nach einem Begriff fragt und wir passende Rezepte zeigen.
export const termMethod: Record<string, RecognizedMethod | undefined> = {
  'french-press': 'french-press',
  'cold-brew': 'cold-brew',
  espresso: 'espresso',
  crema: 'espresso',
  blooming: 'filterkaffee',
  mahlgrad: 'filterkaffee',
  extraktion: 'filterkaffee',
}

export type ProblemAdvice = {
  label: string
  cause: string
  tips: string[]
  glossary: string[]
}

// Ursachen + konkrete Tipps je erkanntem Problem.
export const problemAdvice: Record<BrewProblem, ProblemAdvice> = {
  bitter: {
    label: 'Bitterer Kaffee',
    cause:
      'Bitterkeit entsteht meist durch Überextraktion – das Wasser löst zu viele Bitterstoffe.',
    tips: [
      'Mahle etwas gröber, damit das Wasser schneller durchläuft.',
      'Senke die Brühtemperatur leicht auf etwa 92 °C.',
      'Verkürze die Kontaktzeit bzw. die Brühdauer.',
    ],
    glossary: ['extraktion', 'mahlgrad'],
  },
  sauer: {
    label: 'Saurer Kaffee',
    cause:
      'Säure deutet auf Unterextraktion hin – es werden zu wenige Aromastoffe gelöst.',
    tips: [
      'Mahle etwas feiner, um die Extraktion zu erhöhen.',
      'Erhöhe die Brühtemperatur auf 94–96 °C.',
      'Verlängere die Brühzeit leicht.',
    ],
    glossary: ['extraktion', 'mahlgrad'],
  },
  duenn: {
    label: 'Dünner Kaffee',
    cause:
      'Ein dünner Körper entsteht oft durch ein zu weites Kaffee-Wasser-Verhältnis.',
    tips: [
      'Verwende mehr Kaffee im Verhältnis zum Wasser.',
      'Prüfe mit einer Waage, ob du das empfohlene Verhältnis triffst.',
      'Achte auf frisch gemahlenen Kaffee.',
    ],
    glossary: ['extraktion', 'mahlgrad'],
  },
  'wenig-aroma': {
    label: 'Wenig Aroma',
    cause:
      'Fehlendes Aroma liegt häufig an alten Bohnen oder zu früh gemahlenem Kaffee.',
    tips: [
      'Mahle die Bohnen erst direkt vor dem Brühen.',
      'Verwende frisch geröstete Bohnen (ideal 1–4 Wochen nach Röstung).',
      'Achte auf gutes, nicht zu hartes Wasser.',
    ],
    glossary: ['extraktion', 'mahlgrad'],
  },
  kalt: {
    label: 'Kaffee wird zu schnell kalt',
    cause:
      'Wärme geht über Tasse und Equipment verloren, bevor der Kaffee fertig ist.',
    tips: [
      'Spüle Tasse und Filter vorab mit heißem Wasser.',
      'Serviere zügig nach dem Brühen.',
      'Nutze eine vorgewärmte Thermokanne für größere Mengen.',
    ],
    glossary: [],
  },
  ueberextrahiert: {
    label: 'Überextrahierter Kaffee',
    cause:
      'Adstringierende, pelzige Noten entstehen, wenn zu viel aus dem Kaffee gelöst wird.',
    tips: [
      'Mahle gröber und verkürze die Brühzeit.',
      'Reduziere die Temperatur leicht.',
      'Prüfe das Verhältnis – oft hilft etwas mehr Wasser.',
    ],
    glossary: ['extraktion', 'mahlgrad'],
  },
}
