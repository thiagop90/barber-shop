import { redirect } from 'next/navigation'

import { BarberShopItem } from '@/components/barbershop-item'
import { Search } from '@/components/search'
import { db } from '@/lib/prisma'

interface BarberShopsPageProps {
  searchParams: {
    search?: string
  }
}

export default async function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  if (!searchParams.search) {
    redirect('/')
  }

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
      <Search
        defaultValues={{
          search: searchParams.search,
        }}
      />

      <h1 className="text-xs font-bold uppercase text-gray-400">
        Resultados para &quot;{searchParams.search}&quot;
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {barberShops.map((barberShop) => (
          <BarberShopItem key={barberShop.id} barberShop={barberShop} />
        ))}
      </div>
    </div>
  )
}
