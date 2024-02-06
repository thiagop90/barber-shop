import './globals.css'

import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

import AuthProvider from '../providers/auth'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'BarberShop',
    template: '%s | BarberShop',
  },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('dark', inter.className)}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
