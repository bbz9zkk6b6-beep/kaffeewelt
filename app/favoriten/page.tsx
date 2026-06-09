import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FavoritesList } from '@/components/favorites-list'

export const metadata: Metadata = {
  title: 'Meine Favoriten',
  description:
    'Deine gemerkten Kaffee-Rezepte auf einen Blick – lokal in deinem Browser gespeichert.',
}

export default function FavoritesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Deine Merkliste"
        title="Meine Favoriten"
        description="Alle Rezepte, die du dir gemerkt hast – jederzeit griffbereit."
        breadcrumbs={
          <Breadcrumbs items={[{ name: 'Meine Favoriten' }]} />
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <FavoritesList />
      </div>
    </>
  )
}
