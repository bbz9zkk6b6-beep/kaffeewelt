import type { ArticleBlock } from '@/lib/content'
import { autolinkGlossary } from '@/lib/glossary-autolink'

type ArticleBodyProps = {
  blocks: ArticleBlock[]
  // Automatische interne Glossar-Verlinkung in Absätzen und Listen aktivieren.
  autolink?: boolean
  // Slug der aktuellen Seite – verhindert Selbstverlinkung auf Glossarseiten.
  currentGlossarySlug?: string
}

export function ArticleBody({
  blocks,
  autolink = false,
  currentGlossarySlug,
}: ArticleBodyProps) {
  // Geteiltes Set über den gesamten Inhalt: jeder Begriff wird nur einmal verlinkt.
  const linkedSlugs = new Set<string>()
  const link = (text: string) =>
    autolink
      ? autolinkGlossary(text, { linkedSlugs, currentSlug: currentGlossarySlug })
      : text

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-24 font-serif text-2xl font-bold text-foreground"
              >
                {block.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-pretty leading-relaxed text-foreground/80"
              >
                {link(block.text)}
              </p>
            )
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-accent bg-secondary/60 px-6 py-4 font-serif text-lg italic text-foreground"
              >
                <p className="text-balance">{block.text}</p>
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-muted-foreground">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            )
          case 'list':
            return (
              <ul key={i} className="flex flex-col gap-2">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 leading-relaxed text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {link(item)}
                  </li>
                ))}
              </ul>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
