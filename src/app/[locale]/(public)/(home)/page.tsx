import { SearchIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { EmblaCarousel } from '@/components/carousel/embla-carousel'
import { WelcomeHeader } from '@/components/welcome-header'
import { Link } from '@/i18n/routing'
import db from '@/lib/prisma'

export default async function Home() {
  const [t, session, barbershops] = await Promise.all([
    getTranslations('SearchPage'),
    auth(),
    db.barberShop.findMany({
      include: { reviews: true },
      take: 5,
    }),
  ])

  // const confirmedBookings =
  //   session?.user &&
  //   (await db.booking.findMany({
  //     where: {
  //       userId: (session?.user as any).id,
  //       date: {
  //         gte: new Date(),
  //       },
  //     },
  //     include: {
  //       service: true,
  //       barberShop: true,
  //     },
  //     orderBy: {
  //       date: 'asc',
  //     },
  //   }))

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


          </>
        )}
      </div> */}

      <EmblaCarousel barbershops={barbershops} />
    </div>
  )
}
