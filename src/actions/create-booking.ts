'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/prisma'

interface SaveBookinngParams {
  date: Date
  barberShopId: string
  serviceId: string
  userId: string
}

export async function createBooking(params: SaveBookinngParams) {
  await db.booking.create({
    data: {
      date: params.date,
      barberShopId: params.barberShopId,
      serviceId: params.serviceId,
      userId: params.userId,
    },
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
