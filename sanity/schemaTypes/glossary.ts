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
      title: 'Definition',
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
  ],
})
