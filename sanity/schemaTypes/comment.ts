import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Kommentar',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Kommentar',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content-Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Artikel', value: 'artikel'},
          {title: 'News', value: 'news'},
          {title: 'Rezept', value: 'rezepte'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentSlug',
      title: 'Beitrag-Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          {title: 'Warten auf Freigabe', value: 'pending'},
          {title: 'Freigegeben', value: 'approved'},
          {title: 'Abgelehnt', value: 'rejected'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
      title: 'Eingereicht am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
    {
      title: 'Wartend zuerst',
      name: 'pendingFirst',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'body',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      const emoji = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'
      return {
        title: `${emoji} ${title}`,
        subtitle,
      }
    },
  },
})
