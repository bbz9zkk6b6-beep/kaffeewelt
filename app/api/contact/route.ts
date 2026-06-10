import { NextRequest, NextResponse } from 'next/server'

// Basis-Validierung für Kontaktformular-Einsendungen.
const RATE_LIMIT_KEY_PREFIX = 'contact_rate_'
const RATE_LIMIT_WINDOW = 3600 // 1 Stunde in Sekunden
const RATE_LIMIT_MAX = 5 // Max 5 Nachrichten pro IP pro Stunde

// In-Memory Rate Limiter (Produktiv: Redis/Upstash empfohlen).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}

function isRateLimited(ip: string): boolean {
  const key = RATE_LIMIT_KEY_PREFIX + ip
  const now = Date.now() / 1000
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count++
  return false
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length < 254
}

function sanitizeInput(input: string, maxLength: number): string {
  // Basis-Sanitization: Whitespace trimmen, Länge prüfen, HTML-Tags entfernen.
  const sanitized = input
    .trim()
    .substring(0, maxLength)
    .replace(/<[^>]*>/g, '')
  return sanitized
}

export async function POST(request: NextRequest) {
  try {
    // Rate-Limiting nach IP.
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuche es später erneut.' },
        { status: 429 },
      )
    }

    const body = await request.json()
    const { name, email, subject, message, website } = body

    // Honeypot: Falls das versteckte "website"-Feld gefüllt ist, verwerfen.
    if (website && typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json(
        { success: true },
        { status: 200 }, // Fake success für Bots
      )
    }

    // Validierung der Eingaben.
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name erforderlich.' },
        { status: 400 },
      )
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Gültige E-Mail erforderlich.' },
        { status: 400 },
      )
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return NextResponse.json(
        { error: 'Betreff erforderlich.' },
        { status: 400 },
      )
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Nachricht erforderlich.' },
        { status: 400 },
      )
    }

    const sanitizedName = sanitizeInput(name, 100)
    const sanitizedEmail = sanitizeInput(email, 254)
    const sanitizedSubject = sanitizeInput(subject, 200)
    const sanitizedMessage = sanitizeInput(message, 5000)

    // Hier: Nachricht an Email-Service, Datenbank, etc. senden.
    // Beispiel: await sendContactEmail({ name, email, subject, message })
    console.log('[Contact] Neue Nachricht von:', {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      ip,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Nachricht erfolgreich gesendet.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('[Contact] Error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage.' },
      { status: 500 },
    )
  }
}
