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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={!data?.user}>
          Reservar
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-5 text-left">
          <DialogTitle>Fazer reserva</DialogTitle>
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
          <ConfirmationButton
            onClick={handleBookingSubmit}
            disabled={!selectedHour || !date || isLoading}
            isLoading={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
