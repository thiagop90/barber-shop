import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between font-semibold">
          <h2>{service.name}</h2>
          <h3 className="text-sm">{formatCurrency(service.price)}</h3>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">Barbearia</h3>
          <h3 className="font-medium">{barberShop.name}</h3>
        </div>

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">Data</h3>
          <h3 className="font-medium">
            {format(date, "dd 'de' MMMM", {
              locale: ptBR,
            })}{' '}
            <span>às {selectedTime}</span>
          </h3>
        </div>

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">Barbeiro</h3>
          <h3 className="font-medium">{barber.name}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
