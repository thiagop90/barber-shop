'use client'

import { useMutation } from '@tanstack/react-query'
import { format, isBefore, setHours, setMinutes, startOfDay } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { Clock } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
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
import { Separator } from '@/components/ui/separator'
import type { Barber, BarberShop, Service } from '@/generated/prisma'
import { useRouter } from '@/i18n/routing'

import { useMediaQuery } from '../../../../../../hooks/use-media-query'
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
  const t = useTranslations('ServiceItem')
  const router = useRouter()
  const locale = useLocale()
  const currentLocale = locale === 'pt' ? ptBR : enUS
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
      router.push('/appointments')
    },
  })

  function isDayUnavailable(date: Date): boolean {
    const weekday = format(date, 'EEEE', {
      locale: currentLocale,
    }).toLowerCase()
    const { open, close } = openingHours[weekday as keyof OpeningHours] || {}
    const today = startOfDay(new Date())

    return !open || !close || isBefore(date, today)
  }

  function SchedulingContent() {
    return (
      <div className="overflow-y-auto">
        <Calendar
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate)
              setSelectedTime(null)
            }
          }}
          className="border-b px-4 pb-4"
          locale={currentLocale}
          disabled={(date) => isDayUnavailable(date)}
        />

        <div className="space-y-5 p-4 sm:pb-0">
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
                {t('warningCard')}
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
          <Button size="sm">{t('schedule')}</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-dvh">
          <DrawerHeader>
            <DrawerTitle>{t('makeReservation')}</DrawerTitle>
          </DrawerHeader>

          <SchedulingContent />

          <DrawerFooter className="flex-row justify-between border-t">
            <DrawerClose asChild>
              <Button variant="outline">{t('cancel')}</Button>
            </DrawerClose>

            <Button
              onClick={() => createBookingFn()}
              disabled={isPending || !selectedBarber || !selectedTime}
            >
              {isPending ? t('saving') : t('confirmReservation')}
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
        <Button size="sm">{t('schedule')}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('makeReservation')}</DialogTitle>
        </DialogHeader>

        <SchedulingContent />

        <DialogFooter className="justify-between border-t p-4">
          <DialogClose asChild>
            <Button variant="outline">{t('cancel')}</Button>
          </DialogClose>
          <Button
            onClick={() => createBookingFn()}
            disabled={isPending || !selectedBarber || !selectedTime}
          >
            {isPending ? t('saving') : t('confirmReservation')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
