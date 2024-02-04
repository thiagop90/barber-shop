import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'

import { BarberShopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { db } from '@/lib/prisma'

import { authOptions } from '../api/auth/[...nextauth]/route'

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
    <div className="space-y-8 p-5">
      <div>
        <div className="mb-6 space-y-0.5">
          <h2 className="text-xl font-bold">
            Olá,{' '}
            {session?.user ? session.user.name?.split(' ')[0] : 'Visitante'}!
          </h2>
          <p className="text-sm">
            {format(new Date(), "EEEE, d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <Search />
      </div>

      <div>
        {confirmedBookings.length > 0 && (
          <>
            <h3 className="mb-3 text-xs font-bold uppercase text-gray-400">
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h3>

        <ScrollArea className="-mx-5">
          <div className="mb-4 flex gap-4 px-5">
            {barberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
