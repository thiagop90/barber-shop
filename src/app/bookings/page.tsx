import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BookingItem } from '@/components/booking-item'
import { db } from '@/lib/prisma'

import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: 'Agendamentos',
}

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barberShop: true,
      },
      orderBy: {
        date: 'asc',
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barberShop: true,
      },
    }),
  ])

  return (
    <div className="space-y-6 px-5 py-6">
      <h1 className="text-xl font-bold">Agendamentos</h1>

      <div className="space-y-3">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-sm font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>

      <div className="space-y-3">
        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-sm font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
