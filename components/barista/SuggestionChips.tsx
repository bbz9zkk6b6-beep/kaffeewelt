'use client'

const SUGGESTIONS = [
  'Ich bekomme Besuch',
  'Mein Espresso schmeckt bitter',
  'Was ist Crema?',
  'Ich möchte Cold Brew machen',
  'Ich habe eine French Press',
  'Was bedeutet Blooming?',
]

export function SuggestionChips({
  onSelect,
  disabled,
}: {
  onSelect: (value: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(s)}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
