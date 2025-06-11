import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Clock, MapPin, Scissors, Trash2 } from 'lucide-react'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/helpers/format-currency'

interface BookingItemProps {
  booking: {
    id: string
    date: Date
    service: {
      name: string
      price: number
      imageUrl: string
    }
    barberShop: {
      name: string
      address: string
      imageUrl: string
    }
  }
  isConfirmed?: boolean
}

export function BookingItem({
  booking,
  isConfirmed = false,
}: BookingItemProps) {
  const formattedDate = format(booking.date, "d 'de' MMMM", { locale: ptBR })
  const formattedTime = format(booking.date, 'HH:mm', { locale: ptBR })

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex">
          {/* Conteúdo principal */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-2">
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <Badge variant={isConfirmed ? 'default' : 'secondary'}>
                  {isConfirmed ? 'Confirmado' : 'Finalizado'}
                </Badge>
              </div>

              {/* Nome do serviço */}
              <div className="flex items-center gap-2">
                <Scissors className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{booking.service.name}</h3>
              </div>

              {/* Nome da barbearia */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {booking.barberShop.name}
                </p>
              </div>

              {/* Data e horário */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formattedDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {formattedTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {formatCurrency(booking.service.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
