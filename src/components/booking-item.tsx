'use client'

import { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelBooking } from '@/actions/cancel-booking'
import { ServiceDetailsContent } from '@/app/barbershops/[id]/_components/scheduling-menu/service-details-content'
import { cn } from '@/lib/utils'

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barberShop: true
    }
  }>
  className?: string
}

export function BookingItem({ className, booking }: BookingItemProps) {
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Card className={cn('cursor-pointer', className)}>
          <CardContent className="flex justify-between p-0">
            <div className="space-y-3 p-4">
              <StatusBadge isBookingConfirmed={isBookingConfirmed} />

              <div className="space-y-2">
                <h2 className="font-semibold">{booking.service.name}</h2>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={booking.barberShop.imageUrl} />
                  </Avatar>

                  <span className="text-sm">{booking.barberShop.name}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 border-l px-4">
              <p className="text-sm capitalize">
                {format(booking.date, 'MMMM', {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl font-medium">
                {format(booking.date, 'dd')}
              </p>
              <p className="text-sm text-primary">
                {format(booking.date, 'hh:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className=" p-0">
        <SheetHeader className="border-b p-5 text-left">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 h-[180px] w-full">
          <Image
            alt={booking.barberShop.name}
            src="/barbershop-map.png"
            fill
            className=""
          />

          <Card className="absolute inset-x-5 bottom-5">
            <CardContent className="flex gap-2 p-3">
              <Avatar>
                <AvatarImage src={booking.barberShop.imageUrl} />
              </Avatar>

              <div>
                <h2 className="font-bold">{booking.barberShop.name}</h2>
                <h3 className="truncate text-xs">
                  {booking.barberShop.address}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 px-5 py-6">
          <StatusBadge isBookingConfirmed={isBookingConfirmed} />

          <ServiceDetailsContent
            selectedHour={format(booking.date, 'hh:mm')}
            date={booking.date}
            service={booking.service}
            barberShop={booking.barberShop}
          />

          <SheetFooter className="flex-row gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed}
                  variant="destructive"
                  className="w-full"
                >
                  Cancelar Reserva
                </Button>
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
                    disabled={isDeleteLoading}
                  >
                    {isDeleteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cancelando...
                      </>
                    ) : (
                      'Confirmar'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
