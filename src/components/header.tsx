import { Scissors } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/routing'

import { AccountMenu } from './account-menu'
import { LocaleSwitcherSelect } from './locale-switch-select'
import { NavigationLink } from './navigation-link'
import { Separator } from './ui/separator'

export async function Header() {
  const t = await getTranslations('Header')

  return (
    <div className="sticky top-0 z-50 mx-auto h-16 w-full border-b bg-card/85 px-5 backdrop-blur-lg sm:px-6 lg:ml-px">
      <div className="mx-auto flex h-full items-center justify-between">
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Scissors className="text-primary" />
            <h2
              translate="no"
              className="hidden text-xl font-semibold tracking-tight sm:block"
            >
              BarberShop
            </h2>
          </Link>

          <Separator orientation="vertical" className="h-6 bg-neutral-700" />

          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/barbershops">
            {t('barbershops')}
          </NavigationLink>
        </nav>

        <div className="flex gap-3">
          <AccountMenu />
          <LocaleSwitcherSelect />
        </div>
      </div>
    </div>
  )
}
