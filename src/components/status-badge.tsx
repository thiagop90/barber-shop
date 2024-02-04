import { Badge } from './ui/badge'

interface StatusBadgeProps {
  isBookingConfirmed: boolean
}

export function StatusBadge({ isBookingConfirmed }: StatusBadgeProps) {
  return (
    <Badge variant={isBookingConfirmed ? 'default' : 'secondary'}>
      {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
    </Badge>
  )
}
