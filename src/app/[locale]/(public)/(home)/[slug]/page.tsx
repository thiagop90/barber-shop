import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { auth } from '@/auth'
import { Icons } from '@/components/icons'
import { RatingStars } from '@/components/rating-star'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import db from '@/lib/prisma'

import { BackButton } from './_components/back-button'
import { BarberShopDetails } from './_components/barbershop-details'
import { BarberShopReview } from './_components/barbershop-reviews'
import { ServiceItem } from './_components/service-item'

interface BarberShopDetailsPageProps {
  params: {
    slug?: string
  }
}

export async function generateMetadata({
  params,
}: BarberShopDetailsPageProps): Promise<Metadata> {
  const barberShop = await db.barberShop.findFirst({
    where: {
      slug: params.slug,
    },
  })

  return {
    title: barberShop?.name,
  }
}

export default async function BarberShopDetailsPage({
  params,
}: BarberShopDetailsPageProps) {
  const t = await getTranslations('BarberShopsPage')
  const barberShop = await db.barberShop.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      barbers: true,
      services: true,
      reviews: { include: { user: true } },
    },
  })

  if (!barberShop) {
    redirect('/')
  }

  return (
    <div className="">
      <div className="relative aspect-video max-h-[350px] w-full overflow-hidden border-b">
        <Image
          alt={barberShop.name}
          src={barberShop.imageUrl}
          className="object-cover"
          fill
        />

        <BackButton />

        <div className="absolute inset-0 bottom-0 bg-black to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <div className="space-y-0.5">
            <RatingStars reviews={barberShop.reviews} />
            <h1 className="text-2xl font-bold text-white">{barberShop.name}</h1>
            <p className="text-pretty text-sm text-muted-foreground">
              {barberShop.address}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="services">
        <TabsList className="sticky top-16 z-50 w-full">
          <TabsTrigger value="services">{t('services')}</TabsTrigger>
          <TabsTrigger value="details">{t('details')}</TabsTrigger>
          <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
          {/* <TabsTrigger value="reviews">Profissionais</TabsTrigger> */}
        </TabsList>
        <TabsContent value="services">
          <div className="grid gap-4 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            {barberShop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barberShop={barberShop}
                service={service}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="details" className="px-5 sm:px-6 lg:px-8">
          <BarberShopDetails barberShop={barberShop} />
        </TabsContent>
        <TabsContent
          value="reviews"
          className="grid gap-4 px-5 sm:px-6 md:grid-cols-2 lg:px-8"
        >
          <BarberShopReview reviews={barberShop.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
