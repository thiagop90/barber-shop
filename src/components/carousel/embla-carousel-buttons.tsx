import type { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from 'react'

import { Icons } from '../icons'
import { Button, type ButtonProps } from '../ui/button'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export function PrevButton(props: ButtonProps) {
  const { children, ...restProps } = props

  return (
    <Button
      className="size-9 rounded-full disabled:border disabled:border-input disabled:bg-background disabled:text-foreground"
      size="icon"
      type="button"
      {...restProps}
    >
      <Icons.arrowLeft />
      {children}
    </Button>
  )
}

export function NextButton(props: ButtonProps) {
  const { children, ...restProps } = props

  return (
    <Button
      className="size-9 rounded-full disabled:border disabled:border-input disabled:bg-background disabled:text-foreground"
      size="icon"
      type="button"
      {...restProps}
    >
      <Icons.arrowRight />
      {children}
    </Button>
  )
}
