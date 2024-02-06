'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FilterItemProps = LinkProps & {
  children: ReactNode
}

export function DynamicTag({ href, children }: FilterItemProps) {
  const pathname = usePathname()
  const active = pathname === href
  const DynamicTag = active ? 'p' : Link

  return (
    <DynamicTag
      className={cn('font-medium hover:underline hover:underline-offset-4', {
        'text-primary underline underline-offset-4': active,
      })}
      href={href}
    >
      {children}
    </DynamicTag>
  )
}
