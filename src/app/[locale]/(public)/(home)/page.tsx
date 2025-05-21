import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { BarberShopItem } from '@/components/barbershop-item'
import { Icons } from '@/components/icons'
import { Search } from '@/components/search'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import db from '@/lib/prisma'
import { cn } from '@/lib/utils'

export default async function Home() {
  const [t, locale, session, barbershops] = await Promise.all([
    getTranslations('HomePage'),
    getLocale(),
    auth(),
    db.barberShop.findMany({
      include: { reviews: true },
    }),
  ])

  const confirmedBookings =
    session?.user &&
    (await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
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
    }))

  const ptLocale = locale === 'pt'
  const enLocale = locale === 'en'

  return (
    <div className="space-y-8 px-5 py-8 sm:px-6">
      <div>
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('hello', {
              name: session?.user.name?.split(' ')[0] ?? 'Visitante',
            })}
          </h1>
          <div className="flex items-center gap-2">
            <Icons.calendar />
            <p className="text-sm">
              {format(
                new Date(),
                ptLocale ? "EEEE, d 'de' MMMM" : 'EEEE, d MMMM',
                {
                  locale: enLocale ? enUS : ptBR,
                },
              )}
            </p>
          </div>
        </div>

        <Search />
      </div>

      <div>
        {/* {confirmedBookings && confirmedBookings.length > 0 && (
          <>
            <h3 className="mb-3 text-xs font-bold uppercase text-muted-foreground">
              Agendamentos
            </h3>

            <Carousel
              opts={{
                align: 'start',
              }}
              className="-mx-5"
            >
              {confirmedBookings?.map((booking) => (
                <CarouselItem
                  key={booking.id}
                  className={cn(
                    confirmedBookings?.length > 1 && 'max-w-[340px]',
                  )}
                >
                  <BookingItemDialog booking={booking} />
                </CarouselItem>
              ))}
              <CarouselContent></CarouselContent>
            </Carousel>
          </>
        )} */}
      </div>

      <div className="">
        <h3 className="mb-3 text-xs font-bold uppercase text-muted-foreground">
          Recomendados
        </h3>

        <div className="grid gap-4 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {barbershops.map((item) => (
            <BarberShopItem key={item.id} barbershop={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
