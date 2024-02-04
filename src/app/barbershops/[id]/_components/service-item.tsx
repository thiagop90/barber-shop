import { BarberShop, Service } from '@prisma/client'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/helpers/format-currency'

import { SchedulingMenu } from './scheduling-menu/scheduling-menu'

interface ServiceItemProps {
  barberShop: BarberShop
  service: Service
}

export function ServiceItem({ barberShop, service }: ServiceItemProps) {
  const servicePriceFormatted = formatCurrency(Number(service.price))

  return (
    <Card>
      <CardContent className="flex gap-4 p-3">
        <Image
          alt={service.name}
          src={service.imageUrl}
          width={110}
          height={110}
          className="rounded-lg object-contain"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {servicePriceFormatted}
            </p>

            <SchedulingMenu barberShop={barberShop} service={service} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
