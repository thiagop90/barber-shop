import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { RatingStars } from '@/components/rating-star'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { Prisma } from '@/generated/prisma'

interface BarberShopReviewProps {
  reviews: Prisma.ReviewGetPayload<{
    include: { user: true }
  }>[]
}

export function BarberShopReview({ reviews }: BarberShopReviewProps) {
  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500">Nenhuma avaliação disponível.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback>
                  <Skeleton className="size-full" />
                </AvatarFallback>
                <AvatarImage src={review.user.image ?? ''} />
              </Avatar>
              <h3 className="font-medium">
                {review.user.name || 'Usuário anônimo'}
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RatingStars
                  rating={review.barberShopRating}
                  showStarsOnly={true}
                />
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>

              {review.comment && (
                <p className="text-sm/normal">{review.comment}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
