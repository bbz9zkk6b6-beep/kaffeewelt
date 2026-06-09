'use client'

import Link from 'next/link'
import { Calculator, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { BrewCalculator } from '@/components/brew-calculator'

export function HomeCalculator() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex flex-col gap-6 p-8 sm:p-10">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            <Calculator className="h-4 w-4" />
            Rezeptmengen-Rechner
          </span>
          <h2 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Wie viel Kaffee brauchst du?
          </h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Berechne die passende Menge für Filterkaffee, Espresso, Cold Brew
            und mehr.
          </p>
        </div>

        <BrewCalculator initialMethodId="filterkaffee" initialPortions={4} />

        <Link
          href="/rezepte"
          className={`${buttonVariants({ size: 'lg' })} w-fit`}
        >
          Passendes Rezept finden
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
