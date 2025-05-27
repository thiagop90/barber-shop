'use client'

import {
  addDays,
  endOfWeek,
  format,
  isWithinInterval,
  startOfWeek,
  subDays,
} from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import * as React from 'react'
import {
  DayPicker,
  type DayPickerSingleProps,
  Row,
  type RowProps,
} from 'react-day-picker'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CalendarProps = Omit<DayPickerSingleProps, 'mode'>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  locale,
  ...props
}: CalendarProps) {
  const defaultDate = selected instanceof Date ? selected : new Date()
  const [weekBaseDate, setWeekBaseDate] = React.useState(defaultDate)

  React.useEffect(() => {
    if (selected instanceof Date) {
      setWeekBaseDate(selected)
    }
  }, [selected])

  const start = startOfWeek(weekBaseDate)
  const end = endOfWeek(weekBaseDate)

  function CurrentWeekRow(props: RowProps) {
    const isNotCurrentWeek = props.dates.every(
      (date) => !isWithinInterval(date, { start, end }),
    )
    if (isNotCurrentWeek) return null
    return <Row {...props} />
  }

  const isPreviousWeekDisabled =
    startOfWeek(weekBaseDate) <= startOfWeek(new Date())

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setWeekBaseDate((prev) => subDays(prev, 7))}
          disabled={isPreviousWeekDisabled}
          className="size-8"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="text-sm font-medium">
          {format(start, 'd MMMM', { locale })} -{' '}
          {format(end, 'd MMMM', { locale })}
        </span>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setWeekBaseDate((prev) => addDays(prev, 8))}
          className="size-8"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <DayPicker
        mode="single"
        month={weekBaseDate}
        selected={selected}
        locale={locale}
        showOutsideDays={showOutsideDays}
        classNames={{
          ...classNames,
          caption: 'hidden',
          months: 'flex flex-col',
          month: 'space-y-4',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex justify-between',
          head_cell:
            'text-muted-foreground w-9 font-normal text-[0.8rem] capitalize',
          row: 'flex justify-between w-full mt-1.5 sm:mt-2',
          cell: 'size-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'size-9 rounded-full p-0 font-normal aria-selected:opacity-100',
          ),
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside:
            'day-outside aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
        }}
        components={{
          Row: CurrentWeekRow,
        }}
        {...props}
      />
    </div>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
