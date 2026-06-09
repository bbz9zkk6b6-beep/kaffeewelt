import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: ReactNode
}) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}
        {eyebrow && (
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance font-serif text-3xl font-bold text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
