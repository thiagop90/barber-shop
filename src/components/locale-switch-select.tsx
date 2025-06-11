'use client'

import { useParams } from 'next/navigation'
import { Locale, useLocale } from 'next-intl'
import { useTransition } from 'react'

import { routing, usePathname, useRouter } from '@/i18n/routing'

import { Icons } from './icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const LOCALE_CONFIG: Record<
  Locale,
  {
    label: string
    icon: JSX.Element
    shortLabel: string
  }
> = {
  pt: {
    label: 'Português - Brasil',
    icon: <Icons.brasilFlag />,
    shortLabel: 'PT-BR',
  },
  en: {
    label: 'English - United States',
    icon: <Icons.euaFlag />,
    shortLabel: 'EN-US',
  },
}

export function LocaleSwitcherSelect() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const [isPending, startTransition] = useTransition()

  const currentLocaleConfig = LOCALE_CONFIG[locale as Locale]

  function handleLocaleChange(nextLocale: string) {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale as Locale },
      )
    })
  }

  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange}
      disabled={isPending}
    >
      <SelectTrigger
        className="border-neutral-700/50 bg-secondary"
        // aria-label={t('switchLanguage') || 'Switch language'}
      >
        <SelectValue asChild>
          <div className="mr-2 flex items-center gap-2">
            <span className="shrink-0" aria-hidden="true">
              {currentLocaleConfig.icon}
            </span>
            <span className="text-sm">{currentLocaleConfig.shortLabel}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        sideOffset={4}
        className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
      >
        {routing.locales.map((localeOption) => {
          const config = LOCALE_CONFIG[localeOption as Locale]

          return (
            <SelectItem key={localeOption} value={localeOption}>
              {config.icon}
              {config.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
