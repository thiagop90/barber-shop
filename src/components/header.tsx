import { Scissors } from 'lucide-react'
import Link from 'next/link'

import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-card/75 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-5 py-0">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="text-primary" />
          <h2 className="text-lg font-bold">BarberShop</h2>
        </Link>

        <AccountMenu />
      </div>
    </div>
  )
}
