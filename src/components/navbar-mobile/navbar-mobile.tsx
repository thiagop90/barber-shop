'use client'

import { Calendar, HomeIcon, SearchIcon, UserCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function NavBarMobile() {
  const t = useTranslations('Header')
  const pathname = usePathname()

  const navigationLinks = [
    {
      href: '/',
      icon: <HomeIcon strokeWidth="1.75" />,
      label: t('home'),
    },
    {
      href: '/search',
      icon: <SearchIcon strokeWidth="1.75" />,
      label: t('search'),
    },
    {
      href: '/appointments',
      icon: <Calendar strokeWidth="1.75" />,
      label: t('appointments'),
    },
    {
      href: '/profile',
      icon: <UserCircleIcon strokeWidth="1.75" />,
      label: t('profile'),
    },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-screen-sm border-t bg-background/90 backdrop-blur-lg sm:border-x md:max-w-screen-md lg:hidden">
      <div className="flex h-16 justify-center">
        {navigationLinks.map((link, index) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'flex min-w-20 max-w-[168px] flex-1 flex-col items-center justify-center gap-2 px-3',
                isActive
                  ? 'pointer-events-none text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {link.icon}
              <span className="text-xs">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
