'use client'

import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function NavigationLinks() {
  const t = useTranslations('Header')
  const pathname = usePathname()

  const navigationLinks = [
    { href: '/', label: t('home') },
    { href: '/search', label: t('search') },
    { href: '/appointments', label: t('myAppointments') },
  ]

  return (
    <nav className="hidden gap-5 lg:flex">
      {navigationLinks.map((link, index) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={index}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'text-sm hover:underline hover:underline-offset-4',
              isActive && 'text-primary underline underline-offset-4',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
