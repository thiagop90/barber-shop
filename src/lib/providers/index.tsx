import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { auth } from '@/auth'
import { TooltipProvider } from '@/components/ui/tooltip'

import { QueryProvider } from './query-provider'

export async function Providers({ children }: { children: ReactNode }) {
  const session = await auth()

  return (
    <NextIntlClientProvider>
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
