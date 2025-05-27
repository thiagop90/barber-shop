import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type Barber, BarberShop, Service } from '@/generated/prisma'
import { formatCurrency } from '@/helpers/format-currency'

interface ServiceDetailsContentProps {
  barber: Barber
  service: Pick<Service, 'name' | 'price'>
  date: Date
  selectedTime: string
  barberShop: Pick<BarberShop, 'name'>
}

export function ScheduleSummary({
  service,
  date,
  barber,
  selectedTime,
  barberShop,
}: ServiceDetailsContentProps) {
  const locale = useLocale()
  const currentLocale = locale === 'pt' ? ptBR : enUS
  const t = useTranslations('ServiceItem')

  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between font-semibold">
          <h2>{service.name}</h2>
          <h3 className="text-sm">{formatCurrency(service.price)}</h3>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">{t('barberShop')}</h3>
          <h3 className="font-medium">{barberShop.name}</h3>
        </div>

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">{t('date')}</h3>
          <h3 className="font-medium">
            {locale === 'pt' ? (
              <>
                {format(date, "dd 'de' MMMM", {
                  locale: currentLocale,
                })}
                <span> às {selectedTime}</span>
              </>
            ) : (
              <>
                {format(date, 'dd MMMM', {
                  locale: currentLocale,
                })}
                <span>, {selectedTime}</span>
              </>
            )}
          </h3>
        </div>

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">{t('barber')}</h3>
          <h3 className="font-medium">{barber.name}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
