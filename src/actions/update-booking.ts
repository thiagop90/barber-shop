'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/prisma'

interface UpdateBookingParams {
  bookingId: string
  date?: Date
  barberShopId?: string
  serviceId?: string
  userId?: string
}

export async function updateBooking(params: UpdateBookingParams) {
  const { bookingId, ...updateData } = params

  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: updateData,
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
