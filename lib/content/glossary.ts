import type { ArticleBlock } from './types'

// Glossar von "Meine kleine Kaffeewelt".
// Jeder Begriff bekommt eine eigene Unterseite (/glossar/<slug>) mit
// ausführlicher Erklärung. CMS-orientiert aufgebaut wie die übrigen Inhalte.

export type GlossaryCategory =
  | 'bohne'
  | 'roesten'
  | 'mahlen'
  | 'zubereitung'
  | 'geschmack'
  | 'ausstattung'

export const glossaryCategoryLabels: Record<GlossaryCategory, string> = {
  bohne: 'Bohne & Anbau',
  roesten: 'Rösten',
  mahlen: 'Mahlen',
  zubereitung: 'Zubereitung',
  geschmack: 'Geschmack & Sensorik',
  ausstattung: 'Ausstattung',
}

export type GlossaryFaq = {
  question: string
  answer: string
}

export type GlossaryTerm = {
  slug: string
  term: string
  // Kurzdefinition (1 Satz) für Listen, Tooltips und Suchergebnisse.
  shortDef: string
  category: GlossaryCategory
  content: ArticleBlock[]
  // Synonyme / alternative Schreibweisen für die automatische Verlinkung.
  synonyms?: string[]
  // Optionale SEO-Overrides (sonst aus term/shortDef generiert).
  seoTitle?: string
  seoDescription?: string
  // Häufige Fragen für FAQ-Abschnitt + FAQPage-Schema.
  faq?: GlossaryFaq[]
  related?: string[] // slugs verwandter Begriffe
  relatedArticles?: string[] // slugs verknüpfter Artikel
  relatedRecipes?: string[] // slugs verknüpfter Rezepte
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'arabica',
    term: 'Arabica',
    shortDef:
      'Die weltweit am häufigsten angebaute Kaffeeart, bekannt für feine, aromatische und säurebetonte Tassen.',
    category: 'bohne',
    synonyms: ['Arabica-Bohne', 'Coffea arabica'],
    related: ['robusta', 'single-origin', 'crema'],
    relatedArticles: ['kaffeeanbau-weltweit', 'roestgrade-verstehen'],
    relatedRecipes: ['handgebruehter-filterkaffee'],
    faq: [
      {
        question: 'Warum gilt Arabica als hochwertiger als Robusta?',
        answer:
          'Arabica wächst in höheren Lagen und reift langsamer, wodurch komplexere Aromen und eine feinere Säure entstehen. Der Koffeingehalt ist niedriger und der Geschmack milder.',
      },
      {
        question: 'Wie viel Koffein enthält Arabica?',
        answer:
          'Arabica enthält mit rund 1,2 % deutlich weniger Koffein als Robusta, das auf bis zu 2,7 % kommt.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Coffea arabica macht rund 60 % der weltweiten Kaffeeproduktion aus und gilt als die hochwertigere der beiden großen Kaffeearten. Arabica-Bohnen wachsen bevorzugt in höheren Lagen zwischen 600 und 2.000 Metern, wo kühlere Temperaturen für ein langsames Reifen und damit für komplexe Aromen sorgen.',
      },
      {
        type: 'heading',
        id: 'geschmack',
        text: 'Typischer Geschmack',
      },
      {
        type: 'paragraph',
        text: 'Arabica zeichnet sich durch eine ausgeprägte Fruchtigkeit, blumige Noten und eine angenehme Säure aus. Der Koffeingehalt liegt mit etwa 1,2 % deutlich unter dem von Robusta.',
      },
      {
        type: 'list',
        items: [
          'Aromen: fruchtig, blumig, schokoladig, nussig',
          'Säure: mittel bis hoch',
          'Koffein: rund 1,2 %',
          'Anbauhöhe: 600–2.000 m',
        ],
      },
    ],
  },
  {
    slug: 'robusta',
    term: 'Robusta',
    shortDef:
      'Robuste, koffeinreiche Kaffeeart mit kräftigem, erdigem Geschmack – wichtig für Crema und Espresso-Blends.',
    category: 'bohne',
    synonyms: ['Robusta-Bohne', 'Coffea canephora', 'Canephora'],
    related: ['arabica', 'crema', 'espresso'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    relatedRecipes: ['klassischer-espresso'],
    content: [
      {
        type: 'paragraph',
        text: 'Coffea canephora, besser bekannt als Robusta, ist widerstandsfähiger gegenüber Schädlingen und Hitze als Arabica und wächst auch in tieferen Lagen. Das macht den Anbau günstiger und ertragreicher.',
      },
      {
        type: 'heading',
        id: 'geschmack',
        text: 'Typischer Geschmack',
      },
      {
        type: 'paragraph',
        text: 'Robusta schmeckt kräftiger, erdiger und bitterer als Arabica. Der hohe Koffeingehalt von bis zu 2,7 % und der höhere Anteil an Bitterstoffen sorgen für einen vollen Körper und eine stabile, dichte Crema – weshalb Robusta gern in italienischen Espresso-Blends verwendet wird.',
      },
    ],
  },
  {
    slug: 'crema',
    term: 'Crema',
    shortDef:
      'Die goldbraune Schaumschicht auf einem Espresso, die für Frische und korrekte Extraktion steht.',
    category: 'zubereitung',
    synonyms: ['Crema-Schicht'],
    related: ['espresso', 'robusta', 'extraktion'],
    relatedRecipes: ['klassischer-espresso', 'cremiger-cappuccino'],
    content: [
      {
        type: 'paragraph',
        text: 'Die Crema entsteht, wenn unter hohem Druck (rund 9 bar) heißes Wasser durch fein gemahlenen Kaffee gepresst wird. Dabei emulgieren Öle und im Kaffee gelöstes CO₂ zu einer feinporigen, haselnussbraunen Schaumschicht.',
      },
      {
        type: 'heading',
        id: 'qualitaet',
        text: 'Was die Crema verrät',
      },
      {
        type: 'paragraph',
        text: 'Eine dichte, langanhaltende Crema deutet auf frischen Kaffee und eine gelungene Extraktion hin. Helle, schnell zerfallende Crema kann auf alten Kaffee oder eine zu grobe Mahlung hindeuten, eine sehr dunkle auf Überextraktion.',
      },
    ],
  },
  {
    slug: 'espresso',
    term: 'Espresso',
    shortDef:
      'Konzentrierter Kaffee, der unter Druck aus fein gemahlenem Kaffee extrahiert wird – Basis vieler Getränke.',
    category: 'zubereitung',
    synonyms: ['Espresso-Shot', 'Espressi'],
    related: ['crema', 'extraktion', 'mahlgrad'],
    relatedArticles: ['latte-art-fuer-einsteiger'],
    relatedRecipes: ['klassischer-espresso', 'cremiger-cappuccino', 'latte-macchiato-schichten'],
    faq: [
      {
        question: 'Ist Espresso stärker als normaler Kaffee?',
        answer:
          'Pro Milliliter enthält Espresso mehr Koffein und Aromastoffe, da er konzentrierter ist. Eine ganze Tasse Filterkaffee enthält wegen der größeren Menge aber oft mehr Koffein als ein einzelner Espresso.',
      },
      {
        question: 'Wie lange sollte ein Espresso laufen?',
        answer:
          'Ein ausgewogener Espresso extrahiert in etwa 25–30 Sekunden. Läuft er schneller, ist der Mahlgrad zu grob; läuft er deutlich langsamer, zu fein.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Espresso ist keine Bohnensorte, sondern eine Zubereitungsmethode. Etwa 7–9 g Kaffee werden mit rund 9 bar Druck und 90–94 °C heißem Wasser in 25–30 Sekunden zu einem konzentrierten Getränk extrahiert.',
      },
      {
        type: 'list',
        items: [
          'Menge: 25–35 ml pro Shot',
          'Druck: ca. 9 bar',
          'Brühzeit: 25–30 Sekunden',
          'Wassertemperatur: 90–94 °C',
        ],
      },
      {
        type: 'paragraph',
        text: 'Espresso bildet die Grundlage für Cappuccino, Latte Macchiato, Flat White und viele weitere Getränke.',
      },
    ],
  },
  {
    slug: 'extraktion',
    term: 'Extraktion',
    shortDef:
      'Der Prozess, bei dem Wasser Aromen, Säuren und Öle aus dem Kaffeemehl löst.',
    category: 'geschmack',
    synonyms: ['Überextraktion', 'Unterextraktion', 'extrahieren'],
    related: ['mahlgrad', 'espresso', 'blooming'],
    relatedArticles: ['die-richtige-muehle', 'wasser-die-unterschaetzte-zutat'],
    content: [
      {
        type: 'paragraph',
        text: 'Die Extraktion beschreibt, wie viele der löslichen Stoffe aus dem Kaffeemehl ins Wasser übergehen. Sie ist der zentrale Hebel für den Geschmack.',
      },
      {
        type: 'heading',
        id: 'unter-ueber',
        text: 'Unter- und Überextraktion',
      },
      {
        type: 'paragraph',
        text: 'Unterextrahierter Kaffee schmeckt sauer und dünn, weil zu wenige Aromen gelöst wurden. Überextrahierter Kaffee wird bitter und hohl. Das Ziel ist die ausgewogene Mitte, gesteuert über Mahlgrad, Wassertemperatur, Kontaktzeit und Menge.',
      },
    ],
  },
  {
    slug: 'mahlgrad',
    term: 'Mahlgrad',
    shortDef:
      'Die Feinheit des gemahlenen Kaffees – entscheidend für die richtige Extraktion je Zubereitungsart.',
    category: 'mahlen',
    synonyms: ['Mahlgrade', 'gemahlen'],
    related: ['extraktion', 'espresso', 'french-press'],
    relatedArticles: ['die-richtige-muehle'],
    relatedRecipes: ['klassischer-espresso', 'handgebruehter-filterkaffee'],
    content: [
      {
        type: 'paragraph',
        text: 'Der Mahlgrad bestimmt, wie schnell Wasser durch das Kaffeemehl fließt und wie viel Oberfläche für die Extraktion zur Verfügung steht. Jede Zubereitungsart braucht ihren passenden Mahlgrad.',
      },
      {
        type: 'list',
        items: [
          'Espresso: fein (wie Puderzucker)',
          'Filterkaffee / Pour Over: mittel',
          'French Press: grob',
          'Cold Brew: sehr grob',
        ],
      },
    ],
  },
  {
    slug: 'french-press',
    term: 'French Press',
    shortDef:
      'Stempelkanne, in der grob gemahlener Kaffee direkt im Wasser zieht und anschließend gepresst wird.',
    category: 'ausstattung',
    synonyms: ['Pressstempelkanne', 'Stempelkanne', 'Pressstempel'],
    related: ['mahlgrad', 'extraktion', 'cold-brew'],
    content: [
      {
        type: 'paragraph',
        text: 'Die French Press (auch Pressstempelkanne) ist eine der einfachsten und zugänglichsten Zubereitungsmethoden. Grob gemahlener Kaffee zieht 4 Minuten direkt im heißen Wasser, danach trennt ein Metallsieb das Mehl ab.',
      },
      {
        type: 'paragraph',
        text: 'Da das Metallsieb Öle und feine Partikel durchlässt, entsteht ein vollmundiger, körperreicher Kaffee. Ein zu feiner Mahlgrad führt zu Trübung und Bitterkeit.',
      },
    ],
  },
  {
    slug: 'cold-brew',
    term: 'Cold Brew',
    shortDef:
      'Kalt extrahierter Kaffee, der über viele Stunden mit kaltem Wasser zieht – mild und säurearm.',
    category: 'zubereitung',
    synonyms: ['Cold-Brew', 'Cold Brew Coffee', 'Kaltbrühkaffee'],
    related: ['french-press', 'extraktion', 'mahlgrad'],
    relatedRecipes: ['cold-brew-klassisch', 'iced-coffee-erfrischend'],
    content: [
      {
        type: 'paragraph',
        text: 'Cold Brew entsteht durch das Ziehen von grob gemahlenem Kaffee in kaltem Wasser über 12 bis 24 Stunden. Die kalte, langsame Extraktion löst weniger Säuren und Bitterstoffe.',
      },
      {
        type: 'paragraph',
        text: 'Das Ergebnis ist ein besonders mildes, leicht süßliches und säurearmes Konzentrat, das pur über Eis oder mit Wasser bzw. Milch verdünnt getrunken wird.',
      },
    ],
  },
  {
    slug: 'single-origin',
    term: 'Single Origin',
    shortDef:
      'Kaffee aus einer einzigen Herkunft – etwa einem Land, einer Region oder einer einzelnen Farm.',
    category: 'bohne',
    synonyms: ['Single-Origin', 'Single Estate', 'sortenrein'],
    related: ['arabica', 'terroir', 'blend'],
    content: [
      {
        type: 'paragraph',
        text: 'Single-Origin-Kaffee stammt aus einer klar definierten Herkunft. Das kann ein Land, eine Anbauregion oder sogar eine einzelne Farm (Single Estate) sein. Im Gegensatz zum Blend wird hier nichts vermischt.',
      },
      {
        type: 'paragraph',
        text: 'Der Reiz liegt in der Rückverfolgbarkeit und im charakteristischen Geschmacksprofil, das die jeweilige Herkunft – das Terroir – widerspiegelt.',
      },
    ],
  },
  {
    slug: 'blend',
    term: 'Blend',
    shortDef:
      'Mischung verschiedener Kaffees, um ein ausgewogenes, gleichbleibendes Geschmacksprofil zu erzielen.',
    category: 'bohne',
    synonyms: ['Blends', 'Hausmischung', 'Mischung'],
    related: ['single-origin', 'arabica', 'robusta'],
    content: [
      {
        type: 'paragraph',
        text: 'Ein Blend kombiniert Bohnen unterschiedlicher Herkunft oder Arten. Ziel ist ein ausgewogenes Profil, das sich über Ernten hinweg konstant halten lässt – ideal für Espresso.',
      },
      {
        type: 'paragraph',
        text: 'Typisch sind Arabica-Robusta-Mischungen: Arabica liefert Aroma und Säure, Robusta sorgt für Körper, Crema und Koffein.',
      },
    ],
  },
  {
    slug: 'terroir',
    term: 'Terroir',
    shortDef:
      'Die Summe der natürlichen Faktoren eines Anbaugebiets, die den Geschmack des Kaffees prägen.',
    category: 'bohne',
    related: ['single-origin', 'arabica'],
    content: [
      {
        type: 'paragraph',
        text: 'Der aus dem Weinbau entlehnte Begriff Terroir beschreibt das Zusammenspiel von Boden, Höhe, Klima und Niederschlag eines Anbaugebiets. Diese Faktoren prägen den Charakter der Bohne, lange bevor sie geröstet wird.',
      },
    ],
  },
  {
    slug: 'blooming',
    term: 'Blooming',
    shortDef:
      'Das anfängliche Aufquellen des Kaffeemehls beim Übergießen, bei dem CO₂ entweicht.',
    category: 'zubereitung',
    synonyms: ['Pre-Infusion', 'Vorquellen', 'Bloom', 'Vorbrühen'],
    related: ['extraktion', 'mahlgrad'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    relatedRecipes: ['handgebruehter-filterkaffee'],
    faq: [
      {
        question: 'Wie lange sollte das Blooming dauern?',
        answer:
          'In der Regel 30–45 Sekunden. In dieser Zeit entweicht das meiste CO₂, danach folgt der Hauptaufguss.',
      },
      {
        question: 'Wie viel Wasser nimmt man zum Blooming?',
        answer:
          'Etwa die doppelte bis dreifache Menge Wasser im Verhältnis zum Kaffeemehl – gerade genug, um das gesamte Mehl zu benetzen.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Beim Blooming (auch Pre-Infusion) wird frisch gemahlener Filterkaffee zunächst mit wenig Wasser benetzt und 30–45 Sekunden stehen gelassen. Dabei entweicht das im Röstprozess gebundene CO₂, das Mehl quillt sichtbar auf.',
      },
      {
        type: 'paragraph',
        text: 'Dieser Schritt sorgt für eine gleichmäßigere Extraktion, weil das CO₂ andernfalls den Wasserdurchfluss stört und Aromen blockiert.',
      },
    ],
  },
]

const glossaryBySlug = new Map(glossary.map((t) => [t.slug, t]))

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryBySlug.get(slug)
}

