import {
  CalendarDays,
  type LucideProps,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'

import { cn } from '@/lib/utils'

export const Icons = {
  calendar: ({ className, ...props }: LucideProps) => (
    <CalendarDays
      strokeWidth="1.75"
      className={cn('size-4 text-primary', className)}
      {...props}
    />
  ),
  mapPin: ({ className, ...props }: LucideProps) => (
    <MapPin className={cn('size-5 text-primary', className)} {...props} />
  ),
  star: ({ className, ...props }: LucideProps) => (
    <Star
      stroke="currentColor"
      strokeWidth="1"
      className={cn(className)}
      {...props}
    />
  ),
  phone: ({ className, ...props }: LucideProps) => (
    <Phone className={cn('size-5 text-primary', className)} {...props} />
  ),
}
