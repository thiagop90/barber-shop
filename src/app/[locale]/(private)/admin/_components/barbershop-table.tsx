import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { BarberShop, Prisma } from '@/generated/prisma'

interface BarbershopTableProps {
  barbershops: Prisma.BarberShopGetPayload<{
    include: { services: true; barbers: true }
  }>[]
}

export function BarbershopTable({ barbershops }: BarbershopTableProps) {
  return (
    <div className="mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Barbershops</h1>
      <div className="rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phones</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Barbers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barbershops.map((shop) => (
              <TableRow key={shop.id}>
                <TableCell className="font-medium">{shop.name}</TableCell>
                <TableCell>{shop.address}</TableCell>
                <TableCell>{shop.phone}</TableCell>
                <TableCell>{shop.services.length}</TableCell>
                <TableCell>{shop.barbers.length}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      // onClick={() => openEditModal(shop)}
                      variant="outline"
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </Button>
                    <Link href={`/barbershops/${shop.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-500 text-white hover:bg-gray-600"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
