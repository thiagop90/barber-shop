import {
  addMinutes,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parse,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { OpeningHours } from '@/@types/opening-hours'
import { getDayBookings } from '@/actions/get-day-bookings'

export async function getTimeSlotsForDate(
  date: Date,
  openingHours: OpeningHours,
  barberId: string,
): Promise<string[]> {
  const weekday = format(date, 'EEEE', { locale: ptBR }).toLowerCase()
  const { open, close } = openingHours[weekday as keyof OpeningHours] || {}

  if (!open || !close) return []

  const now = new Date()
  const start = parse(open, 'HH:mm', date)
  const end = parse(close, 'HH:mm', date)

  if (isSameDay(date, now) && isAfter(now, end)) return []

  const bookings = await getDayBookings(date, barberId)

  const bookedTimes = bookings.map((booking) => format(booking.date, 'HH:mm'))

  const slots: string[] = []
  let current = start
  while (isBefore(current, end)) {
    const formatted = format(current, 'HH:mm')
    const isSlotAvailable =
      (!isSameDay(date, now) || isAfter(current, now)) &&
      !bookedTimes.includes(formatted)

    if (isSlotAvailable) {
      slots.push(formatted)
    }

    current = addMinutes(current, 30)
  }

  return slots
}
