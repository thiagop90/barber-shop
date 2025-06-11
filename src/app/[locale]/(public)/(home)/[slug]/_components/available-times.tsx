import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import type { OpeningHours } from '@/@types/opening-hours'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { getTimeSlotsForDate } from '@/helpers/get-time-slots'

interface TimeSlotsProps {
  date: Date
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  isDisabled?: boolean
  openingHours: OpeningHours
  barberId: string
}

export function AvailableTimes({
  date,
  selectedTime,
  onTimeSelect,
  isDisabled,
  openingHours,
  barberId,
}: TimeSlotsProps) {
  const t = useTranslations('ServiceItem')

  const { data: timeSlots = [], isLoading } = useQuery({
    queryKey: ['timeSlots', date.toDateString(), barberId],
    queryFn: () => getTimeSlotsForDate(date, openingHours, barberId),
  })

  return (
    <div className="space-y-4">
      <p className="text-sm">{t('availableTimes')}</p>
      <ScrollArea>
        <div className="mb-2.5 flex gap-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-9 w-16 shrink-0" />
            ))
          ) : timeSlots.length === 0 ? (
            <p className="col-span-2 text-sm">Sem horários disponíveis</p>
          ) : (
            timeSlots.map((timeSlot) => (
              <Button
                size="sm"
                variant={selectedTime === timeSlot ? 'default' : 'outline'}
                key={timeSlot}
                onClick={() => onTimeSelect(timeSlot)}
                disabled={isDisabled}
              >
                {timeSlot}
              </Button>
            ))
          )}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
