import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { writeClient } from '@/sanity/lib/client'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    ''
  )
}

function hashIp(ip: string): string | null {
  return ip ? createHash('sha256').update(ip).digest('hex') : null
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
    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: 'Eine Eingabe ist zu lang.' },
        { status: 400 },
      )
    }

    const sanitizedName = sanitizeInput(name, 100)
    const sanitizedEmail = sanitizeInput(email, 254)
    const sanitizedSubject = sanitizeInput(subject, 200)
    const sanitizedMessage = sanitizeInput(message, 5000)
    const ipHash = hashIp(getClientIp(request))

    if (ipHash) {
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
      const recent = await writeClient.fetch<number>(
        `count(*[_type == "contactSubmission" && ipHash == $ipHash && createdAt > $since])`,
        { ipHash, since },
      )

      if (recent >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Zu viele Anfragen. Bitte versuche es später erneut.' },
          { status: 429 },
        )
      }
    }

    await writeClient.create({
      _type: 'contactSubmission',
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      status: 'new',
      ipHash,
      createdAt: new Date().toISOString(),
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
