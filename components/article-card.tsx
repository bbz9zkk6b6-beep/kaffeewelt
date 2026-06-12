import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import type { Article, NewsItem } from '@/lib/content'
import { formatDate, getCategory, getAuthor } from '@/lib/content'

type Post = Article | NewsItem

export function ArticleCard({
  post,
  basePath,
}: {
  post: Post
  basePath: 'news' | 'artikel'
}) {
  const category = getCategory(post.category)
  const author = getAuthor(post.author)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/${basePath}/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={post.image || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 [filter:brightness(0.95)_saturate(0.85)_sepia(0.12)]"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {category.name}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} Min.
          </span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-foreground text-balance">
          <Link
            href={`/${basePath}/${post.slug}`}
            className="transition-colors hover:text-accent"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </div>
    </article>
  )
}
