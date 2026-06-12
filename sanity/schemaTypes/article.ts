import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Zusammenfassung',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Lesezeit (Minuten)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Titelbild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Veröffentlicht',
      type: 'boolean',
      initialValue: false,
      description: 'Nur veröffentlichte Artikel erscheinen auf der Seite.',
    }),
    defineField({
      name: 'featured',
      title: 'Highlighted/Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heading',
          fields: [
            {name: 'text', type: 'string', title: 'Text'},
          ],
        },
        {
          type: 'object',
          name: 'paragraph',
          fields: [
            {name: 'text', type: 'text', title: 'Text', rows: 3},
          ],
        },
        {
          type: 'object',
          name: 'quote',
          fields: [
            {name: 'text', type: 'text', title: 'Zitat', rows: 2},
            {name: 'cite', type: 'string', title: 'Quelle'},
          ],
        },
        {
          type: 'object',
          name: 'inlineImage',
          title: 'Bild',
          fields: [
            {name: 'image', type: 'image', title: 'Bild', options: {hotspot: true}},
            {name: 'alt', type: 'string', title: 'Bildbeschreibung (Alt-Text)'},
            {name: 'caption', type: 'string', title: 'Bildunterschrift (optional)'},
          ],
        },
      ],
    }),
  ],
})
