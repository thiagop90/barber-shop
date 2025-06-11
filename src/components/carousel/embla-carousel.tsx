'use client'

import useEmblaCarousel from 'embla-carousel-react'

import type { Prisma } from '@/generated/prisma'

import { BarberShopItem } from '../barbershop-item'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './embla-carousel-buttons'

interface EmblaCarouselProps {
  barbershops: Prisma.BarberShopGetPayload<{ include: { reviews: true } }>[]
}

export function EmblaCarousel({ barbershops }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="text-sm font-bold uppercase text-muted-foreground">
          Barbershops
        </h3>

        <div className="flex gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div
        className="-mx-5 overflow-hidden px-5 sm:-mx-6 sm:px-6"
        ref={emblaRef}
      >
        <div className="pinch-zoom flex touch-pan-y gap-4">
          {barbershops.map((item) => (
            <div className="w-full max-w-[250px] flex-none" key={item.id}>
              <BarberShopItem key={item.id} barbershop={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
