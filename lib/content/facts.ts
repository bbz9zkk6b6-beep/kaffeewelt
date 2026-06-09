export interface CoffeeFact {
  title: string
  text: string
}

export const coffeeFacts: CoffeeFact[] = [
  {
    title: 'Espresso hat weniger Koffein',
    text: 'Eine Tasse Filterkaffee enthält oft mehr Koffein als ein einzelner Espresso – weil deutlich mehr Wasser durch mehr Kaffee läuft.',
  },
  {
    title: 'Die perfekte Brühtemperatur',
    text: 'Wasser zwischen 92 und 96 °C holt die meisten Aromen heraus, ohne dass der Kaffee bitter wird.',
  },
  {
    title: 'Frisch gemahlen schmeckt besser',
    text: 'Gemahlener Kaffee verliert sein Aroma innerhalb von Minuten. Wer direkt vor dem Brühen mahlt, schmeckt den Unterschied deutlich.',
  },
  {
    title: 'Kaffee ist ein Steinobst',
    text: 'Die Kaffeebohne ist eigentlich der Kern einer kirschähnlichen Frucht – der sogenannten Kaffeekirsche.',
  },
  {
    title: 'Das goldene Verhältnis',
    text: 'Für ausgewogenen Filterkaffee gilt die Faustregel: etwa 60 g Kaffee auf 1 Liter Wasser.',
  },
  {
    title: 'Blooming lohnt sich',
    text: 'Wenn du frischen Kaffee zuerst kurz mit wenig Wasser benetzt, entweicht CO₂ und die Extraktion wird gleichmäßiger.',
  },
]

// Wählt deterministisch einen Fakt anhand des Kalendertags,
// damit der "Fakt des Tages" pro Tag konsistent bleibt.
export function getFactOfTheDay(): CoffeeFact {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return coffeeFacts[dayOfYear % coffeeFacts.length]
}
