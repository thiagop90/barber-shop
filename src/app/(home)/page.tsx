import { BarberShopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Search } from '@/components/search'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { db } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function Home() {
  const barberShops = await db.barberShop.findMany({})

  return (
    <div className="space-y-8 p-5">
      <div>
        <div className="mb-6 space-y-0.5">
          <h2 className="text-xl font-bold">Olá, Thiago!</h2>
          <p className="text-sm">
            {format(new Date(), "EEEE, d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <Search />
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h3>

        <BookingItem />
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
