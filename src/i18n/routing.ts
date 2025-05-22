import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['pt', 'en'] as const

export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
