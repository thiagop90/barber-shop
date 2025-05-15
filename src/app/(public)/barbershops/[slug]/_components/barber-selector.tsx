'use client'

import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { Barber } from '@/generated/prisma'
import { cn } from '@/lib/utils'

interface BarberSelectorProps {
  barbers: Barber[]
  selectedBarber: Barber | null
  onSelectBarber: (barber: Barber) => void
}

export function BarberSelector({
  barbers,
  selectedBarber,
  onSelectBarber,
}: BarberSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm">Selecione um profissional</p>
      <div className="flex gap-5">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelectBarber(barber)}
            className={cn(
              'flex flex-col items-center gap-4 text-center',
              selectedBarber?.id === barber.id ? 'pointer-events-none' : '',
            )}
          >
            <Avatar className="overflow-visible">
              <AvatarFallback>
                <Skeleton className="size-full" />
              </AvatarFallback>
              <AvatarImage
                src={barber.imageUrl ?? ''}
                alt={barber.name}
                className={cn(
                  'select-none rounded-full ring-offset-background',
                  selectedBarber?.id === barber.id &&
                    'ring-2 ring-primary ring-offset-2',
                )}
              />
            </Avatar>

            <span
              className={cn(
                'text-xs',
                selectedBarber?.id === barber.id
                  ? 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {barber.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
