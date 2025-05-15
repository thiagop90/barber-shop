import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { Prisma } from '@/generated/prisma'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarberShopItemProps {
  barbershop: Prisma.BarberShopGetPayload<{ include: { reviews: true } }>
}

export function BarberShopItem({ barbershop }: BarberShopItemProps) {
  const averageRating =
    barbershop.reviews.length > 0
      ? barbershop.reviews.reduce(
          (sum, review) => sum + review.barberShopRating,
          0,
        ) / barbershop.reviews.length
      : 0

  return (
    <Card className="">
      <CardContent className="relative grid h-full grid-cols-2 gap-3 p-2 min-[500px]:flex min-[500px]:flex-col">
        <Badge className="absolute left-3 top-3 z-10 gap-1 bg-card/90 px-1.5 backdrop-blur-sm hover:bg-card/75">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="font-semibold leading-normal text-foreground">
            {averageRating.toFixed(1)}({barbershop.reviews.length})
          </span>
        </Badge>
        <div className="relative aspect-square overflow-hidden rounded-sm border">
          <Image
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            sizes="100vw"
            className=" object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col min-[500px]:gap-3">
          <div className="flex-1 text-pretty">
            <h2 className="font-semibold">{barbershop.name}</h2>
            <p className="text-sm text-muted-foreground">
              {barbershop.address}
            </p>
          </div>

          <Button asChild className="w-full" variant="default">
            <Link href={`/barbershops/${barbershop.slug}`}>Reserve agora</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
