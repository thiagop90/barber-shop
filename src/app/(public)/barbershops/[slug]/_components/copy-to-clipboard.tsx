'use client'
import { Check, Copy } from 'lucide-react'
import { useOptimistic, useTransition } from 'react'
import { toast } from 'sonner'

import type { ButtonProps } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CopyToClipboardProps extends ButtonProps {
  text: string
  textTooltip: string
}

export function CopyToClipboard({
  text,
  textTooltip,
  children,
  className,
  ...props
}: CopyToClipboardProps) {
  const [state, setState] = useOptimistic<'idle' | 'copied'>('idle')
  const [_, startTransition] = useTransition()

  function handleClickToCopyText() {
    startTransition(async () => {
      navigator.clipboard.writeText(text)
      setState('copied')
      toast.success('Copiado para a área de transferência')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setState('idle')
    })
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={text}
          className={cn(
            'group relative flex w-full items-center gap-4 text-pretty p-4 text-left text-sm hover:bg-card [&_svg]:shrink-0',
            className,
          )}
          onClick={handleClickToCopyText}
          {...props}
        >
          {children}

          <div
            className={cn(
              'absolute right-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-secondary opacity-0 group-hover:opacity-100',
            )}
          >
            {state === 'idle' ? (
              <Copy className="size-3.5" />
            ) : (
              <Check className="size-3.5" />
            )}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        align="start"
        side="bottom"
        alignOffset={8}
        sideOffset={0}
      >
        <p>{textTooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
