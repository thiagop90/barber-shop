import './globals.css'

import { Viewport } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/lib/providers'
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
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <Providers>
          <main className="mx-auto min-h-dvh w-full max-w-screen-sm sm:border-x md:max-w-screen-md lg:max-w-screen-lg">
            <Header />
            {children}
          </main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className:
                'p-4 bg-primary border-0 text-primary-foreground rounded-lg w-full max-h-[63px] shadow-inner',
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
