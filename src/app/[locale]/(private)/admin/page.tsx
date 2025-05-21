import type { BarberShop } from '@/generated/prisma'
import db from '@/lib/prisma'

import { BarbershopTable } from './_components/barbershop-table'

export default async function AdminPage() {
  const barbershops = await db.barberShop.findMany({
    include: {
      services: true,
      barbers: true,
    },
  })

  return (
    <div>
      <BarbershopTable barbershops={barbershops} />
    </div>
  )
}
