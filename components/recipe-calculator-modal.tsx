'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { recipes } from '@/lib/content'
import { recipeTypeLabels } from '@/lib/content/types'
import { BrewCalculator } from '@/components/brew-calculator'

type RecipeCalculatorModalProps = {
  recipeSlug: string
  onClose: () => void
}

export function RecipeCalculatorModal({
  recipeSlug,
  onClose,
}: RecipeCalculatorModalProps) {
  const recipe = recipes.find((r) => r.slug === recipeSlug)

  if (!recipe) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-background rounded-2xl border border-border shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Mengen für {recipe.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Kalkulator */}
          <BrewCalculator
            initialMethodId={
              ['espresso', 'filterkaffee', 'cold-brew', 'cappuccino', 'latte-macchiato', 'iced-coffee'].includes(recipe.type)
                ? (recipe.type as any)
                : 'filterkaffee'
            }
            initialPortions={recipe.baseServings}
          />
        </div>
      </div>
    </>
  )
}

