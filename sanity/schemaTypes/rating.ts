import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rating',
  title: 'Bewertung',
  type: 'document',
  fields: [
    defineField({
      name: 'recipeSlug',
      title: 'Rezept-Slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stars',
      title: 'Sterne (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'voterKey',
      title: 'Voter-Key (Cookie)',
      type: 'string',
    }),
    defineField({
      name: 'ipHash',
      title: 'IP-Hash',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Erstellt am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'recipeSlug',
      subtitle: 'stars',
    },
    prepare({title, subtitle}) {
      return {
        title: `⭐ ${subtitle} – ${title}`,
      }
    },
  },
})
