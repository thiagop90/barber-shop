import { redirect } from 'next/navigation'

import { BarberShopItem } from '@/components/barbershop-item'
import { Search } from '@/components/search'
import { db } from '@/lib/prisma'

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
  const barberShops = await db.barberShop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <div className="space-y-5 px-5 py-6">
      <h1 className="text-3xl font-bold tracking-tight">Barbearias</h1>
      <Search
        defaultValues={{
          search: searchParams.search ?? '',
        }}
      />

      <div className="space-y-3">
        {searchParams.search && (
          <h3 className="text-xs font-bold uppercase text-muted-foreground">
            Exibindo {barberShops.length} resultados para &quot;
            {searchParams.search}&quot;
          </h3>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}
