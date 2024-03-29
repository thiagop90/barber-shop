import { BarberShop, Service } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/helpers/format-currency'

interface ServiceDetailsContentProps {
  service: Service
  date: Date | undefined
  selectedHour: string | undefined
  barberShop: BarberShop
}

export function ServiceDetailsContent({
  service,
  date,
  selectedHour,
  barberShop,
}: ServiceDetailsContentProps) {
  const servicePriceFormatted = formatCurrency(Number(service.price))

  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between font-semibold">
          <h2>{service.name}</h2>
          <h3 className="text-sm">{servicePriceFormatted}</h3>
        </div>

        <Separator orientation="horizontal" />

        {date && (
          <div className="flex justify-between text-sm">
            <h3 className="text-muted-foreground">Data</h3>
            <h3 className="font-medium">
              {format(date, "dd 'de' MMMM", {
                locale: ptBR,
              })}
            </h3>
          </div>
        )}

        {selectedHour && (
          <div className="flex justify-between text-sm">
            <h3 className="text-muted-foreground">Horário</h3>
            <h3 className="font-medium">{selectedHour}</h3>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <h3 className="text-muted-foreground">Barbearia</h3>
          <h3 className="font-medium">{barberShop.name}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