// Begriffe alphabetisch sortiert (nach Anzeigename).
export function getGlossarySorted(): GlossaryTerm[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'de'))
}

// Begriffe gruppiert nach Anfangsbuchstaben (für A–Z-Darstellung).
export function getGlossaryByLetter(): { letter: string; terms: GlossaryTerm[] }[] {
  const groups = new Map<string, GlossaryTerm[]>()
  for (const term of getGlossarySorted()) {
    const letter = term.term.charAt(0).toUpperCase()
    if (!groups.has(letter)) groups.set(letter, [])
    groups.get(letter)!.push(term)
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'de'))
    .map(([letter, terms]) => ({ letter, terms }))
}

// SEO-Titel: "[Begriff] erklärt – Bedeutung und Anwendung beim Kaffee"
export function glossarySeoTitle(term: GlossaryTerm): string {
  return (
    term.seoTitle ??
    `${term.term} erklärt – Bedeutung und Anwendung beim Kaffee`
  )
}

export function glossarySeoDescription(term: GlossaryTerm): string {
  return term.seoDescription ?? term.shortDef
}

// Title-Attribut für automatische interne Links.
export function glossaryLinkTitle(term: GlossaryTerm): string {
  return `${term.term} erklärt – Bedeutung und Anwendung beim Kaffee`
}

export type GlossaryLinkEntry = {
  // Anzuzeigender/erkennbarer Treffer (Begriff oder Synonym)
  phrase: string
  slug: string
  term: string
  shortDef: string
  title: string
}

// Verlinkungs-Index: alle Begriffe + Synonyme, nach Phrasenlänge absteigend
// sortiert, damit längere (mehrwortige) Treffer Vorrang vor kürzeren haben.
let linkIndex: GlossaryLinkEntry[] | null = null

export function getGlossaryLinkIndex(): GlossaryLinkEntry[] {
  if (linkIndex) return linkIndex
  const entries: GlossaryLinkEntry[] = []
  for (const term of glossary) {
    const phrases = [term.term, ...(term.synonyms ?? [])]
    for (const phrase of phrases) {
      entries.push({
        phrase,
        slug: term.slug,
        term: term.term,
        shortDef: term.shortDef,
        title: glossaryLinkTitle(term),
      })
    }
  }
  entries.sort((a, b) => b.phrase.length - a.phrase.length)
  linkIndex = entries
  return entries
}
