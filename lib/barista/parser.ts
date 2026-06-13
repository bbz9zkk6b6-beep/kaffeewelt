// Parser: extrahiert strukturierte Parameter aus einer freien Nutzerfrage.
// Rein regelbasiert, ohne externe Abhängigkeiten – schnell und deterministisch.
import { getGlossaryLinkIndex } from '@/lib/content/glossary'
import type {
  BrewProblem,
  Intensity,
  MilkPreference,
  ParsedQuery,
  RecognizedMethod,
} from './types'

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
}

// Zahlwörter (eins–zwölf) für die Personenerkennung.
const numberWords: Record<string, number> = {
  ein: 1,
  eine: 1,
  einen: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  fünf: 5,
  fuenf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
  zehn: 10,
  elf: 11,
  zwölf: 12,
  zwoelf: 12,
}

// Methoden-Aliase: jedes Schlüsselwort verweist auf eine erkannte Methode.
const methodAliases: { keywords: string[]; method: RecognizedMethod }[] = [
  { keywords: ['v60', 'hario'], method: 'v60' },
  { keywords: ['chemex'], method: 'chemex' },
  { keywords: ['flat white', 'flatwhite'], method: 'flat-white' },
  {
    keywords: ['french press', 'frenchpress', 'pressstempel', 'stempelkanne'],
    method: 'french-press',
  },
  { keywords: ['aeropress', 'aero press'], method: 'aeropress' },
  { keywords: ['cold brew', 'coldbrew', 'kaltbrüh', 'kaltbruh', 'sommer', 'sommergetränk', 'heiß draußen', 'im sommer', 'bei hitze', 'eiskalt', 'erfrischend'], method: 'cold-brew' },
  { keywords: ['irish coffee', 'irish coffy', 'whiskey kaffee', 'winter', 'wintergetränk', 'wärmt', 'kalt draußen', 'im winter', 'weihnacht'], method: 'espresso' },
  { keywords: ['cappuccino', 'cappucino'], method: 'cappuccino' },
  { keywords: ['latte macchiato', 'latte', 'macchiato'], method: 'latte-macchiato' },
  { keywords: ['iced coffee', 'eiskaffee', 'eis kaffee'], method: 'iced-coffee' },
  { keywords: ['espresso', 'espresso'], method: 'espresso' },
  { keywords: ['filterkaffee', 'filter kaffee', 'handfilter', 'pour over', 'pour-over'], method: 'filterkaffee' },
]

function detectMethod(text: string): RecognizedMethod | undefined {
  for (const { keywords, method } of methodAliases) {
    if (keywords.some((k) => text.includes(k))) return method
  }
  return undefined
}

function detectIntensity(text: string): Intensity | undefined {
  if (/(kräftig|kraftig|stark|intensiv|vollmundig|kick|wach)/.test(text)) {
    return 'kräftig'
  }
  if (/(mild|sanft|leicht|bekömmlich|bekommlich|säurearm|saeurearm|wenig koffein)/.test(text)) {
    return 'mild'
  }
  if (/(ausgewogen|ausbalanciert|harmonisch|normal)/.test(text)) {
    return 'ausgewogen'
  }
  return undefined
}

function detectServings(text: string): number | undefined {
  // "für 5", "5 personen", "5 gäste", "6 tassen"
  const numeric = text.match(
    /(\d{1,2})\s*(personen|leute|gäste|gaeste|tassen|tasse|portionen|gläser|glaeser|shots)?/,
  )
  if (numeric) {
    const value = Number.parseInt(numeric[1], 10)
    if (value >= 1 && value <= 50) return value
  }

  // Zahlwörter mit folgender Mengeneinheit oder "zu fünft"
  const wordMatch = text.match(
    /(ein|eine|einen|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)\s*(personen|leute|gäste|gaeste|tassen|tasse|portionen|gläser|glaeser)/,
  )
  if (wordMatch) return numberWords[wordMatch[1]]

  // "zu fünft", "zu dritt"
  const collective: Record<string, number> = {
    'zu zweit': 2,
    'zu dritt': 3,
    'zu viert': 4,
    'zu fünft': 5,
    'zu fuenft': 5,
    'zu sechst': 6,
    'zu siebt': 7,
    'zu acht': 8,
  }
  for (const [phrase, value] of Object.entries(collective)) {
    if (text.includes(phrase)) return value
  }

  return undefined
}

function detectMilk(text: string): MilkPreference | undefined {
  if (/(viel milch|extra milch|milchig)/.test(text)) return 'viel-milch'
  if (/(wenig milch|schuss milch|tröpfchen|tropfchen)/.test(text)) return 'wenig-milch'
  if (/(schwarz|ohne milch|pur)/.test(text)) return 'schwarz'
  if (/(mit milch|milchkaffee|milch)/.test(text)) return 'mit-milch'
  return undefined
}

function detectProblem(text: string): BrewProblem | undefined {
  const mentionsProblem =
    /(schmeckt|ist|wird|zu |problem|hilfe|falsch|nicht gut)/.test(text)
  if (/bitter|verbrannt/.test(text)) return 'bitter'
  if (/sauer|säuerlich|saeuerlich|spitz/.test(text)) return 'sauer'
  if (/dünn|duenn|wässrig|wassrig|wässerig/.test(text)) return 'duenn'
  if (/(wenig|kein|kaum)\s*(aroma|geschmack)|fad|langweilig/.test(text)) {
    return 'wenig-aroma'
  }
  if (mentionsProblem && /(kalt|lauwarm)/.test(text)) return 'kalt'
  if (/überextra|ueberextra|adstringierend|pelzig/.test(text)) return 'ueberextrahiert'
  return undefined
}

// Erkennt, ob die Frage nach einer Erklärung/Definition verlangt.
function asksForDefinition(text: string): boolean {
  return /(was ist|was bedeutet|was sind|was heißt|was heisst|erklär|erklar|bedeutung von|definition|unterschied zwischen|wofür steht|wofur steht|was versteht man)/.test(
    text,
  )
}

// Sucht einen Glossarbegriff (oder ein Synonym) in der Frage. Längere Phrasen
// haben Vorrang, damit z. B. "French Press" vor "Press" gewinnt.
function detectDefinition(text: string): string | undefined {
  for (const entry of getGlossaryLinkIndex()) {
    const phrase = entry.phrase.toLowerCase()
    // Wortgrenzen beachten, damit Teiltreffer vermieden werden.
    const pattern = new RegExp(
      `(^|[^a-zäöüß])${escapeRegExp(phrase)}([^a-zäöüß]|$)`,
    )
    if (pattern.test(text)) return entry.slug
  }
  return undefined
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function parseQuery(input: string): ParsedQuery {
  const text = normalize(input)
  const asksDefinition = asksForDefinition(text)
  return {
    raw: input,
    method: detectMethod(text),
    intensity: detectIntensity(text),
    servings: detectServings(text),
    milk: detectMilk(text),
    problem: detectProblem(text),
    asksDefinition,
    // Begriff nur dann als Definitionsanker werten, wenn auch danach gefragt wird.
    definitionSlug: asksDefinition ? detectDefinition(text) : undefined,
  }
}
