'use server'

import { endOfDay, startOfDay } from 'date-fns'

import { db } from '@/lib/prisma'

export async function getDayBookings(barberShopId: string, date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      barberShopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
