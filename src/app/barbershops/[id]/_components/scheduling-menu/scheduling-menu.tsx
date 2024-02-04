'use client'

import { BarberShop, Service } from '@prisma/client'
import { format, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { saveBooking } from '../../_actions/save-booking'
import { ConfirmationButton } from './confirmation-button'
import { DateTimeSelection } from './datetime-selection'
import { ServiceDetailsContent } from './service-details-content'

interface SchedulingMenuProps {
  barberShop: BarberShop
  service: Service
}

export function SchedulingMenu({ barberShop, service }: SchedulingMenuProps) {
  const { data } = useSession()
  const router = useRouter()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string | undefined>()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleDateClick(date: Date | undefined) {
    setDate(date)
    setSelectedHour(undefined)
  }

  function handleHourClick(time: string) {
    setSelectedHour(time)
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

      await saveBooking({
        serviceId: service.id,
        barberShopId: barberShop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setIsOpen(false)
      setSelectedHour(undefined)
      setDate(undefined)

      toast.success('Reserva realizada com sucesso!', {
        description: format(newDate, "'Data:' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: 'Visualizar',
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" disabled={!data?.user}>
          Reservar
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="border-b p-5 text-left">
          <SheetTitle>Fazer reserva</SheetTitle>
        </SheetHeader>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateClick}
          className="border-b"
          locale={ptBR}
          fromDate={new Date()}
        />

        {date && (
          <ScrollArea className="border-b py-6">
            <DateTimeSelection
              date={date}
              selectedHour={selectedHour}
              onSelectHour={handleHourClick}
              barberShop={barberShop}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        <div className="px-5 py-6">
          <ServiceDetailsContent
            service={service}
            date={date}
            selectedHour={selectedHour}
            barberShop={barberShop}
          />
        </div>

        <SheetFooter className="px-5">
          <ConfirmationButton
            onClick={handleBookingSubmit}
            disabled={!selectedHour || !date || isLoading}
            isLoading={isLoading}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
