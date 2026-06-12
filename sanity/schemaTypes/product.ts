import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Produktname',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kurzbeschreibung (für Karten)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Produktbild',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Kaffeemühlen', value: 'muehlen'},
          {title: 'Espressomaschinen', value: 'espressomaschinen'},
          {title: 'Vollautomaten', value: 'vollautomaten'},
          {title: 'Filterkaffee & Pour-over', value: 'filterkaffee'},
          {title: 'Zubehör', value: 'zubehoer'},
          {title: 'Wasserkocher', value: 'wasserkocher'},
          {title: 'Waagen & Messgeräte', value: 'waagen'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pros',
      title: 'Vorteile',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Stichpunkte — was spricht für das Produkt?',
    }),
    defineField({
      name: 'cons',
      title: 'Nachteile',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Stichpunkte — was sollte man wissen?',
    }),
    defineField({
      name: 'body',
      title: 'Ausführliche Beschreibung',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paragraph',
          fields: [{name: 'text', type: 'text', title: 'Text', rows: 3}],
        },
        {
          type: 'object',
          name: 'heading',
          fields: [{name: 'text', type: 'string', title: 'Überschrift'}],
        },
      ],
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Amazon-Link (mit Affiliate-Tag)',
      type: 'url',
      description: 'z.B. https://www.amazon.de/dp/ASIN?tag=kaffeewelt21-21',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliateSlug',
      title: 'Redirect-Slug (für /r/...)',
      type: 'slug',
      options: {source: 'title'},
      description: 'Wird für den internen Redirect genutzt (z.B. /r/graef-cm800)',
    }),
    defineField({
      name: 'featured',
      title: 'Empfohlen / Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'priceHint',
      title: 'Preishinweis (optional, kein exakter Preis)',
      type: 'string',
      description: 'z.B. "ca. 120–150 €" oder "Mittelklasse". Keinen genauen Preis — der ändert sich.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
