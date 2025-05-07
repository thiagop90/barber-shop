import './globals.css'

import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

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
      <body className={cn('px-5', inter.className)}>
        <SessionProvider session={session}>
          <Header />
          <main className="mx-auto max-w-screen-md">{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
