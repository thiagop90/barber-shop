'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function ButtonBack() {
  const router = useRouter()

  function handleBackClick() {
    router.replace('/')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-5 top-5 z-40 bg-background/75 backdrop-blur-sm"
      onClick={handleBackClick}
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  )
}
