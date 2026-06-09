'use client'

import { useEffect, useMemo, useState } from 'react'
import { Minus, Plus, Beaker, Thermometer, Gauge, Scale } from 'lucide-react'
import { brewMethods, type BrewMethod } from '@/lib/content/brewing'

function formatNumber(value: number, maxDecimals = 0): string {
  return value.toLocaleString('de-DE', { maximumFractionDigits: maxDecimals })
}

function formatGrams(value: number): string {
  // Unter 100 g auf ganze Gramm runden, darüber auf 5 g für glatte Werte
  const rounded = value >= 100 ? Math.round(value / 5) * 5 : Math.round(value)
  return formatNumber(rounded)
}

function formatLiquid(ml: number): { value: string; unit: string } {
  if (ml >= 1000) {
    return { value: formatNumber(ml / 1000, 2), unit: 'l' }
  }
  return { value: formatNumber(Math.round(ml)), unit: 'ml' }
}

export function BrewCalculator({
  initialMethodId,
  initialPortions = 2,
  prefill,
  className,
}: {
  initialMethodId?: BrewMethod['id']
  initialPortions?: number
  // Optionale Übergabe von außen (z. B. aus der Barista-Empfehlung).
  // Ein neuer Wert (über requestId getriggert) aktualisiert Methode + Portionen.
  prefill?: { methodId: BrewMethod['id']; portions: number; requestId: number }
  className?: string
}) {
  const [methodId, setMethodId] = useState<BrewMethod['id']>(
    initialMethodId ?? 'filterkaffee',
  )
  const [portions, setPortions] = useState(initialPortions)

  // Werte aus einer Barista-Empfehlung übernehmen.
  useEffect(() => {
    if (!prefill) return
    setMethodId(prefill.methodId)
    setPortions(prefill.portions)
  }, [prefill])

  const method = useMemo(
    () => brewMethods.find((m) => m.id === methodId) ?? brewMethods[0],
    [methodId],
  )

  const result = useMemo(() => {
    const coffee = method.coffeePerPortion * portions
    const water = method.waterPerPortion
      ? method.waterPerPortion * portions
      : undefined
    const milk = method.milkPerPortion
      ? method.milkPerPortion * portions
      : undefined
    const drink = method.drinkPerPortion
      ? method.drinkPerPortion * portions
      : undefined
    return { coffee, water, milk, drink }
  }, [method, portions])

  const portionLabel =
    portions === 1 ? method.portionUnit[0] : method.portionUnit[1]

  return (
    <div className={className}>
      {/* Methodenauswahl als Tabs */}
      <div
        role="tablist"
        aria-label="Zubereitungsart"
        className="flex flex-wrap gap-2"
      >
        {brewMethods.map((m) => {
          const active = m.id === methodId
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMethodId(m.id)}
              className={
                active
                  ? 'rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors'
                  : 'rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent/15 hover:text-accent'
              }
            >
              {m.label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Eingabe + Eckwerte */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary p-4">
            <span className="text-sm font-medium text-secondary-foreground">
              {method.portionUnit[1]}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPortions((p) => Math.max(1, p - 1))}
                disabled={portions <= 1}
                aria-label="Eine Portion weniger"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="min-w-10 text-center font-serif text-2xl font-bold text-foreground"
                aria-live="polite"
              >
                {portions}
              </span>
              <button
                type="button"
                onClick={() => setPortions((p) => Math.min(99, p + 1))}
                disabled={portions >= 99}
                aria-label="Eine Portion mehr"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-3">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Verhältnis
                </dt>
                <dd className="font-medium text-foreground">{method.ratio}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Mahlgrad
                </dt>
                <dd className="font-medium text-foreground">{method.grind}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Thermometer className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Brühtemperatur
                </dt>
                <dd className="font-medium text-foreground">
                  {method.temperature}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Ergebnis */}
        <div className="flex flex-col gap-4 rounded-2xl bg-secondary/50 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-background p-4 text-center">
              <div className="font-serif text-3xl font-bold text-accent">
                {formatGrams(result.coffee)}
                <span className="text-lg"> g</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                gemahlener Kaffee
              </div>
            </div>

            {result.water !== undefined && (
              <div className="rounded-xl bg-background p-4 text-center">
                <div className="font-serif text-3xl font-bold text-accent">
                  {formatLiquid(result.water).value}
                  <span className="text-lg">
                    {' '}
                    {formatLiquid(result.water).unit}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Wasser</div>
              </div>
            )}

            {result.drink !== undefined && (
              <div className="rounded-xl bg-background p-4 text-center">
                <div className="font-serif text-3xl font-bold text-accent">
                  {formatGrams(result.drink)}
                  <span className="text-lg"> g</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Espresso (Getränk)
                </div>
              </div>
            )}

            {result.milk !== undefined && (
              <div className="rounded-xl bg-background p-4 text-center">
                <div className="font-serif text-3xl font-bold text-accent">
                  {formatLiquid(result.milk).value}
                  <span className="text-lg">
                    {' '}
                    {formatLiquid(result.milk).unit}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Milch</div>
              </div>
            )}

            {method.withIce && (
              <div className="rounded-xl bg-background p-4 text-center">
                <div className="font-serif text-3xl font-bold text-accent">
                  +
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  reichlich Eis
                </div>
              </div>
            )}
          </div>

          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Beaker className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Für {portions} {portionLabel}: {method.hint}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
