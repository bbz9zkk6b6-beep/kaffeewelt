import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Rezept',
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
      name: 'type',
      title: 'Rezepttyp',
      type: 'string',
      options: {
        list: [
          'espresso',
          'filterkaffee',
          'cold-brew',
          'cappuccino',
          'latte-macchiato',
          'iced-coffee',
          'suess',
          'alkoholfrei',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Schwierigkeitsgrad',
      type: 'string',
      options: {
        list: ['Einfach', 'Mittel', 'Anspruchsvoll'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalTime',
      title: 'Gesamtzeit (Minuten)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'baseServings',
      title: 'Portionen (Basis)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
      name: 'featured',
      title: 'Highlighted/Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ingredients',
      title: 'Zutaten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ingredient',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'amount', type: 'number', title: 'Menge'},
            {
              name: 'unit',
              type: 'string',
              title: 'Einheit',
              options: {
                list: ['ml', 'g', 'EL', 'TL', 'Stück', 'Prise'],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'steps',
      title: 'Schritte',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            {name: 'title', type: 'string', title: 'Schritt-Titel'},
            {name: 'text', type: 'text', title: 'Beschreibung', rows: 3},
          ],
        },
      ],
    }),
    defineField({
      name: 'tips',
      title: 'Tipps',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'nutrition',
      title: 'Nährwerte',
      type: 'object',
      fields: [
        {name: 'kcal', type: 'number', title: 'Kalorien'},
        {name: 'fett', type: 'number', title: 'Fett (g)'},
        {name: 'kohlenhydrate', type: 'number', title: 'Kohlenhydrate (g)'},
        {name: 'eiweiss', type: 'number', title: 'Eiweiß (g)'},
      ],
    }),
  ],
})
