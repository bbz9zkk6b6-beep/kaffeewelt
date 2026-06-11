import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Impressum | Meine kleine Kaffeewelt',
  description: 'Impressum und Anbieterkennzeichnung von Meine kleine Kaffeewelt.',
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
              E-Mail: ol.wulf@meine-kleine-kaffeewelt.de
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Haftung für Inhalte
            </h2>
            <p className="mt-3">
              Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für
              eigene Inhalte auf diesen Seiten verantwortlich. Wir sind jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Haftung für Links
            </h2>
            <p className="mt-3">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Bildnachweise
            </h2>
            <p className="mt-3">
              Sämtliche auf dieser Website verwendeten Fotografien und Porträts
              wurden mit Hilfe künstlicher Intelligenz (KI) erzeugt. Es handelt
              sich nicht um Aufnahmen realer Personen, Orte oder Produkte;
              etwaige Ähnlichkeiten mit tatsächlichen Personen sind zufällig und
              nicht beabsichtigt. Die abgebildeten Autorinnen und Autoren sind
              fiktiv.
            </p>
          </section>

          <p className="text-sm">
            Dies ist ein fiktives Impressum für ein Demo-Projekt.
          </p>
        </div>
      </div>
    </>
  )
}
