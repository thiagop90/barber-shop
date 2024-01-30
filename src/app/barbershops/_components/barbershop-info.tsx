import { Button } from '@/components/ui/button'
import { BarberShop } from '@prisma/client'
import { MapPin, Menu, Star } from 'lucide-react'
import Image from 'next/image'
import { ButtonBack } from './button-back'

interface BarberShopInfoProps {
  barberShop: BarberShop
}

export function BarberShopInfo({ barberShop }: BarberShopInfoProps) {
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <ButtonBack />

        <Button
          variant="outline"
          size="icon"
          className="absolute right-5 top-5 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Image
          alt={barberShop.name}
          src={barberShop.imageUrl}
          className="object-cover opacity-75"
          fill
        />
      </div>

      <div className="p-5">
        <div>
          <h1 className="mb-3 text-xl font-bold">{barberShop.name}</h1>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <p className="text-sm">{barberShop.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <p className="text-sm">5,0 (590 avaliações)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
