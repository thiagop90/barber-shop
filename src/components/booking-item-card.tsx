import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Prisma } from '@/generated/prisma'

import { StatusBadge } from './status-badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { Card, CardContent } from './ui/card'
import { DialogTrigger } from './ui/dialog'

interface BookingItemCardProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barberShop: true
    }
  }>
}

export function BookingItemCard({ booking }: BookingItemCardProps) {
  const isBookingConfirmed = isFuture(booking.date)

  return (
    <DialogTrigger asChild>
      <Card className="cursor-pointer">
        <CardContent className="flex justify-between p-0">
          <div className="w-[70%] space-y-3 p-4">
            <StatusBadge isBookingConfirmed={isBookingConfirmed} />

            <div className="space-y-2">
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barberShop.imageUrl} />
                </Avatar>

                <span className="text-sm">{booking.barberShop.name}</span>
              </div>
            </div>
          </div>

          <div className="flex w-[30%] flex-col items-center justify-center gap-0.5 border-l">
            <p className="text-sm capitalize">
              {format(booking.date, 'MMMM', {
                locale: ptBR,
              })}
            </p>
            <h2 className="text-2xl font-medium">
              {format(booking.date, 'dd')}
            </h2>
            <span className="text-sm text-primary">
              {format(booking.date, 'HH:mm')}
            </span>
          </div>
        </CardContent>
      </Card>
    </DialogTrigger>
  )
}
