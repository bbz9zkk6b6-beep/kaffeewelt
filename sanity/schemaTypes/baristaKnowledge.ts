import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'baristaKnowledge',
  title: 'Barista-Wissen',
  type: 'document',
  fields: [
    defineField({
      name: 'thema',
      title: 'Thema',
      type: 'string',
      description: 'z. B. "Cold Brew", "Mahlgrad Espresso", "Wassertemperatur"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Begriffe, bei denen dieser Eintrag geladen wird',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'wissen',
      title: 'Wissenstext',
      type: 'text',
      rows: 6,
      description: 'Fließtext — wird direkt an Max weitergegeben. Kein Markdown.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aktiv',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true,
      description: 'Deaktivieren um einen Eintrag vorübergehend auszublenden',
    }),
  ],
  preview: {
    select: { title: 'thema', subtitle: 'wissen' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle?.slice(0, 80),
      }
    },
  },
  orderings: [
    { title: 'Thema A–Z', name: 'themaAsc', by: [{ field: 'thema', direction: 'asc' }] },
  ],
})
