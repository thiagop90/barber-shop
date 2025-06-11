import { routing } from '@/i18n/routing'

import messages from './messages/pt.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
