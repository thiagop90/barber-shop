'use client'

import { useMutation } from '@tanstack/react-query'
import { format, isBefore, setHours, setMinutes, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import type { OpeningHours } from '@/@types/opening-hours'
import { createBooking } from '@/actions/create-booking'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Barber, BarberShop, Service } from '@/generated/prisma'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'

import { AvailableTimes } from './available-times'
import { BarberSelector } from './barber-selector'
import { ScheduleSummary } from './schedule-summary'

interface ScheduleDialogProps {
  barberShop: Pick<BarberShop, 'id' | 'name' | 'openingHours' | 'slug'>
  service: Pick<Service, 'id' | 'name' | 'duration' | 'price'>
  barbers: Barber[]
  userId: string
}

export function ScheduleDialog({
  barberShop,
  service,
  barbers,
  userId,
}: ScheduleDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()
  const isMobile = useMediaQuery('(max-width: 640px)')

  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [date, setDate] = useState<Date>(today)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const openingHours = barberShop.openingHours as OpeningHours

  function resetDialogState() {
    setIsOpen(false)
    setSelectedBarber(null)
    setDate(today)
    setSelectedTime(null)
  }

  const { mutateAsync: createBookingFn, isPending } = useMutation({
    mutationFn: async () => {
      if (!selectedBarber || !selectedTime) return

      const [hour, minute] = selectedTime.split(':').map(Number)
      const datetime = setMinutes(setHours(date, hour), minute)

      return createBooking({
        date: datetime,
        barberShopId: barberShop.id,
        barberId: selectedBarber.id,
        serviceId: service.id,
        userId,
      })
    },
    onSuccess: () => {
      toast.success('Reserva criada com sucesso!')
      resetDialogState()
    },
  })

  function isDayUnavailable(date: Date): boolean {
    const weekday = format(date, 'EEEE', { locale: ptBR }).toLowerCase()
    const { open, close } = openingHours[weekday as keyof OpeningHours] || {}
    const today = startOfDay(new Date())

    return !open || !close || isBefore(date, today)
  }

  function SchedulingContent() {
    return (
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate)
              setSelectedTime(null)
            }
          }}
          className="border-b px-5 pb-5 sm:pt-5"
          locale={ptBR}
          disabled={(date) => isDayUnavailable(date)}
        />

        <div className="space-y-5 p-5">
          <BarberSelector
            barbers={barbers}
            selectedBarber={selectedBarber}
            onSelectBarber={setSelectedBarber}
          />

          <Separator />

          {selectedBarber ? (
            <AvailableTimes
              date={date}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              isDisabled={isPending}
              openingHours={openingHours}
              barberId={selectedBarber.id}
            />
          ) : (
            <div className="flex items-center gap-4 rounded-lg bg-card px-4 py-3">
              <Clock className="size-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                Escolha um profissional para buscar os horários disponíveis para
                agendamento.
              </p>
            </div>
          )}

          {selectedBarber && selectedTime && (
            <ScheduleSummary
              barber={selectedBarber}
              service={service}
              date={date}
              selectedTime={selectedTime}
              barberShop={barberShop}
            />
          )}
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <Drawer
        direction="bottom"
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) resetDialogState()
        }}
      >
        <DrawerTrigger asChild>
          <Button size="sm">Reservar</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-dvh">
          <DrawerHeader>
            <DrawerTitle>Fazer reserva</DrawerTitle>
          </DrawerHeader>

          <SchedulingContent />

          <DrawerFooter className="flex-row justify-between border-t">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>

            <Button
              onClick={() => createBookingFn()}
              disabled={isPending || !selectedBarber || !selectedTime}
            >
              {isPending ? 'Salvando...' : 'Confirmar reserva'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetDialogState()
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">Reservar</Button>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0">
        <DialogHeader className="border-b p-5 text-left">
          <DialogTitle>Fazer reserva</DialogTitle>
        </DialogHeader>

        <SchedulingContent />

        <DialogFooter className="justify-between border-t p-5">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => createBookingFn()}
            disabled={isPending || !selectedBarber || !selectedTime}
          >
            {isPending ? 'Salvando...' : 'Confirmar reserva'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
