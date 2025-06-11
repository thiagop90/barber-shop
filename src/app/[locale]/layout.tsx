import './globals.css'

import { Viewport } from 'next'
import { Sora } from 'next/font/google'

import { Header } from '@/components/header'
import { NavBarMobile } from '@/components/navbar-mobile/navbar-mobile'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'

const sora = Sora({
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
      <body className={cn(sora.className)}>
        <Providers>
          <main className="mx-auto min-h-dvh w-full max-w-screen-sm sm:border-x md:max-w-screen-md lg:max-w-screen-lg">
            <Header />
            <div className="mb-16 lg:mb-0">{children}</div>
            <NavBarMobile />
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
