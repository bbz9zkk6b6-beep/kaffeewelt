import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'glossaryCategory',
  title: 'Glossar-Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Schlüssel',
      type: 'slug',
      description: 'Interner Schlüssel (automatisch aus Name generiert)',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'value.current'},
  },
})
