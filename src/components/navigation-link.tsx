'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'

import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export function NavigationLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'font-medium hover:underline hover:underline-offset-4',
        isActive && 'text-primary underline underline-offset-4',
      )}
      href={href}
      {...rest}
    />
  )
}
