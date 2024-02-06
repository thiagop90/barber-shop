import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { BarberShopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/prisma'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barberShops, confirmedBookings] = await Promise.all([
    db.barberShop.findMany({}),
    session?.user
      ? db.booking.findMany({
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
        })
      : Promise.resolve([]),
  ])

  return (
    <div className="space-y-8 px-5 py-6">
      <div>
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Olá,{' '}
            {session?.user ? session.user.name?.split(' ')[0] : 'Visitante'}!
          </h1>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <p className="text-sm">
              {format(new Date(), "EEEE, d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <Search />
      </div>

      <div>
        {confirmedBookings.length > 0 && (
          <>
            <h3 className="mb-3 text-xs font-bold uppercase text-muted-foreground">
              Agendamentos
            </h3>

            <ScrollArea className="-mx-5">
              <div className="mb-4 flex gap-4 px-5">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    className="w-full min-w-[340px]"
                    key={booking.id}
                    booking={booking}
                  />
                ))}
              </div>
              <ScrollBar className="px-5" orientation="horizontal" />
            </ScrollArea>
          </>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase text-muted-foreground">
          Recomendados
        </h3>

        <ScrollArea className="-mx-5">
          <div className="mb-4 flex gap-4 px-5">
            {barberShops.map((barberShop) => (
              <BarberShopItem
                className="min-w-[200px] max-w-[200px]"
                key={barberShop.id}
                barberShop={barberShop}
              />
            ))}
          </div>
          <ScrollBar className="px-5" orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
