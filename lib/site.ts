const FALLBACK_SITE_URL = 'https://meine-kleine-kaffeewelt.de'

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL?.trim() || FALLBACK_SITE_URL
  const normalized = raw.replace(/^http:\/\//i, 'https://').replace(/\/+$/, '')

  try {
    const url = new URL(normalized)

    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4)
    }

    return url.toString().replace(/\/$/, '')
  } catch {
    return FALLBACK_SITE_URL
  }
}

export function getSiteHost(): string {
  return new URL(getSiteUrl()).hostname
}
