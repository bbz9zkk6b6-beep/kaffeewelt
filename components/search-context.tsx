'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SearchContextType = {
  isSearchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setSearchOpen] = useState(false)

  return (
    <SearchContext.Provider value={{ isSearchOpen, setSearchOpen }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}
