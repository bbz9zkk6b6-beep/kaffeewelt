import { Fragment, type ReactNode } from 'react'
import { getGlossaryLinkIndex } from '@/lib/content'
import { GlossaryLink } from '@/components/glossary-link'

// Escaped Sonderzeichen für die RegExp-Konstruktion.
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Ein einziger, gecachter Matcher über alle Begriffe + Synonyme.
// Längere Phrasen stehen im Index vorn, daher matcht die Alternation
// den längstmöglichen Treffer zuerst.
let matcher: RegExp | null = null

function getMatcher(): RegExp {
  if (matcher) {
    matcher.lastIndex = 0
    return matcher
  }
  const index = getGlossaryLinkIndex()
  const alternation = index.map((e) => escapeRegExp(e.phrase)).join('|')
  // Unicode-bewusste "Wortgrenzen" über Lookarounds, damit auch deutsche
  // Umlaute korrekt als Wortzeichen gelten (\b funktioniert dafür nicht zuverlässig).
  matcher = new RegExp(
    `(?<![\\p{L}\\p{N}_])(?:${alternation})(?![\\p{L}\\p{N}_])`,
    'giu',
  )
  return matcher
}

// Sucht die passende Index-Phrase (case-insensitive) für einen gefundenen Treffer.
function findEntry(matchText: string) {
  const lower = matchText.toLowerCase()
  return getGlossaryLinkIndex().find((e) => e.phrase.toLowerCase() === lower)
}

type AutolinkOptions = {
  // Geteiltes Set über einen ganzen Inhalt: jeder Begriff wird nur einmal verlinkt.
  linkedSlugs: Set<string>
  // Auf dieser Glossarseite selbst nicht den eigenen Begriff verlinken.
  currentSlug?: string
}

// Wandelt reinen Text in React-Knoten um und ersetzt die erste relevante
// Erwähnung jedes Glossarbegriffs durch einen internen Link mit Tooltip.
export function autolinkGlossary(
  text: string,
  options: AutolinkOptions,
): ReactNode {
  const { linkedSlugs, currentSlug } = options
  const regex = getMatcher()
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const matchText = match[0]
    const entry = findEntry(matchText)

    // Bereits verlinkt oder eigener Begriff: überspringen, Text unverändert lassen.
    if (!entry || entry.slug === currentSlug || linkedSlugs.has(entry.slug)) {
      continue
    }

    linkedSlugs.add(entry.slug)

    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t-${key++}`}>
          {text.slice(lastIndex, match.index)}
        </Fragment>,
      )
    }

    nodes.push(
      <GlossaryLink
        key={`l-${key++}`}
        href={`/glossar/${entry.slug}`}
        title={entry.title}
        term={entry.term}
        shortDef={entry.shortDef}
      >
        {matchText}
      </GlossaryLink>,
    )

    lastIndex = match.index + matchText.length
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</Fragment>)
  }

  // Keine Treffer: ursprünglichen Text unverändert zurückgeben.
  return nodes.length > 0 ? nodes : text
}
