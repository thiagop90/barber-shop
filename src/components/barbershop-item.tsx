import { Star } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import type { Prisma } from '@/generated/prisma'
import { Link } from '@/i18n/routing'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarberShopItemProps {
  barbershop: Prisma.BarberShopGetPayload<{ include: { reviews: true } }>
}

export function BarberShopItem({ barbershop }: BarberShopItemProps) {
  const t = useTranslations('BarberShopsPage')
  const averageRating =
    barbershop.reviews.length > 0
      ? barbershop.reviews.reduce(
          (sum, review) => sum + review.barberShopRating,
          0,
        ) / barbershop.reviews.length
      : 0

  return (
    <Card className="rounded-2xl">
      <CardContent className="relative grid h-full grid-cols-2 gap-4 p-3 min-[500px]:flex min-[500px]:flex-col">
        <div className="relative aspect-square overflow-hidden rounded-md border">
          <Badge className="absolute left-1 top-1 z-10 gap-1 bg-card/90 px-1.5 backdrop-blur-sm hover:bg-card/75">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-semibold leading-normal text-foreground">
              {averageRating.toFixed(1)}
            </span>
          </Badge>
          <Image
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            sizes="100vw"
            className=" object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col min-[500px]:gap-4">
          <div className="flex-1 space-y-0.5 text-pretty">
            <h2 className="font-semibold">{barbershop.name}</h2>
            <p className="text-sm text-muted-foreground min-[500px]:line-clamp-2 min-[500px]:text-xs">
              {barbershop.address}
            </p>
          </div>

          <Button className="w-full" variant="default">
            <Link href={`/${barbershop.slug}`}>{t('bookNow')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
