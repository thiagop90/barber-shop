import { Scissors } from 'lucide-react'
import Link from 'next/link'

import { MenuMobile } from './menu-mobile'
import { Card, CardContent } from './ui/card'

export function Header() {
  return (
    <Card className="sticky top-0 z-50 rounded-none bg-card/75 backdrop-blur">
      <CardContent className="flex h-16 items-center justify-between px-5 py-0">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="text-primary" />
          <h2 className="text-lg font-bold">BarberShop</h2>
        </Link>

        <MenuMobile />
      </CardContent>
    </Card>
  )
}
