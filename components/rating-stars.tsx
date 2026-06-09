import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingStars({
  rating,
  className,
  size = 16,
}: {
  rating: number
  className?: string
  size?: number
}) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`Bewertung ${rating.toFixed(1)} von 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i - 0.25
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              filled ? 'fill-accent text-accent' : 'fill-muted text-muted',
            )}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}
