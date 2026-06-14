'use server'

import { headers } from 'next/headers'
import { createHash } from 'crypto'
import { revalidatePath } from 'next/cache'
import { client, writeClient } from '@/sanity/lib/client'
import { COMMENTS_QUERY } from '@/sanity/lib/queries'

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX = 3

export type CommentContentType = 'artikel' | 'news' | 'rezepte'

export interface PublicComment {
  id: string
  authorName: string
  body: string
  createdAt: string
}

function hashIp(ip: string) {
  return createHash('sha256').update(ip).digest('hex')
}

async function getClientIpHash(): Promise<string | null> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || ''
  return ip ? hashIp(ip) : null
}

const pathFor: Record<CommentContentType, string> = {
  artikel: 'artikel',
  news: 'news',
  rezepte: 'rezepte',
}

export async function getApprovedComments(
  contentType: CommentContentType,
  contentSlug: string,
): Promise<PublicComment[]> {
  const rows = await client.fetch(COMMENTS_QUERY, { contentType, contentSlug })
  return rows.map((r: any) => ({
    id: r._id,
    authorName: r.authorName,
    body: r.body,
    createdAt: r.createdAt,
  }))
}

export type SubmitCommentResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitComment(
  contentType: CommentContentType,
  contentSlug: string,
  authorName: string,
  body: string,
  honeypot: string,
): Promise<SubmitCommentResult> {
  if (!['artikel', 'news', 'rezepte'].includes(contentType)) {
    return { ok: false, error: 'Ungültiger Inhaltstyp.' }
  }
  if (!/^[a-z0-9-]+$/.test(contentSlug)) {
    return { ok: false, error: 'Ungültiger Beitrag.' }
  }
  if (honeypot && honeypot.trim() !== '') {
    return { ok: false, error: 'Ungültige Anfrage.' }
  }

  const name = authorName.trim()
  const text = body.trim()
  if (name.length < 2 || name.length > 60) {
    return { ok: false, error: 'Bitte gib einen gültigen Namen ein.' }
  }
  if (text.length < 3 || text.length > 2000) {
    return { ok: false, error: 'Dein Kommentar muss zwischen 3 und 2000 Zeichen lang sein.' }
  }

  const ipHash = await getClientIpHash()

  if (ipHash) {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const recent = await client.fetch(
      `count(*[_type == "comment" && ipHash == $ipHash && createdAt > $since])`,
      { ipHash, since }
    )
    if (recent >= RATE_LIMIT_MAX) {
      return { ok: false, error: 'Zu viele Kommentare in kurzer Zeit. Bitte versuche es später erneut.' }
    }
  }

  await writeClient.create({
    _type: 'comment',
    contentType,
    contentSlug,
    authorName: name,
    body: text,
    status: 'pending',
    ipHash,
    createdAt: new Date().toISOString(),
  })

  revalidatePath(`/${pathFor[contentType]}/${contentSlug}`)
  return { ok: true }
}

export async function getCommentsByStatus(
  status: 'pending' | 'approved' | 'rejected',
) {
  return client.fetch(
    `*[_type == "comment" && status == $status] | order(createdAt desc)`,
    { status }
  )
}

export async function getModerationCounts(): Promise<
  Record<'pending' | 'approved' | 'rejected', number>
> {
  const counts = await client.fetch(`{
    "pending": count(*[_type == "comment" && status == "pending"]),
    "approved": count(*[_type == "comment" && status == "approved"]),
    "rejected": count(*[_type == "comment" && status == "rejected"])
  }`)
  return counts
}

export async function setCommentStatus(
  id: string,
  status: 'approved' | 'rejected' | 'pending',
): Promise<{ ok: true }> {
  const comment = await writeClient.fetch<{
    contentType?: CommentContentType
    contentSlug?: string
  } | null>(
    `*[_type == "comment" && _id == $id][0]{contentType, contentSlug}`,
    { id },
  )

  await writeClient.patch(id).set({ status }).commit()
  revalidatePath('/admin/kommentare')
  if (comment?.contentType && comment.contentSlug) {
    revalidatePath(`/${pathFor[comment.contentType]}/${comment.contentSlug}`)
  }
  return { ok: true }
}
