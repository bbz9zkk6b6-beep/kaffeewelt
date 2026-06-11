'use client'

import { ReactNode } from 'react'
import { UnifiedSearchOverlay } from '@/components/unified-search-overlay'
import { useSearch } from '@/components/search-context'

export function RootClientWrapper({ children }: { children: ReactNode }) {
  const { isSearchOpen, setSearchOpen } = useSearch()

  return (
    <>
      {children}
      <UnifiedSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
