import './globals.css'

import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { QueryWrapper } from './query-wrapper'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'BarberShop',
    template: '%s | BarberShop',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <SessionProvider session={session}>
          <QueryWrapper>
            <TooltipProvider>
              <main className="mx-auto min-h-dvh w-full max-w-screen-sm sm:border-x md:max-w-screen-md lg:max-w-screen-lg">
                <Header />
                {children}
              </main>
              <Toaster position="bottom-center" />
            </TooltipProvider>
          </QueryWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
