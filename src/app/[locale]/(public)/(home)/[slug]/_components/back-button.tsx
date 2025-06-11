'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      className="absolute left-4 top-3 z-10 size-9 border border-neutral-700/50 backdrop-blur"
      onClick={() => router.back()}
      size="icon"
      variant="secondary"
    >
      <ChevronLeft />
    </Button>
  )
}
