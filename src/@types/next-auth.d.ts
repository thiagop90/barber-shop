import { type DefaultSession } from 'next-auth'

import { UserRole } from '@/generated/prisma'

declare module 'next-auth' {
  interface User {
    username?: string | null
    role?: UserRole
    isFirstAuthentication?: boolean
  }

  interface Session {
    user: User & DefaultSession['user']
  }
}
