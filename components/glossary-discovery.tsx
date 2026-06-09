import Link from 'next/link'
import { ArrowUpRight, Newspaper, BookOpen } from 'lucide-react'
import { articles, news } from '@/lib/content'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function GlossaryDiscovery() {
  const latestArticles = [...articles]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)
  const latestNews = [...news]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  return (
    <aside className="mt-12 border-t border-border pt-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <section>
          <div className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-4 w-4 text-accent" />
            <h2 className="font-serif text-base font-semibold">
              Neue Artikel
            </h2>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {latestArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/artikel/${a.slug}`}
                  className="group flex items-start justify-between gap-2 text-sm"
                >
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug text-foreground group-hover:text-accent">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {formatDate(a.date)}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/artikel"
            className="mt-4 inline-block text-xs font-medium text-accent hover:underline"
          >
            Alle Artikel ansehen
          </Link>
        </section>

        <section>
          <div className="flex items-center gap-2 text-foreground">
            <Newspaper className="h-4 w-4 text-accent" />
            <h2 className="font-serif text-base font-semibold">Aktuelle News</h2>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {latestNews.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/news/${n.slug}`}
                  className="group flex items-start justify-between gap-2 text-sm"
                >
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug text-foreground group-hover:text-accent">
                      {n.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {formatDate(n.date)}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/news"
            className="mt-4 inline-block text-xs font-medium text-accent hover:underline"
          >
            Alle News ansehen
          </Link>
        </section>
      </div>
    </aside>
  )
}
