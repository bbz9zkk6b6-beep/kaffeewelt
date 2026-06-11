export * from './types'
export * from './authors'
export * from './categories'
export * from './articles'
export * from './news'
export * from './recipes'
export * from './taxonomy'
export * from './facts'
export * from './brewing'
export * from './glossary'
export * from './search'
export * from './affiliate'
export * from './integrated-search'

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} Min.`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} Std.` : `${h} Std. ${m} Min.`
}
