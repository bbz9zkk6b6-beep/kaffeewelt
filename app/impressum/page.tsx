import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von Meine kleine Kaffeewelt.',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Impressum"
        breadcrumbs={<Breadcrumbs items={[{ name: 'Impressum' }]} />}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-3">
              Meine kleine Kaffeewelt
              <br />
              Olaf Wulf<br />
              Adalbert-Stifter-Straße 12<br />
              30655 Hannover
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Kontakt
            </h2>
            <p className="mt-3">
              E-Mail: ol.wulf (at) meine-kleine-kaffeewelt.de
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Haftung für Inhalte
            </h2>
            <p className="mt-3">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Haftung für Links
            </h2>
            <p className="mt-3">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Bildnachweise
            </h2>
            <p className="mt-3">
              Sämtliche auf dieser Website verwendeten Fotografien und Porträts wurden mit Hilfe künstlicher Intelligenz (KI) erzeugt. Es handelt sich nicht um Aufnahmen realer Personen, Orte oder Produkte; etwaige Ähnlichkeiten mit tatsächlichen Personen sind zufällig und nicht beabsichtigt. Die abgebildeten Autorinnen und Autoren sind fiktiv.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
