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
              1. Verantwortliche Stelle
            </h2>
            <p className="mt-3">
              Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
            </p>
            <p className="mt-3">
              Meine kleine Kaffeewelt<br />
              Olaf Wulf<br />
              Adalbert-Stifter-Straße 12<br />
              30655 Hannover<br />
              E-Mail: ol.wulf (at) meine-kleine-kaffeewelt.de
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              2. Welche Daten wir erheben und warum
            </h2>
            <p className="mt-3">
              Beim Aufruf dieser Website werden technisch notwendige Daten in sogenannten Server-Logfiles erfasst. Dazu gehören IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser und Betriebssystem sowie die Referrer-URL. Diese Daten werden ausschließlich zur Sicherstellung des Betriebs und zur Fehleranalyse verarbeitet und nicht mit anderen Daten zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
            <p className="mt-3">
              Wenn du das Kommentarformular nutzt, speichern wir deinen Namen und deinen Kommentartext. Kommentare werden erst nach manueller Freigabe veröffentlicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <p className="mt-3">
              Wenn du das Kontaktformular nutzt, speichern wir deinen Namen, deine E-Mail-Adresse, den Betreff und deine Nachricht, um deine Anfrage zu beantworten. Die Daten werden in unserem Content-Management-System Sanity gespeichert und nach abgeschlossener Bearbeitung manuell gelöscht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen sowie Art. 6 Abs. 1 lit. f DSGVO bei sonstigen Anfragen.
            </p>
            <p className="mt-3">
              Wenn du dich für den Newsletter anmeldest, speichern wir deine E-Mail-Adresse. Die Verarbeitung erfolgt ausschließlich auf Grundlage deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Du kannst deine Einwilligung jederzeit widerrufen, indem du dich über den Abmeldelink im Newsletter abmeldest oder uns per E-Mail kontaktierst.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              3. Hosting
            </h2>
            <p className="mt-3">
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Mit Vercel besteht ein Auftragsverarbeitungsvertrag. Da Vercel Daten auch in den USA verarbeiten kann, erfolgt die Übermittlung auf Grundlage der EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              4. Affiliate-Links
            </h2>
            <p className="mt-3">
              Diese Website enthält Affiliate-Links, insbesondere zu Amazon. Wenn du auf einen solchen Link klickst, wird eine Verbindung zu den Servern des jeweiligen Anbieters hergestellt. Dabei können technische Daten wie deine IP-Adresse übermittelt werden. Wir sind am Amazon-Partnerprogramm beteiligt (Partner-Tag: kaffeewelt21-21). Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Affiliate-Links sind auf dieser Website als „Anzeige" oder „Affiliate-Link" gekennzeichnet.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              5. Keine Analyse- oder Tracking-Dienste
            </h2>
            <p className="mt-3">
              Diese Website verwendet kein Google Analytics, kein Facebook Pixel und keine vergleichbaren Tracking-Dienste. Es werden keine Cookies für Werbe- oder Analysezwecke gesetzt.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              6. Deine Rechte
            </h2>
            <p className="mt-3">
              Du hast das Recht auf Auskunft über die zu deiner Person gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO). Soweit die Verarbeitung auf einer Einwilligung beruht, kannst du diese jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
            <p className="mt-3">
              Außerdem steht dir ein Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde zu. In Niedersachsen ist das die Landesbeauftragte für den Datenschutz Niedersachsen (LfD Niedersachsen), Prinzenstraße 5, 30159 Hannover.
            </p>
            <p className="mt-3">
              Anfragen zu deinen Rechten richtest du bitte an: ol.wulf (at) meine-kleine-kaffeewelt.de
            </p>
          </section>

          <p className="mt-4 text-xs">
            Stand: Juni 2026
          </p>
        </div>
      </div>
    </>
  )
}
