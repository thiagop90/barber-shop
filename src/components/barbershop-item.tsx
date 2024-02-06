import { BarberShop } from '@prisma/client'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarberShopItemProps {
  barberShop: BarberShop
  className?: string
}

export function BarberShopItem({ className, barberShop }: BarberShopItemProps) {
  return (
    <Card className={cn('h-full w-full', className)}>
      <CardContent className="space-y-1.5 p-1.5">
        <div className="relative overflow-hidden rounded-sm border">
          <Badge className="absolute left-2 top-2 z-50 gap-1 bg-card/75 backdrop-blur-sm hover:bg-card/75">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-semibold leading-normal text-foreground">
              5,0
            </span>
          </Badge>
          <Image
            alt={barberShop.name}
            src={barberShop.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="h-[180px] w-full  object-cover"
          />
        </div>

        <div className="">
          <h2 className="truncate font-semibold">{barberShop.name}</h2>
          <p className="truncate text-sm text-muted-foreground">
            {barberShop.address}
          </p>

          <Button asChild className="mt-3 w-full" variant="secondary">
            <Link href={`/barbershops/${barberShop.id}`}>Agende agora</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
