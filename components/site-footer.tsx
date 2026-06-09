import Link from 'next/link'
import { AtSign, Send, Rss } from 'lucide-react'
import { categories } from '@/lib/content'
import { Logo } from '@/components/logo'

const exploreLinks = [
  { label: 'Startseite', href: '/' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Kaffee-News', href: '/news' },
  { label: 'Rezepte', href: '/rezepte' },
  { label: 'Kategorien', href: '/kategorien' },
  { label: 'Glossar', href: '/glossar' },
]

const legalLinks = [
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
]

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo size="md" variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Dein deutschsprachiges Magazin rund um Kaffee – News, Wissen,
              Rezepte und Inspiration für jede Tasse.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <AtSign className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Newsletter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="RSS-Feed"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Entdecken
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Kategorien
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategorie/${cat.slug}`}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Service
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Meine kleine Kaffeewelt. Alle Rechte
            vorbehalten.
          </p>
          <p>Mit Leidenschaft für Kaffee gemacht.</p>
        </div>
      </div>
    </footer>
  )
}
