import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <main>
      <div>{children}</div>
    </main>
  )
}
