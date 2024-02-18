import { Scissors } from 'lucide-react'
import Link from 'next/link'

import { AccountMenu } from './account-menu'
import { DynamicTag } from './dynamic-tag'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-card/75 backdrop-blur">
      <div className="flex h-16 items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="text-primary" />
          {/* <h2 className="text-xl font-semibold tracking-tight">The Barber</h2> */}
        </Link>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center gap-5">
          <DynamicTag href="/">Início</DynamicTag>
          <DynamicTag href="/barbershops">Barbearias</DynamicTag>
        </nav>

        <div className="ml-auto">
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
