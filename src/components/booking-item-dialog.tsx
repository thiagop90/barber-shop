'use client'

import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelBooking } from '@/actions/cancel-booking'

import { BookingItemCard } from './booking-item-card'
import { SchedulingMenu } from './scheduling-menu/scheduling-menu'
import { ServiceDetailsContent } from './scheduling-menu/service-details-content'
import { StatusBadge } from './status-badge'
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
} from './ui/alert-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barberShop: true
    }
  }>
}

export function BookingItemDialog({ booking }: BookingItemProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const isBookingConfirmed = isFuture(booking.date)

  async function handleCancelClick() {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)

      setIsOpen(false)
      toast.success('Reserva cancelada com sucesso.')
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <BookingItemCard booking={booking} />

      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-5 text-left">
          <DialogTitle>Informações da reserva</DialogTitle>
        </DialogHeader>

        <div className="mt-5 space-y-4 px-5 transition-all">
          <Card>
            <CardContent className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar>
                  <AvatarImage src={booking.barberShop.imageUrl} />
                </Avatar>

                <div className="space-y-0.5">
                  <h3 className="font-semibold">{booking.barberShop.name}</h3>
                  <h4 className="truncate text-xs text-muted-foreground">
                    {booking.barberShop.address}
                  </h4>
                </div>
              </div>

              <StatusBadge isBookingConfirmed={isBookingConfirmed} />
            </CardContent>
          </Card>

          <ServiceDetailsContent
            selectedHour={format(booking.date, 'HH:mm')}
            date={booking.date}
            service={booking.service}
            barberShop={booking.barberShop}
          />
        </div>

        <DialogFooter className="gap-3 p-5">
          {!isBookingConfirmed && (
            <DialogClose asChild>
              <Button
                variant={isBookingConfirmed ? 'secondary' : 'default'}
                className="w-full"
              >
                Fechar
              </Button>
            </DialogClose>
          )}

          {isBookingConfirmed && (
            <SchedulingMenu
              barberShop={booking.barberShop}
              service={booking.service}
              date={booking.date}
              selectedHour={format(booking.date, 'HH:mm')}
              bookingId={booking.id}
            />
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              {isBookingConfirmed && (
                <Button
                  disabled={isDeleteLoading}
                  variant="destructive"
                  className="w-full"
                >
                  {isDeleteLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cancelando...
                    </>
                  ) : (
                    'Cancelar reserva'
                  )}
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esse agendamento?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row gap-3">
                <AlertDialogCancel className="mt-0 w-full">
                  Voltar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full"
                  onClick={handleCancelClick}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
