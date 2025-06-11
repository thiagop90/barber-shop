import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { getLocale, getTranslations } from 'next-intl/server'

import { auth } from '@/auth'

import { Icons } from './icons'

export async function WelcomeHeader() {
  const [t, session, locale] = await Promise.all([
    getTranslations('HomePage'),
    auth(),
    getLocale(),
  ])

  const ptLocale = locale === 'pt'
  const enLocale = locale === 'en'

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">
        {session?.user.name
          ? t('hello', {
              name: session?.user.name?.split(' ')[0],
            })
          : t('welcomeVisitor')}
      </h2>
      <div className="flex items-center gap-2">
        <Icons.calendar />
        <p className="text-sm">
          {format(new Date(), ptLocale ? "EEEE, d 'de' MMMM" : 'EEEE, d MMMM', {
            locale: enLocale ? enUS : ptBR,
          })}
        </p>
      </div>
    </div>
  )
}
