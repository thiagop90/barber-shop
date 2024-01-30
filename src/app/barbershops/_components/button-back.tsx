'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ButtonBack() {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-5 top-5 z-50"
      onClick={handleBackClick}
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  )
}
