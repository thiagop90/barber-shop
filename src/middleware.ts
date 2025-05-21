import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

import { auth } from '@/auth'

import { routing } from './i18n/routing'

const publicRoutes = [{ path: '/', whenAuthenticated: 'next' }] as const

const intlMiddleware = createIntlMiddleware(routing)

function testPathnameRegex(
  routes: ReadonlyArray<{ path: string; whenAuthenticated: string }>,
  pathname: string,
): (typeof routes)[number] | undefined {
  return routes.find(({ path }) =>
    new RegExp(
      `^(/(${routing.locales.join('|')}))?(${path === '/' ? '' : path})/?$`,
      'i',
    ).test(pathname),
  )
}

const authMiddleware = auth((req) => {
  return intlMiddleware(req)
})

export async function middleware(req: NextRequest) {
  const publicRoute = testPathnameRegex(publicRoutes, req.nextUrl.pathname)

  if (publicRoute) {
    return intlMiddleware(req)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (authMiddleware as any)(req)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
