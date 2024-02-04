import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

import AuthProvider from '../providers/auth'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'BarberShop',
    template: '%s | BarberShop',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} dark`}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
