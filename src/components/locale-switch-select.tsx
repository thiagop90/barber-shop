'use client'

import { useParams } from 'next/navigation'
import { Locale, useLocale } from 'next-intl'
import { ChangeEvent, ReactNode, useTransition } from 'react'

import { routing, usePathname, useRouter } from '@/i18n/routing'

import { Icons } from './icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'

const localeIcons: Record<Locale, JSX.Element> = {
  pt: <Icons.brasilFlag />,
  en: <Icons.euaFlag />,
}

export default function LocaleSwitcherSelect() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const [isPending, startTransition] = useTransition()

  function onValueChange(nextLocale: string) {
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
      defaultValue={locale}
      onValueChange={onValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="border-neutral-700/50 bg-secondary [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[0px] [&>span_svg]:shrink-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        align="end"
        sideOffset={4}
        className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
      >
        {routing.locales.map((locale) => (
          <>
            <SelectItem key={locale} value={locale}>
              {localeIcons[locale as Locale]}
              {locale === 'pt'
                ? 'Português - Brasil'
                : 'English - United States'}
            </SelectItem>
            <Separator className="my-1.5 last:hidden" />
          </>
        ))}
      </SelectContent>
    </Select>
  )
}
