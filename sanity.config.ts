import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {sendContactReply} from './sanity/documentActions/sendContactReply'

export default defineConfig({
  name: 'kaffeewelt',
  title: 'Meine kleine Kaffeewelt',
  projectId: 'nw0k8jag',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previous, context) =>
      context.schemaType === 'contactSubmission'
        ? [...previous, sendContactReply]
        : previous,
  },
})
