'use server'

import { cookies, headers } from 'next/headers'
import { createHash, randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { client, writeClient } from '@/sanity/lib/client'
import { getRecipe } from '@/lib/content'

const VOTER_COOKIE = 'mkk_voter'
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 5

export interface RatingAggregate {
  average: number
  count: number
  userRating: number | null
}

function hashIp(ip: string) {
  return createHash('sha256').update(ip).digest('hex')
}

async function getVoterKey(): Promise<{ key: string; isNew: boolean }> {
  const store = await cookies()
  const existing = store.get(VOTER_COOKIE)?.value
  if (existing) return { key: existing, isNew: false }
  return { key: randomUUID(), isNew: true }
}

async function getClientIpHash(): Promise<string | null> {
  const h = await headers()
  const forwarded = h.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || ''
  return ip ? hashIp(ip) : null
}

export async function getRecipeRating(recipeSlug: string): Promise<RatingAggregate> {
  const store = await cookies()
  const voterKey = store.get(VOTER_COOKIE)?.value ?? null

  const ratings = await client.fetch(
    `*[_type == "rating" && recipeSlug == $recipeSlug]{ stars, voterKey }`,
    { recipeSlug }
  )

  const count = ratings.length
  const average = count > 0
    ? ratings.reduce((sum: number, r: any) => sum + r.stars, 0) / count
    : 0

  const userRating = voterKey
    ? ratings.find((r: any) => r.voterKey === voterKey)?.stars ?? null
    : null

  return { average, count, userRating }
}

export type SubmitRatingResult =
  | { ok: true; aggregate: RatingAggregate }
  | { ok: false; error: string }

export async function submitRecipeRating(
  recipeSlug: string,
  stars: number,
  honeypot: string,
): Promise<SubmitRatingResult> {
  if (honeypot && honeypot.trim() !== '') {
    return { ok: false, error: 'Ungültige Anfrage.' }
  }

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return { ok: false, error: 'Bitte wähle 1 bis 5 Sterne.' }
  }

  if (!getRecipe(recipeSlug)) {
    return { ok: false, error: 'Rezept nicht gefunden.' }
  }

  const ipHash = await getClientIpHash()

  if (ipHash) {
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const recent = await client.fetch(
      `count(*[_type == "rating" && ipHash == $ipHash && createdAt > $since])`,
      { ipHash, since }
    )
    if (recent >= RATE_LIMIT_MAX) {
      return { ok: false, error: 'Zu viele Bewertungen in kurzer Zeit.' }
    }
  }

  const { key: voterKey, isNew } = await getVoterKey()
  if (isNew) {
    const store = await cookies()
    store.set(VOTER_COOKIE, voterKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
  }

  const existing = await client.fetch(
    `*[_type == "rating" && recipeSlug == $recipeSlug && voterKey == $voterKey][0]._id`,
    { recipeSlug, voterKey }
  )

  if (existing) {
    await writeClient.patch(existing).set({ stars, createdAt: new Date().toISOString() }).commit()
  } else {
    await writeClient.create({
      _type: 'rating',
      recipeSlug,
      stars,
      voterKey,
      ipHash,
      createdAt: new Date().toISOString(),
    })
  }

  revalidatePath(`/rezepte/${recipeSlug}`)
  const aggregate = await getRecipeRating(recipeSlug)
  return { ok: true, aggregate }
}
