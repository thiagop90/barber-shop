import { CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { BookingItem } from '@/components/booking-item'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'

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
    <div className="space-y-5 px-5 py-6">
      <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>

      {confirmedBookings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
            Confirmados
          </h3>
          <div className="space-y-4">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {finishedBookings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
            Finalizados
          </h3>
          <div className="space-y-4">
            {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <h1 className="">Nenhum agendamento realizado.</h1>
          <Button asChild className="font-semibold">
            <Link href="/barbershops">
              <CalendarDays className="mr-2 h-5 w-5" />
              Agende agora
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
