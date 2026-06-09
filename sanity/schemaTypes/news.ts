import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
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
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
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
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      ],
    }),
  ],
})
