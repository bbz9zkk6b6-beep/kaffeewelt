import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SearchProvider } from '@/components/search-context'
import { RootClientWrapper } from '@/app/root-client'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://meine-kleine-kaffeewelt.de'),
  title: {
    default: 'Meine kleine Kaffeewelt – Das Magazin rund um Kaffee',
    template: '%s | Meine kleine Kaffeewelt',
  },
  description:
    'Aktuelle Kaffee-News, hochwertige Artikel, Rezepte und Anleitungen für Kaffeeliebhaber, Hobby-Baristas und Einsteiger.',
  keywords: [
    'Kaffee',
    'Kaffee-Rezepte',
    'Barista',
    'Espresso',
    'Cold Brew',
    'Kaffee-News',
    'Bohnenkunde',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'Meine kleine Kaffeewelt',
    description:
      'Das deutschsprachige Magazin rund um Kaffee – News, Artikel und Rezepte.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${fraunces.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SearchProvider>
          <RootClientWrapper>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </RootClientWrapper>
        </SearchProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


