import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-06-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

// Für schreibende Operationen (Kommentare einreichen)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-06-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
