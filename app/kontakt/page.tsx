import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/contact-form'
import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Kontakt | Meine kleine Kaffeewelt',
  description:
    'Nimm Kontakt mit dem Team von Meine kleine Kaffeewelt auf. Wir freuen uns auf deine Fragen, dein Feedback und deine Ideen.',
}

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Lass uns reden"
        description="Egal ob Lob, Kritik oder eine Frage zur perfekten Brühtemperatur – wir sind für dich da."
        breadcrumbs={<Breadcrumbs items={[{ name: 'Kontakt' }]} />}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ContactForm />
      </div>
    </>
  )
}
