import { Scissors } from 'lucide-react'

import { Link } from '@/i18n/routing'

import { AccountMenu } from './account-menu'
import { LocaleSwitcherSelect } from './locale-switch-select'
import { NavigationLinks } from './navigation-link'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="sticky top-0 z-50 mx-auto h-16 w-full border-b bg-card/85 px-5 backdrop-blur-lg sm:px-6">
      <div className="mx-auto flex h-full items-center justify-between">
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Scissors className="text-primary" />
            <h2 translate="no" className="text-xl font-semibold tracking-tight">
              BarberShop
            </h2>
          </Link>

          <Separator
            orientation="vertical"
            className="hidden h-6 lg:inline-flex"
          />

          <NavigationLinks />
        </nav>

        <div className="flex gap-3">
          {/* <ThemeToggle /> */}
          <LocaleSwitcherSelect />
          <div className="hidden lg:block">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  )
}
