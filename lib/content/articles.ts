import type { Article } from './types'

export const articles: Article[] = [
  {
    slug: 'roestgrade-verstehen',
    title: 'Röstgrade verstehen: Von hell bis dunkel',
    excerpt:
      'Warum der Röstgrad über Geschmack, Säure und Körper entscheidet – und welcher zu dir passt.',
    category: 'bohnenkunde',
    author: 'lena-brandt',
    date: '2025-05-28',
    readingTime: 7,
    image: '/images/article-beans.png',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'Der Röstgrad ist einer der wichtigsten Faktoren für den Geschmack deines Kaffees. Er entscheidet darüber, wie säuerlich, bitter oder vollmundig die Tasse am Ende schmeckt. Wer die Unterschiede kennt, kauft bewusster ein und brüht gezielter.',
      },
      {
        type: 'heading',
        id: 'helle-roestung',
        text: 'Helle Röstung',
      },
      {
        type: 'paragraph',
        text: 'Helle Röstungen werden kürzer und bei niedrigeren Temperaturen geröstet. Das Ergebnis sind fruchtige, blumige und teils saure Noten. Sie eignen sich hervorragend für Filterkaffee und Handaufgüsse, bei denen feine Aromen zur Geltung kommen.',
      },
      {
        type: 'heading',
        id: 'mittlere-roestung',
        text: 'Mittlere Röstung',
      },
      {
        type: 'paragraph',
        text: 'Die mittlere Röstung ist ein ausgewogener Allrounder. Säure und Bitterkeit halten sich die Waage, Karamell- und Nussnoten treten hervor. Sie funktioniert sowohl im Filter als auch in der Espressomaschine.',
      },
      {
        type: 'heading',
        id: 'dunkle-roestung',
        text: 'Dunkle Röstung',
      },
      {
        type: 'paragraph',
        text: 'Dunkle Röstungen sind kräftig, schokoladig und teils rauchig. Die Säure tritt in den Hintergrund, der Körper wird voller. Klassisch für italienischen Espresso und alle, die es intensiv mögen.',
      },
      {
        type: 'quote',
        text: 'Es gibt keinen besten Röstgrad – nur den, der zu deinem Geschmack und deiner Zubereitungsmethode passt.',
        cite: 'Lena Brandt',
      },
      {
        type: 'heading',
        id: 'fazit',
        text: 'Fazit',
      },
      {
        type: 'paragraph',
        text: 'Probiere dich durch die verschiedenen Röstgrade und notiere, was dir schmeckt. So findest du mit der Zeit deinen persönlichen Favoriten – und verstehst, warum dein Kaffee so schmeckt, wie er schmeckt.',
      },
    ],
  },
  {
    slug: 'die-richtige-muehle',
    title: 'Die richtige Mühle: Darum lohnt sich frisch gemahlen',
    excerpt:
      'Frisch gemahlener Kaffee schmeckt deutlich besser. Wir erklären, worauf es bei der Mühle ankommt.',
    category: 'zubehoer',
    author: 'jonas-keller',
    date: '2025-05-20',
    readingTime: 6,
    image: '/images/article-grinder.png',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'Wenn du nur eine Sache in deinem Kaffee-Setup verbessern könntest, dann wäre es die Mühle. Frisch gemahlener Kaffee bewahrt seine Aromen ungleich besser als vorgemahlenes Pulver.',
      },
      {
        type: 'heading',
        id: 'scheibe-oder-kegel',
        text: 'Scheiben- oder Kegelmahlwerk?',
      },
      {
        type: 'paragraph',
        text: 'Beide Mahlwerktypen liefern ein gleichmäßiges Mahlergebnis. Kegelmahlwerke laufen meist langsamer und kühler, Scheibenmahlwerke gelten als besonders präzise. Wichtiger als der Typ ist die Verarbeitungsqualität.',
      },
      {
        type: 'list',
        items: [
          'Gleichmäßiger Mahlgrad für ausgewogene Extraktion',
          'Stufenlose oder feine Einstellbarkeit',
          'Wenig Mahlrückstände in der Mühle',
          'Leise und langlebig im Betrieb',
        ],
      },
      {
        type: 'heading',
        id: 'mahlgrad',
        text: 'Der richtige Mahlgrad',
      },
      {
        type: 'paragraph',
        text: 'Für Espresso mahlst du fein, für Filterkaffee mittel und für French Press grob. Eine gute Mühle erlaubt dir, den Mahlgrad exakt auf deine Methode abzustimmen.',
      },
    ],
  },
  {
    slug: 'kaffeeanbau-weltweit',
    title: 'Kaffeeanbau weltweit: Eine Reise zu den Ursprüngen',
    excerpt:
      'Von Äthiopien bis Kolumbien – wie Klima und Höhe den Charakter der Bohne prägen.',
    category: 'bohnenkunde',
    author: 'lena-brandt',
    date: '2025-05-12',
    readingTime: 9,
    image: '/images/article-plantation.png',
    content: [
      {
        type: 'paragraph',
        text: 'Kaffee wächst rund um den Äquator im sogenannten Kaffeegürtel. Boden, Höhenlage und Klima jeder Region geben der Bohne ihren unverwechselbaren Charakter.',
      },
      {
        type: 'heading',
        id: 'aethiopien',
        text: 'Äthiopien – die Wiege des Kaffees',
      },
      {
        type: 'paragraph',
        text: 'Äthiopische Kaffees sind berühmt für ihre floralen und fruchtigen Aromen. Hier liegt der Ursprung des Arabica-Kaffees, und bis heute werden viele Sorten wild geerntet.',
      },
      {
        type: 'heading',
        id: 'suedamerika',
        text: 'Südamerika – Ausgewogenheit pur',
      },
      {
        type: 'paragraph',
        text: 'Kolumbien und Brasilien stehen für ausgewogene, nussig-schokoladige Kaffees. Sie bilden das Rückgrat vieler Espressomischungen weltweit.',
      },
      {
        type: 'quote',
        text: 'Jede Tasse erzählt die Geschichte eines Ortes, eines Klimas und der Menschen, die den Kaffee anbauen.',
        cite: 'Lena Brandt',
      },
    ],
  },
  {
    slug: 'latte-art-fuer-einsteiger',
    title: 'Latte Art für Einsteiger: So gelingt das erste Herz',
    excerpt:
      'Mit der richtigen Milch und etwas Übung zauberst du bald Muster in deine Tasse.',
    category: 'zubereitung',
    author: 'marie-hoffmann',
    date: '2025-05-04',
    readingTime: 8,
    image: '/images/article-latteart.png',
    content: [
      {
        type: 'paragraph',
        text: 'Latte Art ist nicht nur hübsch anzusehen – sie ist auch ein Zeichen für perfekt aufgeschäumte Milch. Mit etwas Übung gelingt dir das erste Herz schneller, als du denkst.',
      },
      {
        type: 'heading',
        id: 'milchschaum',
        text: 'Der perfekte Milchschaum',
      },
      {
        type: 'paragraph',
        text: 'Verwende kalte, frische Vollmilch. Ziehe beim Aufschäumen zuerst Luft ein und rolle die Milch danach, bis sie glänzend und feinporig ist – wie nasse Farbe.',
      },
      {
        type: 'list',
        items: [
          'Milch auf etwa 60–65 °C erhitzen',
          'Feinporiger, glänzender Mikroschaum',
          'Kanne kreisen lassen, um Blasen zu lösen',
          'Aus geringer Höhe einschenken, dann näher rangehen',
        ],
      },
    ],
  },
  {
    slug: 'wasser-die-unterschaetzte-zutat',
    title: 'Wasser: Die unterschätzte Zutat im Kaffee',
    excerpt:
      'Kaffee besteht zu über 98 % aus Wasser. Wir zeigen, warum die Wasserqualität so wichtig ist.',
    category: 'kaffeewissen',
    author: 'jonas-keller',
    date: '2025-04-26',
    readingTime: 5,
    image: '/images/article-water.png',
    content: [
      {
        type: 'paragraph',
        text: 'Die beste Bohne nützt wenig, wenn das Wasser nicht stimmt. Da eine Tasse Kaffee zu über 98 Prozent aus Wasser besteht, beeinflusst dessen Mineralgehalt den Geschmack enorm.',
      },
      {
        type: 'heading',
        id: 'haerte',
        text: 'Auf die Härte kommt es an',
      },
      {
        type: 'paragraph',
        text: 'Zu hartes Wasser dämpft die Aromen und führt zu Kalkablagerungen, zu weiches Wasser wirkt flach. Ein mittlerer Härtegrad ist ideal für die Extraktion.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured)
}
