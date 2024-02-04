import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

interface ConfirmationButtonProps extends ButtonProps {
  isLoading: boolean
}

export function ConfirmationButton({
  disabled,
  isLoading,
  onClick,
}: ConfirmationButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Reservando...
        </>
      ) : (
        'Confirmar reserva'
      )}
    </Button>
  )
}
