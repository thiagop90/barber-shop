import { SearchIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { BarberShopItem } from '@/components/barbershop-item'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { WelcomeHeader } from '@/components/welcome-header'
import { Link } from '@/i18n/routing'
import db from '@/lib/prisma'
import { cn } from '@/lib/utils'

export default async function Home() {
  const [t, session, barbershops] = await Promise.all([
    getTranslations('SearchPage'),
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

  return (
    <div className="space-y-8 px-5 py-8 sm:px-6">
      <div className="space-y-6">
        <WelcomeHeader />

        <Link
          href="/search"
          className="flex h-12 w-full items-center gap-3 rounded-lg border border-input bg-card px-3 py-2 text-sm text-muted-foreground "
        >
          <SearchIcon className="h-5 w-5 text-primary" />
          {t('search')}
        </Link>
      </div>

      {/* <div>
        {confirmedBookings && confirmedBookings.length > 0 && (
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
        )}
      </div> */}

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
