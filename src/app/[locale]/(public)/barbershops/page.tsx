import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { BarberShopItem } from '@/components/barbershop-item'
import { Search } from '@/components/search'
import db from '@/lib/prisma'

interface BarberShopsPageProps {
  searchParams: {
    search?: string
  }
}

export const metadata = {
  title: 'Barbearias',
}

export default async function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  const t = await getTranslations('BarberShopsPage')
  const barbershops = await db.barberShop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
    include: { reviews: true },
  })

  return (
    <div className="space-y-5 px-5 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('barbershops')}</h1>
      <Search
        defaultValues={{
          search: searchParams.search ?? '',
        }}
      />

      <div className="space-y-3">
        {searchParams.search && (
          <h3 className="text-xs font-bold uppercase text-muted-foreground">
            {t('showing')} {barbershops.length} {t('resultsFor')} &quot;
            {searchParams.search}&quot;
          </h3>
        )}

        <div className="grid gap-4 min-[500px]:grid-cols-2 md:grid-cols-3">
          {barbershops.map((item) => (
            <BarberShopItem key={item.id} barbershop={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
