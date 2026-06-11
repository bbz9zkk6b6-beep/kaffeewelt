'use client'

import { Sparkles } from 'lucide-react'
import { useSearch } from '@/components/search-context'
import { buttonVariants } from '@/components/ui/button'

export function BaristaButton() {
  const { setSearchOpen } = useSearch()

  return (
    <button
      type="button"
      onClick={() => setSearchOpen(true)}
      className={buttonVariants({ size: 'lg' })}
    >
      <Sparkles className="mr-1 h-4 w-4" />
      Frag den Barista
    </button>
  )
}
