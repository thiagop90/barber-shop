import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { auth } from '@/auth'
import { TooltipProvider } from '@/components/ui/tooltip'

import { QueryProvider } from './query-provider'

export async function Providers({ children }: { children: ReactNode }) {
  const [messages, session] = await Promise.all([
    await getMessages(),
    await auth(),
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
