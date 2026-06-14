import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Kontaktanfrage',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'email',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Betreff',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Nachricht',
      type: 'text',
      rows: 8,
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'Neu', value: 'new'},
          {title: 'Bearbeitet', value: 'processed'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'replySubject',
      title: 'Antwort-Betreff',
      type: 'string',
      description: 'Ohne Eingabe wird „Re: Betreff“ verwendet.',
    }),
    defineField({
      name: 'replyBody',
      title: 'Antwort',
      type: 'text',
      rows: 10,
      description: 'Antwort schreiben, veröffentlichen und danach „Antwort senden“ wählen.',
    }),
    defineField({
      name: 'replyStatus',
      title: 'Versandstatus',
      type: 'string',
      readOnly: true,
      initialValue: 'draft',
      options: {
        list: [
          {title: 'Entwurf', value: 'draft'},
          {title: 'Versendet', value: 'sent'},
          {title: 'Fehlgeschlagen', value: 'failed'},
        ],
      },
    }),
    defineField({
      name: 'sentAt',
      title: 'Versendet am',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'brevoMessageId',
      title: 'Brevo Nachrichten-ID',
      type: 'string',
      readOnly: true,
      hidden: ({document}) => !document?.brevoMessageId,
    }),
    defineField({
      name: 'sendError',
      title: 'Versandfehler',
      type: 'text',
      readOnly: true,
      hidden: ({document}) => !document?.sendError,
    }),
    defineField({
      name: 'ipHash',
      title: 'IP-Prüfwert',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Eingegangen am',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'subject',
      name: 'name',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({title, name, status, createdAt}) {
      const state = status === 'processed' ? 'Bearbeitet' : 'Neu'
      const date = createdAt
        ? new Intl.DateTimeFormat('de-DE', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(createdAt))
        : ''

      return {
        title: `${status === 'processed' ? '✓' : '●'} ${title}`,
        subtitle: [state, name, date].filter(Boolean).join(' · '),
      }
    },
  },
})
