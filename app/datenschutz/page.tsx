import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Datenschutz | Meine kleine Kaffeewelt',
  description:
    'Datenschutzerklärung von Meine kleine Kaffeewelt – wie wir mit deinen Daten umgehen.',
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        breadcrumbs={
          <Breadcrumbs items={[{ name: 'Datenschutzerklärung' }]} />
        }
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              1. Datenschutz auf einen Blick
            </h2>
            <p className="mt-3">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was
              mit deinen personenbezogenen Daten passiert, wenn du diese Website
              besuchst. Personenbezogene Daten sind alle Daten, mit denen du
              persönlich identifiziert werden kannst.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              2. Verantwortliche Stelle
            </h2>
            <p className="mt-3">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist
              Meine kleine Kaffeewelt, Olaf Wulf, Adalbert-Stifter-Straße 12,
              30655 Hannover, E-Mail: ol.wulf (at) meine-kleine-kaffeewelt.de. Die
              verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen
              über die Zwecke und Mittel der Verarbeitung personenbezogener
              Daten.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              3. Hosting
            </h2>
            <p className="mt-3">
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
              CA 91789, USA, gehostet. Beim Aufruf der Seiten werden technisch
              notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs,
              aufgerufene Seite) in Server-Logfiles verarbeitet. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO – unser berechtigtes Interesse an
              einer stabilen und sicheren Bereitstellung der Website. Mit Vercel
              besteht ein Auftragsverarbeitungsvertrag. Da Vercel Daten auch in
              den USA verarbeiten kann, erfolgt die Übermittlung auf Grundlage
              der EU-Standardvertragsklauseln.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              4. Newsletter
            </h2>
            <p className="mt-3">
              Wenn du den auf der Website angebotenen Newsletter beziehen
              möchtest, benötigen wir von dir eine E-Mail-Adresse. Die
              Verarbeitung der eingegebenen Daten erfolgt ausschließlich auf
              Grundlage deiner Einwilligung. Du kannst diese Einwilligung
              jederzeit widerrufen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              5. Kontaktformular
            </h2>
            <p className="mt-3">
              Wenn du uns per Kontaktformular Anfragen zukommen lässt, werden
              deine Angaben aus dem Anfrageformular inklusive der von dir dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage bei uns
              gespeichert.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              6. Deine Rechte
            </h2>
            <p className="mt-3">
              Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine
              gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
              sowie den Zweck der Datenverarbeitung und ggf. ein Recht auf
              Berichtigung oder Löschung dieser Daten.
            </p>
          </section>

          <p className="text-sm">
            Dies ist eine fiktive Datenschutzerklärung für ein Demo-Projekt.
          </p>
        </div>
      </div>
    </>
  )
}
