import {
  BookOpen,
  Sprout,
  Coffee,
  Wrench,
  Newspaper,
  CupSoda,
  Star,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  BookOpen,
  Sprout,
  Coffee,
  Wrench,
  Newspaper,
  CupSoda,
  Star,
}

export function CategoryIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = icons[name] ?? Coffee
  return <Icon className={className} aria-hidden="true" />
}
