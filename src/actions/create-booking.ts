'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/prisma'

interface CreateBookingParams {
  date: Date
  barberShopId: string
  barberId: string
  serviceId: string
  userId: string
}

export async function createBooking({
  date,
  barberId,
  barberShopId,
  serviceId,
  userId,
}: CreateBookingParams) {
  await db.booking.create({
    data: {
      date,
      barberShopId,
      barberId,
      serviceId,
      userId,
    },
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
