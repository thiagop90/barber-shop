'use client'

import type { Review } from '@/generated/prisma'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

interface RatingStarsProps {
  reviews?: Review[]
  rating?: number
  showStarsOnly?: boolean
  className?: string
}

export function RatingStars({
  reviews = [],
  rating,
  showStarsOnly = false,
  className,
}: RatingStarsProps) {
  const averageRating =
    rating !== undefined
      ? rating
      : reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.barberShopRating, 0) /
          reviews.length
        : 0

  const roundedAverage = averageRating.toFixed(1)

  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <Icons.star
            key={`full-${index}`}
            className="size-4 fill-yellow-500"
            strokeWidth={0}
          />
        ))}

        {hasHalfStar && (
          <svg width="16" height="16" viewBox="0 0 24 24" className="size-4">
            <defs>
              <clipPath id={`half-clip-${roundedAverage}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <Icons.star
              className="size-4 fill-yellow-500"
              clipPath={`url(#half-clip-${roundedAverage})`}
              style={{ color: '#eab308' }}
              strokeWidth={0}
            />
            <Icons.star
              className="size-4 text-yellow-500"
              style={{ color: '#eab308' }}
              strokeWidth={0}
            />
          </svg>
        )}

        {Array.from({ length: emptyStars }).map((_, index) => (
          <Icons.star
            key={`empty-${index}`}
            className="size-4 fill-muted-foreground text-muted-foreground"
            strokeWidth={0}
          />
        ))}
      </div>

      {!showStarsOnly && (
        <span className="text-sm font-medium text-yellow-500">
          {averageRating > 0 ? roundedAverage : '0.0'}
        </span>
      )}
    </div>
  )
}
