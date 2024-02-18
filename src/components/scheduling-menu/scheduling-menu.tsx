'use client'

import { BarberShop, Service } from '@prisma/client'
import { format, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { createBooking } from '@/actions/create-booking'
import { updateBooking } from '@/actions/update-booking'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { DateTimeSelection } from './datetime-selection'
import { ServiceDetailsContent } from './service-details-content'

interface SchedulingMenuProps {
  barberShop: BarberShop
  service: Service
  date?: Date
  selectedHour?: string
  bookingId?: string
}

export function SchedulingMenu({
  barberShop,
  service,
  date: initialDate,
  selectedHour: initialSelectedHour,
  bookingId,
}: SchedulingMenuProps) {
  const { data } = useSession()
  const router = useRouter()

  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(
    initialSelectedHour,
  )
  const [changesMade, setChangesMade] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setDate(initialDate)
    setSelectedHour(initialSelectedHour)
    setChangesMade(false)
  }, [initialDate, initialSelectedHour])

  function handleDateClick(date: Date | undefined) {
    setDate(date)
    setSelectedHour(undefined)
    setChangesMade(true)
  }

  function handleHourClick(time: string) {
    setSelectedHour(time)
    setChangesMade(true)
  }

  async function handleBookingSubmit() {
    setIsLoading(true)

    try {
      if (!selectedHour || !date || !data?.user) {
        return
      }

      const dateHour = Number(selectedHour.split(':')[0])
      const dateMinutes = Number(selectedHour.split(':')[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      const bookingParams = {
        serviceId: service.id,
        barberShopId: barberShop.id,
        date: newDate,
        userId: (data.user as any).id,
      }

      if (bookingId) {
        await updateBooking({ bookingId, ...bookingParams })
      } else {
        await createBooking(bookingParams)
      }

      setIsOpen(false)
      setSelectedHour(undefined)
      setDate(undefined)
      setChangesMade(false)

      toast.success(
        `Reserva ${bookingId ? 'editada' : 'realizada'} com sucesso!`,
        {
          description: format(newDate, "'Data:' dd 'de' MMMM 'às' HH':'mm'.'", {
            locale: ptBR,
          }),
          action: {
            label: 'Visualizar',
            onClick: () => router.push('/bookings'),
          },
        },
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="secondary">
          {bookingId ? 'Editar reserva' : 'Reservar'}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-5 text-left">
          <DialogTitle>{bookingId ? 'Editar' : 'Fazer'} reserva</DialogTitle>
        </DialogHeader>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateClick}
          className="border-b"
          locale={ptBR}
          fromDate={new Date()}
        />

        {date && (
          <ScrollArea className="border-b py-4">
            <DateTimeSelection
              date={date}
              selectedHour={selectedHour}
              onSelectHour={handleHourClick}
              barberShop={barberShop}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        <DialogFooter className="flex flex-col gap-4 p-5">
          <ServiceDetailsContent
            service={service}
            date={date}
            selectedHour={selectedHour}
            barberShop={barberShop}
          />

          <Button
            onClick={handleBookingSubmit}
            disabled={!selectedHour || !date || isLoading || !changesMade}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reservando...
              </>
            ) : (
              <>{bookingId ? 'Editar' : 'Confirmar'} reserva</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
