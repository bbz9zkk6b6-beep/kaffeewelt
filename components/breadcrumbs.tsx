import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type Crumb = {
  name: string
  href?: string
}

const SITE_NAME = 'Meine kleine Kaffeewelt'

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  // Vollständige Kette inkl. Startseite
  const trail: Crumb[] = [{ name: 'Startseite', href: '/' }, ...items]

  // schema.org BreadcrumbList für strukturierte Daten / Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.href ? { item: crumb.href } : {}),
    })),
  }

  return (
    <nav aria-label="Brotkrumen" className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60"
                  aria-hidden="true"
                />
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-accent"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span
                  className={isLast ? 'font-medium text-foreground' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
      <span className="sr-only">{SITE_NAME}</span>
    </nav>
  )
}
