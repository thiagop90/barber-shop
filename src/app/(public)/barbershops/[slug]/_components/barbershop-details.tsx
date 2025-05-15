import { Icons } from '@/components/icons'
import type { BarberShop } from '@/generated/prisma'

import { BarberShopOpeningHours } from './barbershop-opening-hours'
import { CopyToClipboard } from './copy-to-clipboard'

interface BarberShopDetailsProps {
  barberShop: Pick<BarberShop, 'address' | 'phone' | 'openingHours'>
}

export function BarberShopDetails({ barberShop }: BarberShopDetailsProps) {
  return (
    <div className="divide-y overflow-hidden rounded-lg border bg-card/60">
      <CopyToClipboard text={barberShop.address} textTooltip="Copiar endereço">
        <Icons.mapPin />
        {barberShop.address}
      </CopyToClipboard>

      <CopyToClipboard
        text={barberShop.phone}
        textTooltip="Copiar número de telefone"
      >
        <Icons.phone />
        {barberShop.phone}
      </CopyToClipboard>

      <BarberShopOpeningHours openingHours={barberShop.openingHours} />
    </div>
  )
}
