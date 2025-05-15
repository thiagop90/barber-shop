import { Scissors } from 'lucide-react'
import Link from 'next/link'

import { AccountMenu } from './account-menu'
import { DynamicTag } from './dynamic-tag'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="sticky top-0 z-50 mx-auto h-16 w-full border-b bg-card/85 px-5 backdrop-blur-lg sm:px-6 lg:ml-px">
      <div className="mx-auto flex h-full items-center justify-between">
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Scissors className="text-primary" />
            <h2 className="hidden text-xl font-semibold tracking-tight sm:block">
              BarberShop
            </h2>
          </Link>

          <Separator orientation="vertical" className="h-6 bg-neutral-700" />

          <DynamicTag href="/">Início</DynamicTag>
          <DynamicTag href="/barbershops">Barbearias</DynamicTag>
        </nav>

        <AccountMenu />
      </div>
    </div>
  )
}
