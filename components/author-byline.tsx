import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getAuthor } from '@/lib/content'

type AuthorByline = {
  authorSlug: string
  date: string
  readingTime: number
}

export function AuthorByline({ authorSlug, date, readingTime }: AuthorByline) {
  const author = getAuthor(authorSlug)
  if (!author) return null

  return (
    <div className="flex items-center gap-3">
      <Image
        src={author.avatar || '/placeholder.svg'}
        alt={author.name}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
      <div className="text-sm">
        <p className="font-medium text-foreground">{author.name}</p>
        <p className="text-muted-foreground">
          {formatDate(date)} · {readingTime} Min. Lesezeit
        </p>
      </div>
    </div>
  )
}

export function AuthorBox({ authorSlug }: { authorSlug: string }) {
  const author = getAuthor(authorSlug)
  if (!author) return null

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
      <Image
        src={author.avatar || '/placeholder.svg'}
        alt={author.name}
        width={72}
        height={72}
        className="h-18 w-18 rounded-full object-cover"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          {author.role}
        </p>
        <p className="mt-1 font-serif text-lg font-semibold text-foreground">
          {author.name}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {author.bio}
        </p>
      </div>
    </div>
  )
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
    >
      ← {label}
    </Link>
  )
}
