import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** Visual size of the badge + wordmark */
  size?: 'sm' | 'md' | 'lg'
  /** Color treatment: dark text (light bg) or light text (dark bg / footer) */
  variant?: 'default' | 'light'
  /** Render as a link to the homepage */
  href?: string
  className?: string
}

const iconSizes = {
  sm: 'h-7 w-7',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
}

const titleSizes = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-3xl',
}

const kickerSizes = {
  sm: 'text-[10px]',
  md: 'text-[11px]',
  lg: 'text-xs',
}

function CoffeeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Steam */}
      <path d="M12 3c-.8 1 -.8 2 0 3s.8 2 0 3" opacity={0.9} />
      <path d="M16 2.5c-.9 1.1 -.9 2.2 0 3.3s.9 2.2 0 3.3" opacity={0.7} />
      <path d="M20 3c-.8 1 -.8 2 0 3s.8 2 0 3" opacity={0.9} />
      {/* Cup body */}
      <path d="M6 13h16v4a7 7 0 0 1 -7 7h-2a7 7 0 0 1 -7 -7v-4z" />
      {/* Handle */}
      <path d="M22 14h2.5a3 3 0 0 1 0 6H22" />
      {/* Saucer */}
      <path d="M5 27h18" />
    </svg>
  )
}

export function Logo({
  size = 'md',
  variant = 'default',
  href = '/',
  className,
}: LogoProps) {
  const isLight = variant === 'light'

  const content = (
    <span className={cn('flex items-center gap-2.5', className)}>
      <CoffeeMark
        className={cn(
          iconSizes[size],
          isLight ? 'text-primary-foreground' : 'text-accent',
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-medium uppercase tracking-[0.18em]',
            kickerSizes[size],
            isLight ? 'text-primary-foreground/60' : 'text-muted-foreground',
          )}
        >
          Meine kleine
        </span>
        <span
          className={cn(
            'font-serif font-bold tracking-tight',
            titleSizes[size],
            isLight ? 'text-primary-foreground' : 'text-foreground',
          )}
        >
          Kaffee<span className="text-accent">welt</span>
        </span>
      </span>
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Meine kleine Kaffeewelt – Startseite"
        className="inline-flex transition-opacity hover:opacity-80"
      >
        {content}
      </Link>
    )
  }

  return content
}
