import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/prisma'

import { BarberShopInfo } from './_components/barbershop-info'
import { ServiceItem } from './_components/service-item'

interface BarberShopDetailsPageProps {
  params: {
    id?: string
  }
}

export async function generateMetadata({
  params,
}: BarberShopDetailsPageProps): Promise<Metadata> {
  const barberShop = await db.barberShop.findFirst({
    where: {
      id: params.id,
    },
  })

  return {
    title: barberShop?.name,
  }
}

export default async function BarberShopDetailsPage({
  params,
}: BarberShopDetailsPageProps) {
  const barberShop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barberShop) {
    redirect('/')
  }

  return (
    <div>
      <BarberShopInfo barberShop={barberShop} />

      <div className="grid gap-3 px-5 py-6 md:grid-cols-2">
        {barberShop.services.map((service) => (
          <ServiceItem
            key={service.id}
            barberShop={barberShop}
            service={service}
          />
        ))}
      </div>
    </div>
  )
}
