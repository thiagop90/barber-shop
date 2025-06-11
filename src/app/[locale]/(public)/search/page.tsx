import { getTranslations } from 'next-intl/server'

import { BarberShopItem } from '@/components/barbershop-item'
import { WelcomeHeader } from '@/components/welcome-header'
import db from '@/lib/prisma'

import { EmptySearchState } from './components/empty-search-state'
import { NoResultsState } from './components/no-results-state'
import { SearchBar } from './components/search-bar'

export default async function SearchPage(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const [t, searchParams] = await Promise.all([
    getTranslations('SearchPage'),
    props.searchParams,
  ])
  const query = searchParams?.query || ''

  const barbershops = query
    ? await db.barberShop.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              address: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: { reviews: true },
      })
    : []

  return (
    <div className="space-y-6 px-5 py-8 sm:px-6">
      <WelcomeHeader />

      <SearchBar />

      {!query ? (
        <EmptySearchState />
      ) : barbershops.length === 0 ? (
        <NoResultsState query={query} />
      ) : (
        <div className="space-y-3">
          {query && (
            <h3 className="text-xs font-bold uppercase text-muted-foreground">
              {t('showing')} {barbershops.length} {t('resultsFor')} &quot;
              {query}&quot;
            </h3>
          )}

          <div className="grid gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {barbershops.map((item) => (
              <BarberShopItem key={item.id} barbershop={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
