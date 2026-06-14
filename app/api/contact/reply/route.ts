import {NextRequest, NextResponse} from 'next/server'
import {timingSafeEqual} from 'crypto'
import {writeClient} from '@/sanity/lib/client'

const STUDIO_ORIGIN = 'https://kaffeewelt.sanity.studio'

type ContactSubmission = {
  _id: string
  name: string
  email: string
  subject: string
  replySubject?: string
  replyBody?: string
  replyStatus?: string
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function corsHeaders(request: NextRequest): Record<string, string> {
  return request.headers.get('origin') === STUDIO_ORIGIN
    ? {
        'access-control-allow-origin': STUDIO_ORIGIN,
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
        vary: 'Origin',
      }
    : {}
}

function json(
  request: NextRequest,
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders(request),
  })
}

function validToken(token: unknown): boolean {
  const expected = process.env.CONTACT_REPLY_TOKEN
  if (!expected || typeof token !== 'string') return false

  const receivedBuffer = Buffer.from(token)
  const expectedBuffer = Buffer.from(expected)
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  )
}

export function OPTIONS(request: NextRequest) {
  if (request.headers.get('origin') !== STUDIO_ORIGIN) {
    return new NextResponse(null, {status: 403})
  }
  return new NextResponse(null, {status: 204, headers: corsHeaders(request)})
}

export async function POST(request: NextRequest) {
  try {
    const {documentId, token} = await request.json()

    if (!validToken(token)) {
      return json(request, {error: 'Nicht erlaubt.'}, 401)
    }

    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.CONTACT_FROM_EMAIL
    const senderName =
      process.env.CONTACT_FROM_NAME || 'Meine kleine Kaffeewelt'
    const replyToEmail = process.env.CONTACT_REPLY_TO_EMAIL

    if (!apiKey || !senderEmail) {
      return json(
        request,
        {error: 'Brevo und Absenderadresse sind noch nicht eingerichtet.'},
        503,
      )
    }

    if (typeof documentId !== 'string' || !/^[a-zA-Z0-9._-]+$/.test(documentId)) {
      return json(request, {error: 'Ungültige Kontaktanfrage.'}, 400)
    }

    const submission = await writeClient.fetch<ContactSubmission | null>(
      `*[_type == "contactSubmission" && _id == $documentId][0]{
        _id, name, email, subject, replySubject, replyBody, replyStatus
      }`,
      {documentId},
    )

    if (!submission?.replyBody?.trim()) {
      return json(
        request,
        {error: 'Kein veröffentlichter Antworttext vorhanden.'},
        400,
      )
    }
    if (submission.replyStatus === 'sent') {
      return json(
        request,
        {error: 'Diese Antwort wurde bereits versendet.'},
        409,
      )
    }

    const subject = submission.replySubject?.trim() || `Re: ${submission.subject}`
    const textContent = submission.replyBody.trim()
    const htmlContent = `<p>${escapeHtml(textContent).replaceAll('\n', '<br>')}</p>`
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {name: senderName, email: senderEmail},
        to: [{name: submission.name, email: submission.email}],
        subject,
        textContent,
        htmlContent,
        ...(replyToEmail
          ? {replyTo: {name: senderName, email: replyToEmail}}
          : {}),
      }),
    })
    const brevoResult = await brevoResponse.json().catch(() => null)

    if (!brevoResponse.ok) {
      await writeClient
        .patch(submission._id)
        .set({
          replyStatus: 'failed',
          sendError:
            brevoResult?.message || `Brevo-Fehler ${brevoResponse.status}`,
        })
        .commit()

      return json(
        request,
        {error: 'Brevo hat den Versand abgelehnt.'},
        502,
      )
    }

    await writeClient
      .patch(submission._id)
      .set({
        status: 'processed',
        replyStatus: 'sent',
        sentAt: new Date().toISOString(),
        brevoMessageId: brevoResult?.messageId || '',
      })
      .unset(['sendError'])
      .commit()

    return json(request, {success: true})
  } catch (error) {
    console.error('[Contact Reply] Error:', error)
    return json(
      request,
      {error: 'Antwort konnte nicht versendet werden.'},
      500,
    )
  }
}
