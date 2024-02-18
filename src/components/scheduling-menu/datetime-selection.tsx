import { BarberShop, Booking } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'

import { getDayBookings } from '@/actions/get-day-bookings'
import { Button } from '@/components/ui/button'
import { generateDayTimeList } from '@/helpers/hours'

interface DateTimeSelectionProps {
  date: Date | undefined
  selectedHour: string | undefined
  onSelectHour: (time: string) => void
  barberShop: BarberShop
}

export function DateTimeSelection({
  date,
  selectedHour,
  onSelectHour,
  barberShop,
}: DateTimeSelectionProps) {
  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!date) {
      return
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barberShop.id, date)

      setDayBookings(_dayBookings)
    }

    refreshAvailableHours()
  }, [date, barberShop.id])

  const timeList = useMemo(() => {
    if (!date) {
      return []
    }

    return generateDayTimeList(date).map((time) => {
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      return {
        time,
        disabled: !!booking,
      }
    })
  }, [date, dayBookings])

  return (
    <div className="flex gap-3 px-5">
      {timeList.map(({ time, disabled }) => (
        <Button
          variant={selectedHour === time ? 'default' : 'outline'}
          key={time}
          className="rounded-full"
          onClick={() => onSelectHour(time)}
          disabled={disabled}
        >
          {time}
        </Button>
      ))}
    </div>
  )
}
