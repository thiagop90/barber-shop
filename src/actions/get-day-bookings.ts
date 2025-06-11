'use server'

import { endOfDay, startOfDay } from 'date-fns'

import db from '@/lib/prisma'

export async function getDayBookings(date: Date, barberId: string) {
  return db.booking.findMany({
    where: {
      barberId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
    select: {
      date: true,
    },
  })
}
