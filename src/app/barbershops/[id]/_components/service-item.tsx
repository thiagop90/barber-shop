import { BarberShop, Service } from '@prisma/client'
import Image from 'next/image'

import { SchedulingMenu } from '@/components/scheduling-menu/scheduling-menu'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/helpers/format-currency'

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

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h2 className="font-semibold">{service.name}</h2>
            <p className="text-xs text-muted-foreground">
              {service.description}
            </p>
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
