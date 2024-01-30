import { BarberShop } from '@prisma/client'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star } from 'lucide-react'

interface BarberShopItemProps {
  barberShop: BarberShop
}

export function BarberShopItem({ barberShop }: BarberShopItemProps) {
  return (
    <Card className="min-w-[168px] max-w-[168px] rounded-xl">
      <CardContent className="p-0">
        <div className="relative p-1 pb-0">
          <Badge className="absolute left-2 top-2 z-50 gap-1 bg-[#221C3D]/70 backdrop-blur-sm hover:bg-[#221C3D]/70">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>5,0</span>
          </Badge>
          <Image
            alt={barberShop.name}
            src={barberShop.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="h-[150px] w-full rounded-lg object-cover"
          />
        </div>

        <div className="p-3">
          <h2 className="truncate font-bold">{barberShop.name}</h2>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>

          <Button className="mt-3 w-full" variant="secondary">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
