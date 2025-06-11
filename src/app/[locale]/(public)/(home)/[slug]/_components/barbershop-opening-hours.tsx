import { Clock } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Prisma } from '@/generated/prisma'

interface OpeningHour {
  open: string | null
  close: string | null
}

interface BarberShopOpeningHoursProps {
  openingHours: Prisma.JsonValue
}

const daysOrder = [
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
  'domingo',
]

const defaultHours = Object.fromEntries(
  daysOrder.map((day) => [day, { open: null, close: null }]),
)

export function BarberShopOpeningHours({
  openingHours,
}: BarberShopOpeningHoursProps) {
  const hours =
    (openingHours as Record<string, OpeningHour> | null) || defaultHours

  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger className="p-4 text-sm font-normal hover:no-underline">
          <div className="flex items-center gap-4">
            <Clock className="size-5 text-primary" />
            <span className="">Horários</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 px-4">
            {daysOrder.map((day) => (
              <div key={day} className="flex justify-between">
                <span>{day}</span>
                <span className="text-sm text-muted-foreground">
                  {hours[day]?.open && hours[day]?.close
                    ? `${hours[day].open}-${hours[day].close}`
                    : 'Fechado'}
                </span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
