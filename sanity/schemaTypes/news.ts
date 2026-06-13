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
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.current) return true
          return value.current === value.current.trim()
            ? true
            : 'Der Slug darf keine Leerzeichen am Anfang oder Ende enthalten.'
        }),
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
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Überschrift H2', value: 'h2'},
            {title: 'Überschrift H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Fett', value: 'strong'},
              {title: 'Kursiv', value: 'em'},
            ],
          },
        },
      ],
    }),
  ],
})
