'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState, useTransition } from 'react'

import { setUserLocale } from '@/i18n/locale'
import { Link, type Locale, usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { Button, buttonVariants } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const locales: {
  locale: Locale
  label: string
  icon: string
}[] = [
  { locale: 'pt', label: 'Português', icon: 'br' },
  { locale: 'en', label: 'English', icon: 'us' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'pt' : 'en'
  const pathname = usePathname()

  const searchParams = useSearchParams()

  const allParams = searchParams.toString()
  const newPathname = `${pathname}${allParams ? `?${allParams}` : ''}`

  const [open, setOpen] = useState(false)

  return (
    <Link
      href={newPathname}
      locale={otherLocale}
      // className={cn(
      //   buttonVariants({ variant: 'ghost', size: 'icon' }),
      //   'size-10',
      //   className,
      // )}
    >
      {locale === 'pt' && 'pt'}
      {locale === 'en' && 'en'}
    </Link>
  )
}
