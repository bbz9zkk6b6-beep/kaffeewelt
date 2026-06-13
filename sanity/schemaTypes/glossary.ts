import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossar-Begriff',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Begriff',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Kurzdefinition',
      description: 'Ein Satz – erscheint in der Übersicht und als Teaser',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{type: 'glossaryCategory'}],
    }),
    defineField({
      name: 'synonyms',
      title: 'Synonyme / alternative Schreibweisen',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      description: 'Ausführliche Erklärung des Begriffs',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Überschrift H2', value: 'h2'},
            {title: 'Überschrift H3', value: 'h3'},
            {title: 'Zitat', value: 'blockquote'},
          ],
          lists: [{title: 'Aufzählung', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Fett', value: 'strong'},
              {title: 'Kursiv', value: 'em'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Bildbeschreibung (Alt-Text)'},
            {name: 'caption', type: 'string', title: 'Bildunterschrift (optional)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Häufige Fragen',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Frage & Antwort',
          fields: [
            {name: 'question', type: 'string', title: 'Frage', validation: (Rule) => Rule.required()},
            {name: 'answer', type: 'text', title: 'Antwort', rows: 3, validation: (Rule) => Rule.required()},
          ],
          preview: {
            select: {title: 'question'},
          },
        },
      ],
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Verwandte Begriffe',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'glossaryTerm'}],
        },
      ],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Passende Artikel',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
        },
      ],
    }),
    defineField({
      name: 'relatedRecipes',
      title: 'Passende Rezepte',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'recipe'}],
        },
      ],
    }),
  ],
})
