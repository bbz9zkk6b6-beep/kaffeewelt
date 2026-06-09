'use server'

import { headers } from 'next/headers'

export interface NewsletterState {
  status: 'idle' | 'success' | 'error'
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Einfaches In-Memory-Rate-Limit pro IP (Best-Effort, serverless-Instanz-gebunden).
const submissions = new Map<string, { count: number; first: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submissions.get(ip)
  if (!entry || now - entry.first > WINDOW_MS) {
    submissions.set(ip, { count: 1, first: now })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim()
  const honeypot = String(formData.get('company') ?? '').trim()

  // Bot-Schutz: gefülltes Honeypot-Feld -> still als Erfolg quittieren.
  if (honeypot !== '') {
    return { status: 'success', message: 'Vielen Dank für deine Anmeldung!' }
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: 'error',
      message: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    }
  }

  const hdrs = await headers()
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    hdrs.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: 'Zu viele Versuche. Bitte versuche es später erneut.',
    }
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.log('[v0] BREVO_API_KEY fehlt – Newsletter-Anbindung inaktiv.')
    return {
      status: 'error',
      message:
        'Der Newsletter ist noch nicht konfiguriert. Bitte versuche es später erneut.',
    }
  }

  const listId = process.env.BREVO_LIST_ID
    ? Number(process.env.BREVO_LIST_ID)
    : undefined

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        ...(listId ? { listIds: [listId] } : {}),
      }),
    })

    // 201 = neu angelegt, 204 = aktualisiert. Beides ist Erfolg.
    if (res.status === 201 || res.status === 204) {
      return {
        status: 'success',
        message: 'Vielen Dank! Bitte bestätige deine Anmeldung per E-Mail.',
      }
    }

    // Brevo gibt bei bereits existierendem Kontakt teils 400 mit Code zurück.
    const data = await res.json().catch(() => null)
    if (data?.code === 'duplicate_parameter') {
      return {
        status: 'success',
        message: 'Du bist bereits angemeldet – danke für dein Interesse!',
      }
    }

    console.log('[v0] Brevo-Fehler:', res.status, data)
    return {
      status: 'error',
      message: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.',
    }
  } catch (err) {
    console.log('[v0] Newsletter-Request fehlgeschlagen:', err)
    return {
      status: 'error',
      message: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.',
    }
  }
}
