import { CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import db from '@/lib/prisma'

import { BookingItem } from './_components/booking-item'

export const metadata = {
  title: 'Agendamentos',
}

export default async function BookingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: session.user.id,
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
        userId: session.user.id,
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
    <div className="space-y-5 px-5 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>

      {confirmedBookings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
            Confirmados
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                isConfirmed={true}
              />
            ))}
          </div>
        </div>
      )}

      {finishedBookings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
            Finalizados
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {finishedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                isConfirmed={false}
              />
            ))}
          </div>
        </div>
      )}

      {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <h1 className="">Nenhum agendamento realizado.</h1>
          <Button asChild className="font-semibold">
            <Link href="/">
              <CalendarDays className="mr-2 h-5 w-5" />
              Agende agora
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
