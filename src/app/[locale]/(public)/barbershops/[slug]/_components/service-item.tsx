import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { AccessAccount } from '@/components/access-account'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Prisma, Service } from '@/generated/prisma'
import { formatCurrency } from '@/helpers/format-currency'

import { ScheduleDialog } from './schedule-dialog'

interface ServiceItemProps {
  barberShop: Prisma.BarberShopGetPayload<{
    include: { services: true; barbers: true }
  }>
  service: Service
}

export async function ServiceItem({ barberShop, service }: ServiceItemProps) {
  const t = await getTranslations('ServiceItem')
  const session = await auth()
  const userId = session?.user.id
  const servicePriceFormatted = formatCurrency(service.price)

  return (
    <Card className="h-auto">
      <CardContent className="flex gap-4 p-2">
        <Image
          alt={service.name}
          src={service.imageUrl}
          width={110}
          height={110}
          className="rounded-md border object-contain"
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

            {userId ? (
              <ScheduleDialog
                barbers={barberShop.barbers}
                barberShop={barberShop}
                service={service}
                userId={userId}
              />
            ) : (
              <AccessAccount>
                <Button size="sm">{t('schedule')}</Button>
              </AccessAccount>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
