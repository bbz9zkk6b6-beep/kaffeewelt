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
    relatedRecipes: ['pour-over-filterkaffee'],
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
    relatedRecipes: ['espresso'],
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
    relatedRecipes: ['espresso', 'cappuccino'],
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
    relatedRecipes: ['espresso', 'cappuccino', 'latte-macchiato'],
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
    relatedRecipes: ['espresso', 'pour-over-filterkaffee'],
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
    relatedRecipes: ['cold-brew', 'iced-coffee'],
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
    relatedRecipes: ['pour-over-filterkaffee'],
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
  {
    slug: 'affogato',
    term: 'Affogato',
    shortDef:
      'Italienisches Dessert: eine Kugel Vanilleeis, die mit einem heißen Espresso übergossen wird.',
    category: 'zubereitung',
    synonyms: ['Affogato al caffè'],
    related: ['espresso', 'extraktion'],
    relatedRecipes: ['espresso'],
    faq: [
      {
        question: 'Welches Eis eignet sich für Affogato?',
        answer:
          'Klassisch ist Vanilleeis oder Fior di Latte, also ein möglichst neutrales, cremiges Eis. Nussige Varianten wie Haselnuss passen ebenfalls gut.',
      },
      {
        question: 'Ist Affogato ein Dessert oder ein Kaffeegetränk?',
        answer:
          'Beides. In Italien wird es nach dem Essen serviert – die Grenze zwischen Dessert und Kaffee verschwimmt hier bewusst.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Affogato heißt auf Italienisch „ertränkt". Gemeint ist Vanilleeis, das mit einem frisch gezogenen, heißen Espresso übergossen wird. Das Eis schmilzt an den Rändern, der Espresso kühlt leicht ab – heraus kommt ein Getränk, das gleichzeitig kalt, heiß, süß und bitter ist.',
      },
      {
        type: 'heading',
        id: 'zubereitung',
        text: 'Zubereitung',
      },
      {
        type: 'paragraph',
        text: 'Die Zubereitung ist simpel: eine Kugel gutes Eis in ein Glas oder eine kleine Schale geben, einen frischen Espresso (25–35 ml) direkt darüber gießen und sofort servieren. Warten lohnt sich nicht – das Eis schmilzt schnell.',
      },
      {
        type: 'list',
        items: [
          'Eis: 1 Kugel Vanille oder Fior di Latte',
          'Espresso: 1 Shot, frisch und heiß',
          'Optional: Amaretto oder Kahlúa',
          'Servieren: sofort, ohne Aufschub',
        ],
      },
    ],
  },
  {
    slug: 'agitation',
    term: 'Agitation',
    shortDef:
      'Bewegung des Kaffeemehls oder des Brühwassers während der Extraktion, um die Gleichmäßigkeit zu verbessern.',
    category: 'zubereitung',
    related: ['extraktion', 'blooming', 'immersion'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    faq: [
      {
        question: 'Warum ist Agitation beim Pour Over wichtig?',
        answer:
          'Ohne Bewegung bilden sich Kanäle im Kaffeebett, durch die Wasser bevorzugt fließt. Das führt zu ungleichmäßiger Extraktion – manche Partikel werden über-, andere unterextrahiert.',
      },
      {
        question: 'Wie viel Agitation ist sinnvoll?',
        answer:
          'Weniger als gedacht. Ein gezieltes Schwenken des Brewers nach dem Bloom reicht oft aus. Zu viel Rühren erhöht die Bitterkeit.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Agitation bezeichnet jede Form von Bewegung, die beim Brühen auf das Kaffeemehl oder das Brühwasser einwirkt. Das kann ein Rühren mit einem Löffel sein, ein Schwenken des Brewers oder ein gezieltes Eingießen des Wassers in kreisenden Bewegungen.',
      },
      {
        type: 'heading',
        id: 'wirkung',
        text: 'Wirkung auf die Extraktion',
      },
      {
        type: 'paragraph',
        text: 'Mehr Agitation bedeutet mehr Kontaktfläche zwischen Wasser und Kaffeemehl – und damit in der Regel eine stärkere, schnellere Extraktion. Bei der French Press kann ein kurzes Rühren nach dem Aufguss die Gleichmäßigkeit verbessern. Beim Pour Over genügt oft ein sanftes Schwenken nach dem Bloom.',
      },
    ],
  },
  {
    slug: 'altitude-masl',
    term: 'Altitude (MASL)',
    shortDef:
      'Anbau­höhe in Metern über dem Meeresspiegel – je höher, desto langsamer reift die Kirsche und desto komplexer das Aroma.',
    category: 'bohne',
    synonyms: ['MASL', 'Meters Above Sea Level', 'Anbauhöhe'],
    related: ['arabica', 'terroir', 'single-origin'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Ab welcher Höhe gilt Kaffee als Hochland-Kaffee?',
        answer:
          'Gebräuchlich ist die Klassifikation SHB (Strictly Hard Bean) ab 1.200 Metern. Darunter spricht man von HB (Hard Bean) ab etwa 900 Metern.',
      },
      {
        question: 'Warum schmeckt Hochland-Kaffee oft besser?',
        answer:
          'In großer Höhe sind die Temperaturen kühler, die Kirschen reifen langsamer. Das gibt ihnen Zeit, mehr Zucker und Aromastoffe zu bilden – ein dichteres, komplexeres Geschmacksbild ist die Folge.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'MASL steht für „Meters Above Sea Level" – also die Anbauhöhe in Metern über dem Meeresspiegel. Bei Kaffeebauern und Röstern gilt die Höhe als einer der wichtigsten Qualitätsindikatoren. Arabica gedeiht zwischen 600 und 2.200 Metern, die besten Lots stammen oft von 1.500 Metern aufwärts.',
      },
      {
        type: 'heading',
        id: 'hoehenklassen',
        text: 'Höhenklassen und ihre Bedeutung',
      },
      {
        type: 'list',
        items: [
          'Unter 600 m: kaum Arabica, meist Robusta',
          '600–900 m: weichere Bohne, mild',
          '900–1.200 m: Hard Bean (HB)',
          'Ab 1.200 m: Strictly Hard Bean (SHB), dichte Bohne, komplex',
          'Ab 1.800 m: Specialty-Bereich, intensive Fruchtigkeit',
        ],
      },
      {
        type: 'paragraph',
        text: 'Die Dichte der Bohne steigt mit der Höhe. Dichtere Bohnen brauchen beim Rösten mehr Energie und Aufmerksamkeit – liefern dafür aber ein reichhaltigeres Aromaprofil.',
      },
    ],
  },
  {
    slug: 'anaerobe-fermentation',
    term: 'Anaerobe Fermentation',
    shortDef:
      'Aufbereitungsmethode, bei der Kaffeekirschen unter Sauerstoffausschluss fermentieren – erzeugt intensive, ungewöhnliche Aromen.',
    category: 'bohne',
    synonyms: ['Anaerobic Fermentation', 'Anaerobic Process'],
    related: ['honey-process', 'single-origin', 'terroir'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Wie unterscheidet sich anaerobe Fermentation von der klassischen Nassaufbereitung?',
        answer:
          'Bei der klassischen Nassaufbereitung fermentieren die Bohnen offen, mit Luftkontakt. Anaerob heißt: die Kirschen werden in versiegelten Tanks eingeschlossen, der entstehende CO₂-Druck verdrängt den Sauerstoff.',
      },
      {
        question: 'Warum schmecken anaerob fermentierte Kaffees so intensiv?',
        answer:
          'Ohne Sauerstoff arbeiten andere Bakterien als üblich. Sie produzieren Milchsäure und ungewöhnliche Esterverbindungen, die tropische Frucht- und Weinnoten erzeugen.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Die anaerobe Fermentation ist eine relativ junge Aufbereitungsmethode im Specialty-Coffee-Bereich. Ganze Kaffeekirschen oder entpulpte Bohnen werden in luftdicht versiegelte Tanks gefüllt. Das entstehende CO₂ aus der Fermentation verdrängt den Restsauerstoff – ein anaerobes Milieu entsteht.',
      },
      {
        type: 'heading',
        id: 'aromen',
        text: 'Typische Aromen',
      },
      {
        type: 'paragraph',
        text: 'Das Ergebnis ist polarisierend. Befürworter schwärmen von Passionsfrucht, Ananas und Wein. Kritiker sehen die Methode als zu konstruiert. Sicher ist: anaerob fermentierte Kaffees weichen stark vom klassischen Profil ab und sind nichts für Puristen.',
      },
      {
        type: 'list',
        items: [
          'Typische Aromen: Passionsfrucht, Kirsche, Wein, Rum',
          'Säure: oft niedrig bis mittel',
          'Süße: ausgeprägt',
          'Körper: voll',
        ],
      },
    ],
  },
  {
    slug: 'aroma',
    term: 'Aroma',
    shortDef:
      'Die Gesamtheit der flüchtigen Duft- und Geschmacksstoffe im Kaffee – von fruchtig über nussig bis schokoladig.',
    category: 'geschmack',
    synonyms: ['Duft', 'Kaffeearoma', 'Aromastoffe'],
    related: ['extraktion', 'terroir', 'flavor-wheel'],
    relatedArticles: ['roestgrade-verstehen'],
    faq: [
      {
        question: 'Wie viele Aromastoffe enthält Kaffee?',
        answer:
          'Über 1.000 flüchtige Verbindungen sind bisher identifiziert. Zum Vergleich: Wein hat etwa 400. Nicht alle tragen positiv zum Geschmack bei.',
      },
      {
        question: 'Warum verändert sich das Aroma nach dem Mahlen so schnell?',
        answer:
          'Die flüchtigen Verbindungen entweichen nach dem Mahlen binnen Minuten. Ganze Bohnen sind deutlich länger aromatisch als Mahlkaffee.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Das Aroma ist für viele Kaffeetrinker der eigentliche Kern des Genusses – noch vor dem Geschmack auf der Zunge. Rund 80 % dessen, was wir als „Geschmack" wahrnehmen, ist in Wirklichkeit Geruch: retronasal wahrgenommene flüchtige Verbindungen, die beim Trinken in die Nase aufsteigen.',
      },
      {
        type: 'heading',
        id: 'entstehung',
        text: 'Entstehung im Röstprozess',
      },
      {
        type: 'paragraph',
        text: 'Die meisten Aromastoffe entstehen erst beim Rösten – durch die Maillard-Reaktion und die Karamelisierung. Die Rohbohne selbst riecht kaum nach Kaffee. Temperatur, Röstdauer und Röstgrad bestimmen, welche Aromastoffe entstehen und welche verloren gehen.',
      },
    ],
  },
  {
    slug: 'astringency',
    term: 'Astringenz',
    shortDef:
      'Ein pelziges, zusammenziehendes Mundgefühl im Kaffee, verursacht durch Tannine und Polyphenole.',
    category: 'geschmack',
    synonyms: ['Astringency', 'adstringierend', 'zusammenziehend'],
    related: ['bitterness', 'extraktion', 'mouthfeel'],
    faq: [
      {
        question: 'Ist Astringenz dasselbe wie Bitterkeit?',
        answer:
          'Nein. Bitterkeit ist ein Geschmack, Astringenz ein Mundgefühl. Tannine binden an Proteine im Speichel und erzeugen dieses trockene, pelzige Gefühl – unabhängig vom Geschmack.',
      },
      {
        question: 'Wie reduziert man Astringenz im Kaffee?',
        answer:
          'Überextraktion und zu hohe Wassertemperaturen begünstigen Astringenz. Ein korrekt eingestellter Mahlgrad, saubere Geräte und frische Bohnen helfen.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Astringenz ist kein Geschmack, sondern ein taktiles Empfinden. Tannine und Polyphenole aus dem Kaffeemehl binden im Mund an Proteine des Speichels. Das Ergebnis: ein pelziges, trockenes, manchmal kratzendes Gefühl auf Zunge und Zahnfleisch.',
      },
      {
        type: 'heading',
        id: 'ursachen',
        text: 'Ursachen und Abhilfe',
      },
      {
        type: 'paragraph',
        text: 'Astringenz tritt vor allem bei Überextraktion auf – zu fein gemahlen, zu heiß aufgegossen oder zu lange gezogen. Auch schmutzige Geräte, altes Kaffeemehl und bestimmte Bohnenqualitäten können Astringenz verstärken.',
      },
    ],
  },
  {
    slug: 'bitterness',
    term: 'Bitterkeit',
    shortDef:
      'Einer der fünf Grundgeschmäcker im Kaffee – in Maßen erwünscht, bei Überextraktion dominant und unangenehm.',
    category: 'geschmack',
    synonyms: ['Bitterness', 'Bitterstoffe', 'bitter'],
    related: ['extraktion', 'astringency', 'sweetness', 'roestgrade-verstehen'],
    relatedArticles: ['roestgrade-verstehen', 'koffein-dunkle-roestung'],
    faq: [
      {
        question: 'Was macht Kaffee bitter?',
        answer:
          'Hauptursachen sind Koffein, Chlorogensäure-Abbauprodukte und verbrannte Röststoffe. Überextraktion und dunkle Röstung verstärken die Bitterkeit.',
      },
      {
        question: 'Kann man die Bitterkeit beim Brühen reduzieren?',
        answer:
          'Ja: gröberer Mahlgrad, niedrigere Wassertemperatur (88–90 °C statt 94 °C) und kürzere Brühzeit vermindern Bitterkeit messbar.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Bitterkeit ist ein natürlicher Teil des Kaffeeprofils und gehört dazu. Ein leichter Bitterton im Abgang ist bei einem gut zubereiteten Espresso normal und erwünscht. Problematisch wird es, wenn die Bitterkeit das Profil dominiert und anhaltend unangenehm ist.',
      },
      {
        type: 'heading',
        id: 'ursachen',
        text: 'Ursachen der Bitterkeit',
      },
      {
        type: 'list',
        items: [
          'Überextraktion: zu fein gemahlen oder zu lang gezogen',
          'Dunkle Röstung: mehr verbrannte Aromastoffe',
          'Zu heißes Wasser: über 96 °C extrahiert aggressiv',
          'Altes Kaffeemehl: Oxidation verstärkt Bitterstoffe',
          'Schmutzige Geräte: Kaffeefett ranzt und gibt Bitterkeit ab',
        ],
      },
      {
        type: 'paragraph',
        text: 'Der häufigste Fehler ist ein zu feiner Mahlgrad kombiniert mit zu heißem Wasser. Beides zusammen extrahiert die Bitterstoffe überproportional stark.',
      },
    ],
  },
  {
    slug: 'bourbon',
    term: 'Bourbon',
    shortDef:
      'Klassische Arabica-Varietät mit süßem, ausgewogenem Profil – benannt nach der Insel Réunion, früher Île Bourbon.',
    category: 'bohne',
    synonyms: ['Bourbon-Varietät', 'Red Bourbon', 'Yellow Bourbon', 'Pink Bourbon'],
    related: ['arabica', 'geisha', 'terroir', 'single-origin'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Was unterscheidet Bourbon von Typica?',
        answer:
          'Bourbon und Typica sind die zwei Urvarietäten des Arabica. Bourbon gilt als süßer und ertragreicher, Typica als delikater und weniger robust.',
      },
      {
        question: 'Was bedeutet Pink Bourbon?',
        answer:
          'Pink Bourbon ist eine seltene Mutation mit rosafarbenen Kirschen. Sie tritt vor allem in Kolumbien auf und erzeugt ein besonders florales, fruchtiges Profil.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Bourbon ist eine der ältesten und bedeutendsten Arabica-Varietäten. Sie entwickelte sich auf der Insel Réunion (ehemals Île Bourbon) aus der dort angebauten Typica-Linie. Heute wird Bourbon vor allem in Lateinamerika und Ostafrika angebaut.',
      },
      {
        type: 'heading',
        id: 'profile',
        text: 'Geschmacksprofil',
      },
      {
        type: 'paragraph',
        text: 'Bourbon zeigt typischerweise eine ausgeprägte Süße, roten Apfel, Karamell und eine mittlere Säure. Red Bourbon ist am verbreitetsten. Yellow Bourbon reift etwas früher und gilt als noch süßer. Pink Bourbon aus Kolumbien ist besonders selten und begehrt.',
      },
    ],
  },
  {
    slug: 'brew-ratio',
    term: 'Brew Ratio',
    shortDef:
      'Das Verhältnis von Kaffeemehl zu Wasser – die wichtigste Stellschraube für Stärke und Balance einer Tasse.',
    category: 'zubereitung',
    synonyms: ['Brühverhältnis', 'Kaffee-Wasser-Verhältnis'],
    related: ['extraktion', 'tds', 'extraktionsausbeute'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    faq: [
      {
        question: 'Was ist das beste Brew Ratio für Filterkaffee?',
        answer:
          'Üblich ist 1:15 bis 1:17 (1 g Kaffee auf 15–17 g Wasser). Ein guter Ausgangspunkt ist 1:16.',
      },
      {
        question: 'Wie berechne ich das Brew Ratio?',
        answer:
          'Kaffeemenge in Gramm geteilt durch Wassermenge in Gramm. 15 g Kaffee auf 250 g Wasser ergibt 1:16,7.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Das Brew Ratio ist die Grundlage jeder reproduzierbaren Kaffeezubereitung. Es beschreibt, wie viel Gramm Kaffee auf wie viel Gramm Wasser kommen. Wer nach Gefühl brüht, bekommt jedes Mal ein anderes Ergebnis. Wer das Ratio kennt und eine Waage benutzt, kann eine gelungene Tasse exakt wiederholen.',
      },
      {
        type: 'heading',
        id: 'richtwerte',
        text: 'Richtwerte je Zubereitungsmethode',
      },
      {
        type: 'list',
        items: [
          'Filterkaffee / Pour Over: 1:15 bis 1:17',
          'Espresso: 1:2 bis 1:2,5 (z. B. 18 g auf 36–45 g)',
          'French Press: 1:13 bis 1:15',
          'Cold Brew Konzentrat: 1:5 bis 1:8',
          'AeroPress: 1:10 bis 1:16',
        ],
      },
      {
        type: 'paragraph',
        text: 'Diese Werte sind Startpunkte, keine Dogmen. Wer einen helleren Röstgrad trinkt, brüht oft mit mehr Kaffee. Wer dunkel trinkt, mit weniger.',
      },
    ],
  },
  {
    slug: 'cafe-au-lait',
    term: 'Café au Lait',
    shortDef:
      'Französischer Klassiker aus gleichteilen Filterkaffee und erhitzter Milch – weniger Druck als Cappuccino, mehr Volumen.',
    category: 'zubereitung',
    synonyms: ['Café au lait', 'Milchkaffee'],
    related: ['flat-white', 'macchiato', 'espresso'],
    relatedRecipes: ['latte-macchiato'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Café au Lait und Latte Macchiato?',
        answer:
          'Café au Lait basiert auf Filterkaffee, Latte Macchiato auf Espresso. Außerdem wird beim Café au Lait die Milch nur erhitzt, nicht aufgeschäumt.',
      },
      {
        question: 'Kann man Café au Lait auch mit Espresso zubereiten?',
        answer:
          'Das geht, ist aber dann eher ein Flat White oder ein Café Latte. Die Bezeichnung Café au Lait meint traditionell Filterkaffee als Basis.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Café au Lait gehört zum französischen Frühstückstisch wie das Croissant. Es besteht aus frisch gebrühtem Filterkaffee und heißer Milch im Verhältnis 1:1. Kein Druck, kein Schaum – einfach Kaffee und Milch.',
      },
      {
        type: 'heading',
        id: 'zubereitung',
        text: 'Zubereitung',
      },
      {
        type: 'paragraph',
        text: 'Filterkaffee etwas stärker brühen als gewöhnlich, da die Milch verdünnt. Milch auf etwa 65–70 °C erhitzen, nicht aufschäumen. Beide Flüssigkeiten gleichzeitig in die große Tasse oder Schüssel gießen.',
      },
    ],
  },
  {
    slug: 'cortado',
    term: 'Cortado',
    shortDef:
      'Spanisches Espressogetränk: ein Shot Espresso, mit gleich viel warmer Milch geschnitten – reduziert die Säure, behält den Charakter.',
    category: 'zubereitung',
    synonyms: ['Gibraltar'],
    related: ['espresso', 'flat-white', 'macchiato'],
    relatedRecipes: ['espresso'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Cortado und Macchiato?',
        answer:
          'Ein Macchiato hat nur einen Spritzer Milch (oder Milchschaum), ein Cortado hat gleich viel Milch wie Espresso. Der Cortado ist milder, aber weniger stark verdünnt als ein Flat White.',
      },
      {
        question: 'Woher kommt der Begriff Gibraltar?',
        answer:
          'Gibraltar ist ein US-amerikanischer Begriff für dasselbe Getränk, benannt nach dem Glastyp (Gibraltar-Glas), der in der Drip-Coffee-Szene San Franciscos verwendet wurde.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Cortado kommt vom spanischen Verb „cortar" – schneiden. Die Milch schneidet buchstäblich die Intensität des Espressos, macht die Säure weicher und die Textur cremiger, ohne den Kaffeecharakter zu verlieren.',
      },
      {
        type: 'heading',
        id: 'ratio-und-groesse',
        text: 'Ratio und Größe',
      },
      {
        type: 'paragraph',
        text: 'Klassisch ist das Verhältnis 1:1 – ein Shot Espresso (25–30 ml), die gleiche Menge warme, leicht texturierte Milch. Das Getränk kommt ohne Schaum aus, höchstens eine dünne Schicht liegt oben. Serviert wird es im kleinen Glas.',
      },
    ],
  },
  {
    slug: 'cup-of-excellence',
    term: 'Cup of Excellence',
    shortDef:
      'Das renommierteste Wettbewerbsformat für Spitzenkaffees – ausgezeichnete Lots werden international versteigert.',
    category: 'zubereitung',
    synonyms: ['CoE', 'Cup of Excellence Auktion'],
    related: ['q-grader', 'single-origin', 'micro-lot'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Wie funktioniert Cup of Excellence?',
        answer:
          'Kaffeebauern reichen ihre besten Lots ein. Nationale Jurys und internationale Cupper verkosten blind. Lots, die einen Score von 87 oder höher erreichen, werden online versteigert.',
      },
      {
        question: 'Welche Länder nehmen teil?',
        answer:
          'Brasilien, Guatemala, Kolumbien, Honduras, Burundi, Ruanda und weitere Ursprungsländer. Das Programm wird von der Alliance for Coffee Excellence (ACE) organisiert.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Cup of Excellence ist der Oscar des Kaffees. Seit 1999 zeichnet das Programm jährlich die besten Lots aus den teilnehmenden Anbauländern aus. Die Bewertung erfolgt durch internationale Cupper in mehreren blinden Verkostungsrunden.',
      },
      {
        type: 'heading',
        id: 'bedeutung',
        text: 'Bedeutung für Bauern und Röster',
      },
      {
        type: 'paragraph',
        text: 'Ein CoE-Lot erzielt bei der Auktion ein Vielfaches des normalen Marktpreises. Für Bauern ist der Titel ein echter Durchbruch. Für Röster ist der Zugang zu CoE-Kaffees ein Qualitätssignal gegenüber ihren Kunden.',
      },
    ],
  },
  {
    slug: 'dalgona',
    term: 'Dalgona Coffee',
    shortDef:
      'Viralgetränk aus aufgeschlagenem Instant-Kaffee, Zucker und Wasser, das auf kalter Milch serviert wird.',
    category: 'zubereitung',
    synonyms: ['Dalgona', 'Whipped Coffee'],
    related: ['cold-brew', 'nitro-cold-brew'],
    relatedRecipes: ['iced-coffee'],
    faq: [
      {
        question: 'Warum funktioniert Dalgona nur mit Instant-Kaffee?',
        answer:
          'Instant-Kaffee enthält lösliche Dextrine, die beim Aufschlagen Luft binden und eine stabile Creme bilden. Frisch gemahlener Kaffee lässt sich so nicht aufschlagen.',
      },
      {
        question: 'Kann man Dalgona auch heiß trinken?',
        answer:
          'Ja. Die Kaffeecreme auf heiße Milch geben und sanft umrühren – oder den Schaum kurz auf der Oberfläche belassen und dann unterheben.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: '2020 wurde Dalgona Coffee zum viralen Lockdown-Phänomen. Das Prinzip ist simpel: gleiche Teile Instant-Kaffee, Zucker und heißes Wasser werden mehrere Minuten steif geschlagen, bis eine cremige, braune Masse entsteht. Diese wird löffelweise auf kalt Milch mit Eis gesetzt.',
      },
      {
        type: 'heading',
        id: 'rezept',
        text: 'Das Grundrezept',
      },
      {
        type: 'list',
        items: [
          '2 EL Instant-Kaffee',
          '2 EL Zucker (weißer Zucker funktioniert am besten)',
          '2 EL heißes Wasser',
          'Ca. 3–4 Minuten mit dem Handmixer aufschlagen',
          'Auf 200 ml kalte Milch mit Eis setzen',
        ],
      },
    ],
  },
  {
    slug: 'direct-trade',
    term: 'Direct Trade',
    shortDef:
      'Direkter Handelskontakt zwischen Röster und Kaffeebauer ohne zwischengeschaltete Händler – für mehr Transparenz und höhere Preise am Ursprung.',
    category: 'zubereitung',
    synonyms: ['Direkthandel', 'Direct Trade Coffee'],
    related: ['fair-trade', 'single-origin', 'micro-lot'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Direct Trade und Fair Trade?',
        answer:
          'Fair Trade ist ein zertifiziertes System mit Mindestpreisen, Direct Trade ist kein Zertifikat, sondern eine Beziehung. Direct Trade erlaubt oft höhere Preise und mehr Flexibilität, bietet aber keine externe Kontrolle.',
      },
      {
        question: 'Ist Direct Trade besser als Fair Trade?',
        answer:
          'Nicht zwingend. Direct Trade kann echte Vorteile bringen, ist aber unreguliert – wer es beansprucht, muss nicht nachweisen, was tatsächlich bezahlt wurde.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Direct Trade beschreibt eine direkte Geschäftsbeziehung zwischen einem Röster und dem Bauern oder einer Kooperative am Ursprung. Kein Zwischenhändler, keine Exportfirma dazwischen. Der Röster reist an den Ursprung, verkostet vor Ort, verhandelt den Preis direkt.',
      },
      {
        type: 'heading',
        id: 'vorteile',
        text: 'Vorteile und Grenzen',
      },
      {
        type: 'paragraph',
        text: 'Für kleine Specialty-Röster ist Direct Trade oft ein echtes Qualitätswerkzeug: kürzere Lieferkette, mehr Kontrolle über die Aufbereitung, direktes Feedback an den Bauern. Die Kehrseite: ohne externe Zertifizierung kann niemand überprüfen, was tatsächlich gezahlt und vereinbart wurde.',
      },
    ],
  },
  {
    slug: 'extraktionsausbeute',
    term: 'Extraktionsausbeute (EY)',
    shortDef:
      'Der prozentuale Anteil der aus dem Kaffeemehl gelösten Stoffe – das Maß für eine ausgewogene oder fehlerhafte Extraktion.',
    category: 'geschmack',
    synonyms: ['Extraction Yield', 'EY', 'Extraktionsrate'],
    related: ['extraktion', 'tds', 'brew-ratio'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    faq: [
      {
        question: 'Was ist die ideale Extraktionsausbeute?',
        answer:
          'Die SCA (Specialty Coffee Association) definiert 18–22 % als optimalen Bereich. Unter 18 % gilt als unterextrahiert, über 22 % als überextrahiert.',
      },
      {
        question: 'Wie messe ich die Extraktionsausbeute?',
        answer:
          'Indirekt über TDS und Brew Ratio mit der Formel: EY (%) = TDS (%) × Wassermenge (g) / Kaffeemenge (g). Dafür braucht man ein Refraktometer.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Die Extraktionsausbeute gibt an, wie viel Prozent der löslichen Substanzen aus dem Kaffeemehl tatsächlich ins Brühwasser übergegangen sind. Kaffeemehl enthält rund 28–30 % lösliche Stoffe, aber nicht alle davon schmecken gut.',
      },
      {
        type: 'heading',
        id: 'zielbereich',
        text: 'Zielbereich und Messung',
      },
      {
        type: 'paragraph',
        text: 'Zwischen 18 und 22 % liegt der Süßpunkt, in dem Süße, Säure und Körper im Gleichgewicht stehen. Darunter schmeckt die Tasse sauer und dünn, darüber bitter und hohl. Die Messung erfolgt mit einem Refraktometer, das den TDS-Wert im Kaffee bestimmt.',
      },
    ],
  },
  {
    slug: 'fair-trade',
    term: 'Fair Trade',
    shortDef:
      'Zertifiziertes Handelssystem mit garantierten Mindestpreisen und sozialen Standards für Kaffeebauern.',
    category: 'zubereitung',
    synonyms: ['Fairtrade', 'Fair-Trade-Kaffee'],
    related: ['direct-trade', 'single-origin'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Was garantiert das Fair-Trade-Siegel?',
        answer:
          'Einen Mindestpreis über dem Marktpreis, eine Prämie für Gemeinschaftsprojekte (Schulen, Brunnen), demokratische Strukturen in den Kooperativen und das Verbot von Kinderarbeit.',
      },
      {
        question: 'Kauft Fair Trade automatisch bessere Qualität?',
        answer:
          'Nicht zwingend. Das Siegel sichert soziale Standards, sagt aber wenig über die Röstqualität oder die Qualität der Bohne aus. Specialty-Kaffee und Fair Trade schließen sich nicht aus.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Fair Trade ist ein seit den 1980er Jahren etabliertes Zertifizierungssystem, das Kaffeebauern vor den Preisschwankungen des Weltmarkts schützen soll. Wichtigste Organisation ist Fairtrade International. Käufer zahlen einen festgelegten Mindestpreis – selbst wenn der Marktpreis darunter fällt.',
      },
      {
        type: 'heading',
        id: 'kritik',
        text: 'Stärken und Kritik',
      },
      {
        type: 'paragraph',
        text: 'Fair Trade hat den Lebensunterhalt vieler Kleinbauern stabilisiert. Kritiker bemängeln, dass die Aufschläge nicht immer vollständig bei den Bauern ankommen und dass die Zertifizierung aufwändige Bürokratie mit sich bringt, die kleine Betriebe überfordert.',
      },
    ],
  },
  {
    slug: 'first-crack',
    term: 'First Crack',
    shortDef:
      'Das erste hörbare Knacken während der Röstung, bei dem Feuchtigkeit und CO₂ die Bohne dehnen – Beginn der Entwicklungsphase.',
    category: 'roesten',
    synonyms: ['Erster Crack', 'Erster Knack'],
    related: ['second-crack', 'maillard-reaktion', 'ror'],
    relatedArticles: ['roestgrade-verstehen', 'roestung-espresso'],
    faq: [
      {
        question: 'Bei welcher Temperatur tritt First Crack auf?',
        answer:
          'Typischerweise zwischen 195 und 205 °C Bohnentemperatur, je nach Röstprofil und Gerät.',
      },
      {
        question: 'Was passiert in der Bohne beim First Crack?',
        answer:
          'Restfeuchte verdampft explosionsartig, CO₂ dehnt die Zellstruktur. Die Bohne vergrößert sich sichtbar, die Zellwände brechen auf.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der First Crack ist der wichtigste Orientierungspunkt jeder Röstung. Er klingt wie das Poppen von Popcorn. In der Bohne baut sich Dampfdruck auf, bis die Zellwände nachgeben. Röster hören genau hin – denn ab hier beginnt die sogenannte Entwicklungsphase.',
      },
      {
        type: 'heading',
        id: 'entwicklungsphase',
        text: 'Entwicklungsphase nach dem Crack',
      },
      {
        type: 'paragraph',
        text: 'Die Zeit zwischen First Crack und dem Ende der Röstung heißt Development Time. Sie beträgt typischerweise 20–25 % der Gesamtröstzeit. Zu kurz: die Bohne ist unterentwickelt und schmeckt grasig. Zu lang: die Bohne wird flach und verliert Fruchtigkeit.',
      },
    ],
  },
  {
    slug: 'flat-white',
    term: 'Flat White',
    shortDef:
      'Australisch-neuseeländisches Espressogetränk: doppelter Ristretto mit wenig, seidig texturierter Milch ohne dicken Schaum.',
    category: 'zubereitung',
    synonyms: ['Flat White Coffee'],
    related: ['espresso', 'cortado', 'macchiato', 'cafe-au-lait'],
    relatedRecipes: ['espresso', 'cappuccino'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Flat White und Cappuccino?',
        answer:
          'Der Cappuccino hat deutlich mehr Milchschaum, klassisch in drei Schichten. Der Flat White hat eine dünne Schicht Mikroschaum und wird kleiner serviert – das Kaffee-Milch-Verhältnis ist ausgewogener.',
      },
      {
        question: 'Welche Espresso-Basis verwendet man für Flat White?',
        answer:
          'Meistens ein doppelter Ristretto (20–25 ml), der kürzer läuft als ein normaler Espresso. Das gibt dem Flat White mehr Intensität trotz der Milch.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Flat White stammt aus der australischen und neuseeländischen Café-Kultur der 1980er Jahre. Er ist kleiner als ein Latte, hat aber mehr Espresso-Anteil. Die Milch wird auf etwa 60 °C aufgedampft und soll eine seidige, fast flüssige Textur haben – kaum Schaum, aber viel Cremigkeit.',
      },
      {
        type: 'heading',
        id: 'unterschied',
        text: 'Was ihn von anderen trennt',
      },
      {
        type: 'list',
        items: [
          'Basis: doppelter Ristretto (ca. 20–25 ml)',
          'Milch: 100–130 ml, seidig texturiert',
          'Schaum: minimal, unter 1 cm',
          'Gesamtvolumen: 150–160 ml',
          'Kaffee-Milch-Verhältnis: stärker als Cappuccino',
        ],
      },
    ],
  },
  {
    slug: 'flavor-wheel',
    term: 'Flavor Wheel',
    shortDef:
      'Visuelles Referenzwerkzeug der SCA mit über 100 Kaffee-Aromen in konzentrischen Kreisen – Standard beim professionellen Cupping.',
    category: 'geschmack',
    synonyms: ['Coffee Flavor Wheel', 'Aromerad', 'SCA Flavor Wheel'],
    related: ['aroma', 'sweetness', 'bitterness', 'q-grader'],
    faq: [
      {
        question: 'Wer hat das Flavor Wheel entwickelt?',
        answer:
          'Das aktuelle Wheel wurde 2016 von der Specialty Coffee Association (SCA) gemeinsam mit dem World Coffee Research überarbeitet und veröffentlicht.',
      },
      {
        question: 'Wie benutzt man das Flavor Wheel beim Cupping?',
        answer:
          'Von innen nach außen arbeiten: zuerst die Hauptkategorie identifizieren (z. B. fruchtig), dann die Unterkategorie (z. B. Beere), dann den konkreten Begriff (z. B. Brombeere).',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Das Coffee Flavor Wheel der SCA ist das Standardwerkzeug für die Beschreibung von Kaffee-Aromen. Es sortiert über 100 Geschmackseindrücke in konzentrischen Kreisen. Im Zentrum stehen grobe Kategorien – fruchtig, süß, blumig, nussig, würzig – nach außen hin werden sie immer spezifischer.',
      },
      {
        type: 'heading',
        id: 'verwendung',
        text: 'Verwendung beim Cupping',
      },
      {
        type: 'paragraph',
        text: 'Beim professionellen Cupping hilft das Wheel, Aromen präzise zu benennen. Die Grundkategorien sind leicht zugänglich, die äußeren Ringe verlangen Übung und Erfahrung. Für Einsteiger ist es ein nützliches Lernwerkzeug – um zu verstehen, dass Kaffee weit mehr als „stark" oder „mild" ist.',
      },
    ],
  },
  {
    slug: 'geisha',
    term: 'Geisha/Gesha',
    shortDef:
      'Seltene, hochpreisige Arabica-Varietät aus Äthiopien – bekannt für ein ungewöhnlich florales und teeartiges Profil.',
    category: 'bohne',
    synonyms: ['Gesha', 'Geisha-Varietät', 'Panama Geisha'],
    related: ['arabica', 'bourbon', 'single-origin', 'micro-lot'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Warum ist Panama Geisha so teuer?',
        answer:
          'Panama Geisha von der Hacienda La Esmeralda erzielte 2004 Rekordpreise bei Auktionen. Seitdem ist die Varietät Symbol für Spitzenqualität. Kombiniert mit gutem Terroir und Aufbereitung entstehen Kaffees, für die Sammler Höchstpreise zahlen.',
      },
      {
        question: 'Kommt Geisha wirklich aus Japan?',
        answer:
          'Nein. Der Name leitet sich von Gesha ab, einer Region in Äthiopien, wo die Varietät wild vorkommt. Über Costa Rica gelangte sie nach Panama.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Geisha ist die Varietät, die den Specialty-Coffee-Markt verändert hat. Ursprünglich aus der Region Gesha in Südäthiopien, wurde sie in den 1950er Jahren über Costa Rica nach Panama gebracht. Auf der Hacienda La Esmeralda in den Boquete-Highlands erlangte sie weltweiten Ruhm.',
      },
      {
        type: 'heading',
        id: 'geschmack',
        text: 'Geschmacksprofil',
      },
      {
        type: 'paragraph',
        text: 'Geisha schmeckt anders als fast jeder andere Kaffee. Jasmin, Bergamotte, Pfirsich und Tee – das Profil wirkt manchmal eher wie ein Darjeeling als wie Kaffee. Wer es zum ersten Mal trinkt, ist oft überrascht. Geisha verlangt eine präzise, helle Röstung, um ihre Aromen zu bewahren.',
      },
    ],
  },
  {
    slug: 'gooseneck-kettle',
    term: 'Gooseneck Kettle',
    shortDef:
      'Wasserkocher mit langem, dünnem Schwanenhals-Ausguss – ermöglicht präzises, langsames Eingießen beim Pour Over.',
    category: 'ausstattung',
    synonyms: ['Schwanenhalskessel', 'Schwanenhals-Wasserkocher'],
    related: ['blooming', 'agitation', 'brew-ratio'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    relatedRecipes: ['pour-over-filterkaffee'],
    faq: [
      {
        question: 'Brauche ich einen Gooseneck-Wasserkocher für Pour Over?',
        answer:
          'Nicht zwingend, aber er hilft deutlich. Mit einem normalen Wasserkocher lässt sich der Wasserstrahl kaum kontrollieren – das führt zu ungleichmäßiger Extraktion.',
      },
      {
        question: 'Welche Temperatur soll das Wasser haben?',
        answer:
          'Für Filterkaffee aus Arabica sind 92–94 °C ideal. Hellere Röstungen vertragen auch etwas heißeres Wasser (94–96 °C), dunklere eher weniger.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Schwanenhals-Ausguss eines Gooseneck Kettles ermöglicht einen dünnen, kontrollierten Wasserstrahl. Beim Pour Over ist das entscheidend: nur mit einer präzisen Eingießtechnik lässt sich die Kaffeeschicht gleichmäßig benetzen und ein Channeling verhindern.',
      },
      {
        type: 'heading',
        id: 'worauf-achten',
        text: 'Worauf beim Kauf achten',
      },
      {
        type: 'list',
        items: [
          'Temperaturregelung: elektronisch einstellbar auf 1 °C',
          'Haltevolumen: 600–1.000 ml für 1–3 Tassen',
          'Ausgusslänge und -winkel: langer, dünner Hals für mehr Kontrolle',
          'Induktionskompatibilität bei Herdmodellen',
          'Edelstahl innen: keine Kunststoffabgaben ins Wasser',
        ],
      },
    ],
  },
  {
    slug: 'honey-process',
    term: 'Honey Process',
    shortDef:
      'Aufbereitungsmethode, bei der die Kaffeebohne mit teilweise anhaftendem Fruchtfleisch getrocknet wird – zwischen Nass- und Trockenaufbereitung.',
    category: 'bohne',
    synonyms: ['Honey-Aufbereitung', 'Pulped Natural', 'Semi-Washed'],
    related: ['anaerobe-fermentation', 'terroir', 'single-origin'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Was sind die verschiedenen Honey-Stufen?',
        answer:
          'Yellow, Red und Black Honey unterscheiden sich im verbleibenden Fruchtfleischanteil. Black Honey hat den höchsten Anteil und trocknet am längsten – das ergibt die intensivste Süße.',
      },
      {
        question: 'Woher kommt der Name Honey Process?',
        answer:
          'Nicht wegen Honig als Zutat. Der Name kommt von der klebrigen, honigartigen Schicht (Mucilage), die auf der Bohne verbleibt und beim Trocknen sichtbar ist.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Beim Honey Process wird die Außenschale der Kaffeekirsche maschinell entfernt, aber die schleimige Mucilage-Schicht bleibt ganz oder teilweise auf der Bohne. So trocknet die Bohne langsam an der Sonne – die Zuckerstoffe des Fruchtfleisches durchdringen die Pergamenthaut.',
      },
      {
        type: 'heading',
        id: 'stufen',
        text: 'Yellow, Red, Black Honey',
      },
      {
        type: 'paragraph',
        text: 'Je mehr Mucilage verbleibt und je länger getrocknet wird, desto intensiver die Süße. Yellow Honey ist am hellsten und trocknungsfreundlichsten. Black Honey braucht bis zu vier Wochen und ergibt einen Kaffee mit ausgeprägter Süße, gutem Körper und wenig Säure.',
      },
    ],
  },
  {
    slug: 'immersion',
    term: 'Immersion',
    shortDef:
      'Brühmethode, bei der Kaffeemehl komplett im Wasser eingetaucht bleibt – gleichmäßigere Extraktion als bei der Perkolation.',
    category: 'zubereitung',
    synonyms: ['Immersionsbrühen', 'Tauchbrühen'],
    related: ['french-press', 'perkolation', 'cold-brew', 'extraktion'],
    faq: [
      {
        question: 'Was sind typische Immersionsbrüher?',
        answer:
          'French Press, AeroPress im Standard-Modus, Clever Dripper und Cold Brew arbeiten nach dem Immersionsprinzip.',
      },
      {
        question: 'Warum schmecken Immersion-Kaffees anders als Pour Over?',
        answer:
          'Beim Immersionsbrühen sättigt sich das Wasser mit gelösten Stoffen und verlangsamt die weitere Extraktion. Das führt zu einem runderen, weniger klaren Profil – mehr Körper, weniger Helligkeit.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Immersion und Perkolation sind die zwei grundlegenden Prinzipien der Kaffeebereitung. Bei der Immersion zieht das Kaffeemehl vollständig in Wasser – wie Tee in einem Teesieb. Das Wasser umgibt jedes Partikel gleichmäßig, die Extraktion läuft stabil ab.',
      },
      {
        type: 'heading',
        id: 'vergleich',
        text: 'Immersion vs. Perkolation',
      },
      {
        type: 'paragraph',
        text: 'Immersionskaffees tendieren zu mehr Körper und weniger Komplexität als perkolierte Kaffees. Der Vorteil: Immersion ist fehlerverzeihender. Mahlgrad und Wassertemperatur haben weniger dramatischen Einfluss als beim Pour Over.',
      },
    ],
  },
  {
    slug: 'macchiato',
    term: 'Macchiato',
    shortDef:
      'Espresso, der mit einem kleinen Klecks Milch oder Milchschaum „gezeichnet" wird – in zwei Varianten: Espresso Macchiato und Latte Macchiato.',
    category: 'zubereitung',
    synonyms: ['Espresso Macchiato', 'Caffè Macchiato'],
    related: ['espresso', 'cortado', 'flat-white'],
    relatedRecipes: ['espresso', 'latte-macchiato'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Espresso Macchiato und Latte Macchiato?',
        answer:
          'Espresso Macchiato ist ein Espresso mit einem Spritzer Milch oder Schaum oben drauf – sehr klein, sehr stark. Latte Macchiato ist umgekehrt aufgebaut: viel Milch, in die ein Shot Espresso eingelassen wird.',
      },
      {
        question: 'Was bedeutet "Macchiato"?',
        answer:
          'Auf Italienisch bedeutet macchiato "gefleckt" oder "markiert". Der Espresso wird also buchstäblich mit Milch gezeichnet.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Begriff Macchiato bezeichnet zwei sehr unterschiedliche Getränke. Der klassische Espresso Macchiato ist ein kurzer Espresso mit einem kleinen Schaumklecks oder einem Teelöffel Milch. Er ist in Italien das, was Deutschen ein „kleiner Brauner" ist.',
      },
      {
        type: 'heading',
        id: 'varianten',
        text: 'Die zwei Varianten',
      },
      {
        type: 'list',
        items: [
          'Espresso Macchiato: Espresso + kleiner Milchschaum-Klecks, ca. 40 ml',
          'Latte Macchiato: Glas mit aufgeschäumter Milch + Espresso-Shot, ca. 250–300 ml',
          'Caramel Macchiato (Starbucks): eigene Kreation, kein klassischer Begriff',
        ],
      },
    ],
  },
  {
    slug: 'maillard-reaktion',
    term: 'Maillard-Reaktion',
    shortDef:
      'Chemische Reaktion zwischen Aminosäuren und Zuckern beim Erhitzen – verantwortlich für Bräunung und Großteil der Kaffeearomen.',
    category: 'roesten',
    synonyms: ['Maillard-Reaktionen', 'Maillard'],
    related: ['first-crack', 'second-crack', 'ror', 'aroma'],
    relatedArticles: ['roestgrade-verstehen', 'roestung-espresso'],
    faq: [
      {
        question: 'Ab welcher Temperatur läuft die Maillard-Reaktion ab?',
        answer:
          'Ab etwa 140–150 °C Oberflächentemperatur beginnt die Reaktion, intensiviert sich zwischen 150 und 200 °C deutlich.',
      },
      {
        question: 'Was ist der Unterschied zwischen Maillard-Reaktion und Karamelisierung?',
        answer:
          'Karamelisierung betrifft nur Zucker. Die Maillard-Reaktion verbindet Zucker mit Aminosäuren und erzeugt eine größere Vielfalt an Aromen – auch herzhafte und röstliche Noten.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Die Maillard-Reaktion ist benannt nach dem französischen Chemiker Louis Camille Maillard, der sie 1912 beschrieb. Sie läuft immer ab, wenn Zucker und Aminosäuren gemeinsam erhitzt werden – beim Brotbacken, beim Fleischbraten und besonders intensiv beim Kaffeerösten.',
      },
      {
        type: 'heading',
        id: 'bedeutung-beim-roesten',
        text: 'Bedeutung beim Rösten',
      },
      {
        type: 'paragraph',
        text: 'Beim Rösten findet die Maillard-Reaktion hauptsächlich zwischen First Crack und dem Ende des Röstprofils statt. Sie erzeugt hunderte von Aromaverbindungen – Karamell, Schokolade, Nuss, Röststoffe. Röster steuern Temperatur und Zeiten, um gezielt bestimmte Maillard-Produkte zu fördern oder zu hemmen.',
      },
    ],
  },
  {
    slug: 'micro-lot',
    term: 'Micro Lot',
    shortDef:
      'Kleine, separat verarbeitete Partie aus einem bestimmten Block oder Bereich einer Farm – für maximale Rückverfolgbarkeit.',
    category: 'bohne',
    synonyms: ['Micro-Lot', 'Nano Lot'],
    related: ['single-origin', 'direct-trade', 'cup-of-excellence'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Wie groß ist ein Micro Lot?',
        answer:
          'Es gibt keine einheitliche Definition. Typisch sind 1–20 Säcke (60 kg), manchmal auch weniger. Nano Lots bezeichnen noch kleinere Partien, teils unter 100 kg.',
      },
      {
        question: 'Warum kostet Micro Lot mehr als normaler Specialty-Kaffee?',
        answer:
          'Kleinere Partien bedeuten mehr Aufwand bei Ernte, Aufbereitung und Logistik. Dazu kommt die Exklusivität – ein Micro Lot ist weltweit nur in sehr begrenzter Menge verfügbar.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Ein Micro Lot stammt aus einem genau definierten, kleinen Abschnitt einer Farm – manchmal nur ein einzelner Block mit besonderen Boden- oder Höhenverhältnissen. Diese Partien werden separat gepflückt, aufbereitet und verkauft. Ziel ist die maximale Transparenz über Herkunft und Charakter.',
      },
      {
        type: 'heading',
        id: 'unterschied-zu-single-origin',
        text: 'Unterschied zu Single Origin',
      },
      {
        type: 'paragraph',
        text: 'Single Origin kann ein ganzes Land oder eine Region sein. Micro Lot geht tiefer: eine Farm, ein Block, ein Erntezeitraum. Je spezifischer die Herkunft, desto klarer das Terroir-Profil – und desto weniger Kompromisse im Geschmacksprofil.',
      },
    ],
  },
  {
    slug: 'mouthfeel',
    term: 'Mouthfeel',
    shortDef:
      'Das taktile Empfinden von Kaffee im Mund – Textur, Viskosität und Körper jenseits von Geschmack und Aroma.',
    category: 'geschmack',
    synonyms: ['Mundgefühl', 'Körper', 'Body'],
    related: ['astringency', 'sweetness', 'extraktion', 'tds'],
    faq: [
      {
        question: 'Was beeinflusst den Mouthfeel von Kaffee?',
        answer:
          'Öle, unlösliche Feststoffe und TDS-Wert prägen die Textur. French Press hat mehr Körper als gefilterter Kaffee, weil das Metallsieb Öle durchlässt.',
      },
      {
        question: 'Was bedeutet "leichter" vs. "schwerer" Körper?',
        answer:
          'Leichter Körper wirkt wie Tee oder Wasser – dünn, klar. Schwerer Körper wirkt wie Vollmilch oder Sahne – viskos, cremig. Beides kann angenehm sein, je nach Kontext.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Mouthfeel ist der Begriff für alles, was Kaffee im Mund fühlen lässt – Textur, Gewicht, Cremigkeit, Adstringenz. Es ist ein taktiler Eindruck, unabhängig vom Geschmack. Ein Kaffee kann süß schmecken und trotzdem trocken und leicht sein.',
      },
      {
        type: 'heading',
        id: 'einflussfaktoren',
        text: 'Einflussfaktoren',
      },
      {
        type: 'list',
        items: [
          'Brühmethode: French Press gibt mehr Körper als Papierfilter',
          'TDS: höherer Gehalt gelöster Stoffe = mehr Gewicht',
          'Röstgrad: dunklere Röstung oft schwerer im Körper',
          'Aufbereitung: Naturkaffees oft voller als gewaschene',
        ],
      },
    ],
  },
  {
    slug: 'naked-portafilter',
    term: 'Naked Portafilter',
    shortDef:
      'Siebträger ohne Boden – der Kaffee fließt direkt aus dem Sieb, was Fehler bei der Extraktion sofort sichtbar macht.',
    category: 'ausstattung',
    synonyms: ['Bottomless Portafilter', 'Naked Portafilter', 'offener Siebträger'],
    related: ['espresso', 'extraktion', 'puck-screen'],
    relatedRecipes: ['espresso'],
    faq: [
      {
        question: 'Was sieht man am Naked Portafilter, das man sonst nicht sieht?',
        answer:
          'Channeling – ungleichmäßige Extraktion, bei der Wasser durch Risse oder Lücken im Puck fließt – ist sofort als schräger oder spritzender Strahl erkennbar.',
      },
      {
        question: 'Ist ein Naked Portafilter für Anfänger geeignet?',
        answer:
          'Ja, gerade für Anfänger ist er lehrreich. Spritzer und Schräglage zeigen sofort, dass Mahlgrad, Verteilung oder Tampen nicht stimmen.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Ein normaler Siebträger hat einen Boden mit einem oder zwei Auslaufrohren. Der Naked Portafilter hat keinen Boden – der Espresso fließt direkt aus dem Sieb in die Tasse. Das macht die Extraktion sichtbar: ein guter Shot läuft als gleichmäßige, symmetrische, goldbraune Säule.',
      },
      {
        type: 'heading',
        id: 'diagnose',
        text: 'Diagnose-Werkzeug',
      },
      {
        type: 'paragraph',
        text: 'Jede Unregelmäßigkeit im Puck erzeugt einen sichtbaren Fehler. Zu wenig Tampdruck: der Strahl kommt schräg. Channeling: es spritzt. Ungleichmäßige Verteilung: asymmetrischer Fluss. Der Naked Portafilter ist der ehrlichste Spiegel für die Zubereitungsqualität.',
      },
    ],
  },
  {
    slug: 'nitro-cold-brew',
    term: 'Nitro Cold Brew',
    shortDef:
      'Cold Brew, der mit Stickstoff versetzt wird – cremige Textur ohne Milch, serviert vom Zapfhahn.',
    category: 'zubereitung',
    synonyms: ['Nitro Coffee', 'Nitro Kaffee'],
    related: ['cold-brew', 'immersion'],
    relatedRecipes: ['cold-brew', 'iced-coffee'],
    faq: [
      {
        question: 'Warum wirkt Nitro Cold Brew cremiger als normaler Cold Brew?',
        answer:
          'Stickstoff bildet viel kleinere Blasen als CO₂. Diese Mikroblasen erzeugen eine samtige, fast milchige Textur auf der Zunge.',
      },
      {
        question: 'Kann man Nitro Cold Brew zu Hause machen?',
        answer:
          'Ja, mit einem Sahnebläser und N₂O-Kapseln oder einem speziellen Nitro-Kreislaufsystem. Qualitativ kommt man dem Zapfhahn-Ergebnis nahe.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Nitro Cold Brew ist Cold Brew, durch den Stickstoffgas (N₂) gepresst wird. Ähnlich wie beim Guinness-Zapfen erzeugt der Stickstoff kleine, stabile Blasen. Das Getränk wirkt cremig und schwer – ohne einen Tropfen Milch.',
      },
      {
        type: 'heading',
        id: 'stickstoff-vs-co2',
        text: 'Stickstoff vs. CO₂',
      },
      {
        type: 'paragraph',
        text: 'CO₂-Karbonisierung erzeugt prickelnde Säure – das kennt man aus Sprudelwasser. Stickstoff ist fast geschmacksneutral und löst sich kaum. Das Ergebnis ist eine rundere, weichere Textur ohne Prickeln. Nitro Cold Brew schmeckt dadurch reicher und oft süßer als sein normales Pendant.',
      },
    ],
  },
  {
    slug: 'perkolation',
    term: 'Perkolation',
    shortDef:
      'Brühprinzip, bei dem Wasser kontinuierlich durch Kaffeemehl fließt – Grundlage von Pour Over, Filterkaffee und Espresso.',
    category: 'zubereitung',
    synonyms: ['Perkolationsbrühen', 'Durchlaufbrühen'],
    related: ['immersion', 'extraktion', 'blooming', 'espresso'],
    relatedRecipes: ['pour-over-filterkaffee', 'espresso'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Perkolation und Immersion?',
        answer:
          'Bei der Perkolation fließt frisches Wasser durch das Mehl und nimmt dabei Aromen mit. Bei der Immersion sitzt das Mehl im stehenden Wasser.',
      },
      {
        question: 'Warum braucht Perkolation eine gleichmäßige Kaffeeschicht?',
        answer:
          'Ungleichmäßige Schüttung führt zu Channeling: Wasser sucht den Weg des geringsten Widerstands und extrahiert ungleich.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Bei der Perkolation fließt Wasser aktiv durch das Kaffeebett hindurch. Das frische Wasser nimmt Aromen, Säuren und Öle mit, bevor es die Kaffeeschicht verlässt. Das Prinzip dahinter: das Konzentrationsgefälle zwischen frischem Wasser und gesättigtem Wasser treibt die Extraktion an.',
      },
      {
        type: 'heading',
        id: 'praxis',
        text: 'Perkolation in der Praxis',
      },
      {
        type: 'paragraph',
        text: 'Pour Over, Hario V60, Chemex und alle klassischen Filterkaffeemaschinen arbeiten nach diesem Prinzip. Espresso auch – hier sorgt Druck für das schnelle Perkolieren. Die Qualität der Extraktion hängt stark von Mahlgrad, Kaffeebett-Gleichmäßigkeit und Eingießtechnik ab.',
      },
    ],
  },
  {
    slug: 'puck-screen',
    term: 'Puck Screen',
    shortDef:
      'Dünnes Sieb aus Edelstahl, das auf das Kaffeemehl im Siebträger gelegt wird – verhindert Kleben am Duschsieb und verbessert die Extraktion.',
    category: 'ausstattung',
    synonyms: ['Shower Screen Puck', 'IMS Puck Screen'],
    related: ['espresso', 'naked-portafilter', 'wdt-tool'],
    relatedRecipes: ['espresso'],
    faq: [
      {
        question: 'Was bringt ein Puck Screen konkret?',
        answer:
          'Das Kaffeemehl klebt nicht mehr am Duschsieb der Maschine. Das macht die Reinigung einfacher und verhindert Rückstände, die beim nächsten Shot mitkommen.',
      },
      {
        question: 'Verändert ein Puck Screen den Geschmack?',
        answer:
          'Manche Baristas berichten von einer gleichmäßigeren Extraktion, weil das Wasser gleichmäßiger verteilt wird. Wissenschaftlich eindeutig belegt ist das nicht – der Effekt ist bei sauberem Equipment gering.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Puck Screen ist eine runde Edelstahlscheibe, passend zum Siebtägerdurchmesser. Sie wird nach dem Verteilen des Kaffeemehls auf den Puck gelegt, bevor der Siebträger eingehängt wird.',
      },
      {
        type: 'heading',
        id: 'vorteile',
        text: 'Vorteile im Alltag',
      },
      {
        type: 'list',
        items: [
          'Kein Kleben von Kaffeemehl am Duschsieb',
          'Einfachere Reinigung der Maschine',
          'Gleichmäßigere Wasserverteilung (in der Theorie)',
          'Günstiges Zubehör, einfach zu reinigen',
        ],
      },
    ],
  },
  {
    slug: 'q-grader',
    term: 'Q-Grader',
    shortDef:
      'International zertifizierter Kaffeeverkoster, der nach den Standards des Coffee Quality Institute (CQI) bewertet.',
    category: 'zubereitung',
    synonyms: ['Q Grader', 'Coffee Q-Grader'],
    related: ['cup-of-excellence', 'flavor-wheel', 'single-origin'],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Q-Grader und normalem Cupper?',
        answer:
          'Q-Grader ist ein formal zertifizierter Titel. Wer ihn trägt, hat 22 Tests bestanden – darunter Triangulations, Deskriptorentests und Cupping nach strenger SCA-Methodik.',
      },
      {
        question: 'Wie lange ist eine Q-Grader-Zertifizierung gültig?',
        answer:
          'Sie muss alle drei Jahre erneuert werden, um sicherzustellen, dass die sensorischen Fähigkeiten noch kalibriert sind.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Ein Q-Grader ist ein zertifizierter Spezialist für die Qualitätsbewertung von Kaffee. Die Ausbildung zum Q-Grader dauert mehrere Tage und umfasst 22 Tests – von Cupping über Triangulations bis hin zu Tests des Geruchssinns und der sensorischen Präzision.',
      },
      {
        type: 'heading',
        id: 'bedeutung',
        text: 'Bedeutung in der Branche',
      },
      {
        type: 'paragraph',
        text: 'Q-Grader arbeiten für Einkäufer, Röster, Exporteure und Zertifizierungsprogramme wie Cup of Excellence. Ihr Score gilt als objektiver Maßstab. Ein Kaffee mit 80 Punkten oder mehr auf der 100-Punkte-Skala gilt als Specialty Coffee.',
      },
    ],
  },
  {
    slug: 'ror',
    term: 'Rate of Rise (RoR)',
    shortDef:
      'Die Geschwindigkeit, mit der die Bohnentemperatur pro Minute steigt – zentrales Steuerungsinstrument für Röster.',
    category: 'roesten',
    synonyms: ['Rate of Rise', 'RoR', 'Temperaturanstiegsrate'],
    related: ['first-crack', 'second-crack', 'maillard-reaktion'],
    relatedArticles: ['roestgrade-verstehen', 'roestung-espresso'],
    faq: [
      {
        question: 'Was ist ein typischer RoR-Wert beim Rösten?',
        answer:
          'Zu Beginn der Röstung liegt der RoR bei 10–15 °C/min, gegen Ende fällt er idealerweise auf 3–5 °C/min. Ein konstant fallender RoR ist das Ziel – sogenannter Declining RoR.',
      },
      {
        question: 'Was passiert bei einem zu steilen RoR gegen Ende?',
        answer:
          'Wenn der RoR kurz vor oder nach dem First Crack stark steigt, besteht das Risiko eines Scorching oder eines unkontrollierten Röstverlaufs – die Bohne entwickelt sich zu schnell.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Rate of Rise (RoR) ist die Veränderung der Bohnentemperatur pro Minute – gemessen in Grad Celsius oder Fahrenheit. Moderne Röstsoftware wie Cropster oder Artisan zeigt den RoR in Echtzeit als Kurve neben der Temperaturkurve.',
      },
      {
        type: 'heading',
        id: 'declining-ror',
        text: 'Declining RoR als Qualitätsmerkmal',
      },
      {
        type: 'paragraph',
        text: 'Ein sogenannter Declining RoR – bei dem der Wert kontinuierlich sinkt, ohne zu crashen – gilt als Zeichen eines kontrollierten Röstzyklus. Ein plötzliches Ansteigen des RoR nahe dem First Crack deutet auf zu viel Energie hin und kann zu Tipping (verbrannten Bohnenspitzen) oder Scorching führen.',
      },
    ],
  },
  {
    slug: 'refraktometer',
    term: 'Refraktometer',
    shortDef:
      'Optisches Messgerät, das den TDS-Wert im Kaffee bestimmt – Grundlage für die Berechnung der Extraktionsausbeute.',
    category: 'ausstattung',
    synonyms: ['Kaffee-Refraktometer', 'VST Refraktometer'],
    related: ['tds', 'extraktionsausbeute', 'brew-ratio'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    faq: [
      {
        question: 'Welche Refraktometer-Modelle eignen sich für Kaffee?',
        answer:
          'VST LAB Coffee III und Atago PAL-COFFEE sind die Industrie­standards. Günstigere Modelle zeigen oft Werte, die nicht mit Kaffee kalibriert sind.',
      },
      {
        question: 'Brauche ich ein Refraktometer zu Hause?',
        answer:
          'Nur wenn man aktiv Rezepte optimiert. Für den normalen Gebrauch genügen Waage und Timer. Ein Refraktometer wird ab dem Niveau interessant, wo man reproduzierbar an Brührezepten feilt.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Ein Refraktometer misst den Brechungsindex von Flüssigkeiten. Gelöste Stoffe verändern diesen Brechungsindex messbar – je mehr Stoffe gelöst sind, desto stärker biegt sich Licht. Beim Kaffee gibt das Gerät den TDS-Wert in Prozent aus.',
      },
      {
        type: 'heading',
        id: 'anwendung',
        text: 'Anwendung in der Praxis',
      },
      {
        type: 'paragraph',
        text: 'Einen Tropfen Kaffee auf das Prisma geben, warten bis er Raumtemperatur hat, und messen. Den TDS-Wert dann mit der SCA-Formel zur Extraktionsausbeute verrechnen. Wichtig: der Kaffee muss exakt auf Raumtemperatur abgekühlt sein, sonst verfälscht die Temperatur das Messergebnis.',
      },
    ],
  },
  {
    slug: 'second-crack',
    term: 'Second Crack',
    shortDef:
      'Das zweite Knacken während der Röstung, bei dem Zellstrukturen brechen – Beginn der dunklen Röstgrade.',
    category: 'roesten',
    synonyms: ['Zweiter Crack', 'Second Crack Phase'],
    related: ['first-crack', 'maillard-reaktion', 'ror'],
    relatedArticles: ['roestgrade-verstehen', 'koffein-dunkle-roestung', 'roestung-espresso'],
    faq: [
      {
        question: 'Bei welcher Temperatur tritt Second Crack auf?',
        answer:
          'Typischerweise zwischen 220 und 230 °C Bohnentemperatur, etwas höher als First Crack.',
      },
      {
        question: 'Ist Second Crack schlecht für den Kaffee?',
        answer:
          'Nicht generell. Espresso-Röstungen für den klassisch-italienischen Stil gehen oft bis Second Crack oder knapp darüber. Specialty-Röster stoppen meist davor, um Fruchtigkeit zu erhalten.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Der Second Crack klingt schärfer und dünner als der First Crack – eher ein Knistern als ein Poppen. Die Zellstruktur der Bohne bricht auf. Öle treten an die Oberfläche. Die Bohne wird dunkler, glänzender und verliert an Fruchtigkeit.',
      },
      {
        type: 'heading',
        id: 'roeststufen',
        text: 'Röststufen rund um den Second Crack',
      },
      {
        type: 'list',
        items: [
          'Kurz vor Second Crack: Full City Roast, noch etwas Fruchtigkeit',
          'Zu Beginn Second Crack: Vienna Roast, schokoladig, kräftig',
          'Während Second Crack: French Roast, wenig Säure, viel Röststoff',
          'Nach Second Crack: Italian Roast, bitterbetont, ölig',
        ],
      },
    ],
  },
  {
    slug: 'sweetness',
    term: 'Sweetness',
    shortDef:
      'Natürliche Süße im Kaffee, entstanden durch Zucker in der Kirsche und Karamelisierung beim Rösten – kein Zucker nötig.',
    category: 'geschmack',
    synonyms: ['Süße', 'Kaffeesüße'],
    related: ['bitterness', 'mouthfeel', 'honey-process', 'extraktion'],
    relatedArticles: ['roestgrade-verstehen', 'saeurearmer-roestgrad'],
    faq: [
      {
        question: 'Warum schmecken manche Kaffees süßer als andere?',
        answer:
          'Höhere Anbauhöhe, Honey oder Natural Process und schonende helle Röstung erhalten mehr Zucker. Überröstung und Überextraktion zerstören Süße.',
      },
      {
        question: 'Kann Süße im Kaffee gemessen werden?',
        answer:
          'Nicht direkt. Beim Cupping nach SCA-Methode vergeben Cupper bis zu 10 Punkte für Sweetness – als subjektive, aber kalibrierte Bewertung.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Sweetness ist beim professionellen Cupping eine eigenständige Kategorie. Sie entsteht aus den Zuckern der Kaffeefrucht, die beim Rösten karamelisieren. Ein gut extrahierter, nicht überrösteter Kaffee braucht keinen Zucker – die natürliche Süße ist vorhanden.',
      },
      {
        type: 'heading',
        id: 'einflussfaktoren',
        text: 'Was Süße beeinflusst',
      },
      {
        type: 'paragraph',
        text: 'Reife Kirschen liefern mehr Zucker. Langsames Reifen in großer Höhe intensiviert sie. Naturaufbereitungen und Honey Process konservieren mehr Fruchtzucker. Korrekte Extraktion löst sie heraus, ohne die Bitterstoffe zu überziehen.',
      },
    ],
  },
  {
    slug: 'tds',
    term: 'TDS (Total Dissolved Solids)',
    shortDef:
      'Gesamtgehalt gelöster Stoffe im Kaffee in Prozent – Maß für die Stärke und Grundlage der Extraktionsberechnung.',
    category: 'zubereitung',
    synonyms: ['Total Dissolved Solids', 'Gesamtgelöste Feststoffe'],
    related: ['extraktionsausbeute', 'brew-ratio', 'refraktometer'],
    relatedArticles: ['wasser-die-unterschaetzte-zutat'],
    faq: [
      {
        question: 'Was ist der ideale TDS-Wert für Filterkaffee?',
        answer:
          'Die SCA empfiehlt 1,15–1,45 % TDS für Filterkaffee. Darunter wirkt der Kaffee dünn und wässrig, darüber zu intensiv.',
      },
      {
        question: 'Wie messe ich TDS?',
        answer:
          'Mit einem Refraktometer, das auf Kaffee kalibriert ist. Ein auf Trinkwasser kalibriertes Gerät liefert falsche Werte.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'TDS – Total Dissolved Solids – gibt an, wie viel Prozent des Kaffees aus gelösten Feststoffen besteht. Ein TDS von 1,3 % bedeutet: 1,3 g gelöste Stoffe auf 100 g Kaffee. Der Rest ist Wasser.',
      },
      {
        type: 'heading',
        id: 'richtwerte',
        text: 'Richtwerte und Zusammenhang mit EY',
      },
      {
        type: 'list',
        items: [
          'Filterkaffee: 1,15–1,45 % TDS (SCA-Empfehlung)',
          'Espresso: 8–12 % TDS',
          'Cold Brew Konzentrat: 3–5 % TDS',
          'TDS allein sagt noch nichts über Qualität – erst mit Brew Ratio ergibt sich die EY',
        ],
      },
      {
        type: 'paragraph',
        text: 'TDS und Extraktionsausbeute hängen zusammen, messen aber Verschiedenes. TDS misst Stärke, EY misst Effizienz. Hoher TDS bei niedrigem Brew Ratio kann immer noch unterextrahiert sein.',
      },
    ],
  },
  {
    slug: 'third-wave',
    term: 'Third Wave Coffee',
    shortDef:
      'Bewegung seit den 2000er-Jahren, die Kaffee als Spezialität behandelt – mit Fokus auf Herkunft, Röstung und Zubereitung.',
    category: 'zubereitung',
    synonyms: ['Third Wave', 'Dritte Welle', 'Specialty Coffee Movement'],
    related: ['single-origin', 'direct-trade', 'q-grader', 'cup-of-excellence'],
    relatedArticles: ['kaffeeanbau-weltweit', 'roestgrade-verstehen'],
    faq: [
      {
        question: 'Was unterscheidet Third Wave von Second Wave?',
        answer:
          'Second Wave (Starbucks-Ära) brachte Espressogetränke in den Massenmarkt. Third Wave geht tiefer: Herkunft, Varietät, Aufbereitung, Röstprofil – jedes Detail zählt.',
      },
      {
        question: 'Gibt es schon eine Fourth Wave?',
        answer:
          'Der Begriff kursiert, ist aber nicht einheitlich definiert. Manche verstehen darunter technologischen Fokus (Präzisionsmessung, Brühautomatisierung), andere eine Rückkehr zur Einfachheit.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Third Wave Coffee beschreibt eine kulturelle Bewegung, die Kaffee nicht mehr als Massenware, sondern als handwerkliches Produkt mit eigenem Terroir und Geschichte betrachtet. Sie begann in den frühen 2000er Jahren in den USA – getrieben von Röstern wie Stumptown, Counter Culture und Blue Bottle.',
      },
      {
        type: 'heading',
        id: 'merkmale',
        text: 'Merkmale der dritten Welle',
      },
      {
        type: 'list',
        items: [
          'Herkunftstransparenz: Farm, Region, Varietät auf dem Etikett',
          'Helle bis mittlere Röstung, um Terroir zu erhalten',
          'Pour Over, Aeropress und Filterkaffee neben Espresso',
          'Direkte Handelsbeziehungen mit Bauern',
          'Kaffee als bewusstes Genusserlebnis, nicht als Koffeinquelle',
        ],
      },
    ],
  },
  {
    slug: 'tuerkischer-kaffee',
    term: 'Türkischer Kaffee',
    shortDef:
      'Ungefilterte Zubereitung im Cezve, bei der feinst gemahlener Kaffee mit Wasser aufgekocht wird – einer der ältesten Brühstile der Welt.',
    category: 'zubereitung',
    synonyms: ['Türkisch Kaffee', 'Mokka', 'Ibrik-Kaffee'],
    related: ['extraktion', 'mahlgrad', 'immersion'],
    faq: [
      {
        question: 'Was ist ein Cezve?',
        answer:
          'Ein Cezve (auch Ibrik oder Briki) ist ein kleines, langstielige Metallkännchen, das traditionell aus Kupfer oder Messing gefertigt wird. Es ist speziell für die langsame Erhitzung auf einer Hitzequelle konzipiert.',
      },
      {
        question: 'Trinkt man beim türkischen Kaffee den Bodensatz mit?',
        answer:
          'Nein. Man wartet, bis der Bodensatz sich absetzt – in der Regel 2–3 Minuten – und trinkt dann vorsichtig den oberen Teil.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Türkischer Kaffee ist eine der ältesten Kaffeezubereitungen der Welt. Er entstand im osmanischen Reich des 15. Jahrhunderts und gilt in vielen Ländern des Nahen Ostens, auf dem Balkan und in der Türkei als nationales Kulturgut – seit 2013 sogar als immaterielles UNESCO-Weltkulturerbe.',
      },
      {
        type: 'heading',
        id: 'zubereitung',
        text: 'Zubereitung',
      },
      {
        type: 'paragraph',
        text: 'Feinst gemahlener Kaffee (feiner als Espresso) wird mit kaltem Wasser und nach Wunsch Zucker in den Cezve gegeben und bei niedriger Hitze langsam erhitzt, bis Schaum entsteht. Der Schaum wird abgenommen, der Kaffee nochmals erhitzt – dann in kleine Tassen gegossen.',
      },
    ],
  },
  {
    slug: 'wdt-tool',
    term: 'WDT Tool',
    shortDef:
      'Nadel-Werkzeug zum Auflösen von Klumpen im Kaffeemehl vor dem Tampen – steht für Weiss Distribution Technique.',
    category: 'ausstattung',
    synonyms: ['Weiss Distribution Technique', 'WDT', 'Verteilnadel'],
    related: ['espresso', 'naked-portafilter', 'puck-screen'],
    relatedRecipes: ['espresso'],
    faq: [
      {
        question: 'Was bringt das WDT-Tool konkret?',
        answer:
          'Kaffeemehl klumpt durch statische Aufladung. Diese Klumpen führen zu Channeling. Das WDT-Tool löst sie auf und sorgt für eine gleichmäßigere Verteilung im Siebträger.',
      },
      {
        question: 'Kann man ein WDT-Tool selbst bauen?',
        answer:
          'Ja. Originale Variante nach der Anleitung von John Weiss: dünne Nähnadeln in einen Korkstopfen stecken. Günstig und effektiv.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Das WDT Tool geht auf John Weiss zurück, der die Technik 2005 in einem Kaffeeforum beschrieb. Das Werkzeug besteht aus einem Griff mit mehreren dünnen Nadeln. Nach dem Mahlen wird das Mehl im Siebträger kreisförmig mit den Nadeln durchgezogen – Klumpen werden aufgelöst, die Verteilung egalisiert.',
      },
      {
        type: 'heading',
        id: 'technik',
        text: 'Die Technik',
      },
      {
        type: 'list',
        items: [
          'Kaffee in den Siebträger mahlen',
          'WDT-Tool sanft kreisförmig durch das Mehl führen',
          'Schichten horizontal und vertikal durchziehen',
          'Dann erst leveln und tampen',
          'Ergebnis: gleichmäßigerer Puck, weniger Channeling',
        ],
      },
    ],
  },
  {
    slug: 'yirgacheffe',
    term: 'Yirgacheffe',
    shortDef:
      'Berühmte Kaffeeregion im Süden Äthiopiens – bekannt für florale, teeähnliche Kaffees mit Jasmin, Zitrus und Bergamotte.',
    category: 'bohne',
    synonyms: ['Yirgacheffe Kaffee', 'Yirgacheffe Region'],
    related: ['arabica', 'terroir', 'single-origin', 'geisha'],
    relatedArticles: ['kaffeeanbau-weltweit'],
    faq: [
      {
        question: 'Was macht Yirgacheffe so besonders?',
        answer:
          'Die Kombination aus Höhe (1.700–2.200 m), lokaler Wildarabica-Genetik und Nassaufbereitung ergibt ein Profil, das unter Kaffeekennern seit Jahrzehnten als Maßstab gilt.',
      },
      {
        question: 'Wie trinkt man Yirgacheffe am besten?',
        answer:
          'Hell geröstet, als Pour Over oder Filterkaffee. Milch würde das florale Profil überdecken. Schwarz, ohne Zucker, ist die beste Art, die charakteristischen Aromen zu erleben.',
      },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Yirgacheffe liegt im Hochland der äthiopischen Sidama-Region, zwischen 1.700 und 2.200 Metern. Äthiopien gilt als Geburtsort des Kaffees – und Yirgacheffe ist der Ort innerhalb Äthiopiens, der weltweit am bekanntesten ist. Die Kombination aus Höhe, lokaler Wildarabica-Genetik und traditioneller Nassaufbereitung erzeugt ein einzigartiges Profil.',
      },
      {
        type: 'heading',
        id: 'geschmack',
        text: 'Typisches Geschmacksprofil',
      },
      {
        type: 'list',
        items: [
          'Aroma: Jasmin, Bergamotte, Zitronengras',
          'Geschmack: Pfirsich, Zitrus, schwarzer Tee',
          'Körper: leicht bis mittel',
          'Säure: lebhaft, frisch',
          'Abgang: lang, floral',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ein guter Yirgacheffe hell geröstet und als Pour Over aufgebrüht erinnert eher an feinen Tee als an das, was die meisten unter Kaffee verstehen. Das ist kein Fehler – das ist sein Charakter.',
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
