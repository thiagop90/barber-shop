import { Badge, BadgeProps } from './ui/badge'

interface StatusBadgeProps extends BadgeProps {
  isBookingConfirmed: boolean
}

export function StatusBadge({ isBookingConfirmed }: StatusBadgeProps) {
  return (
    <Badge variant={isBookingConfirmed ? 'default' : 'secondary'}>
      {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
    </Badge>
  )
}
