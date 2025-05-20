'use client'

import { Loader2 } from 'lucide-react'
import { OAuthProviderId } from 'next-auth/providers'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/use-media-query'

export function AccessAccount({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isDismissible, setIsDismissible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function SignInButton() {
    async function handleSignIn(provider: OAuthProviderId) {
      setIsLoading(true)
      setIsDismissible(true)
      await signIn(provider)
    }

    return (
      <div className="flex flex-col gap-3 p-4 pt-0">
        <Button
          variant="outline"
          onClick={() => handleSignIn('google')}
          className="relative w-full gap-3 bg-card"
          disabled={isLoading}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {isLoading ? <Icons.spinner /> : <Icons.google />}
          </div>
          Continuar com Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSignIn('facebook')}
          className="relative w-full gap-3 bg-card"
          disabled={isLoading}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {isLoading ? <Icons.spinner /> : <Icons.facebook />}
          </div>
          Continuar com Facebook
        </Button>
      </div>
    )
  }

  function handleOpenChange(open: boolean) {
    if (!isLoading) {
      setIsOpen(open)
    }
  }

  if (isMobile) {
    return (
      <Drawer
        dismissible={!isDismissible}
        open={isOpen}
        onOpenChange={handleOpenChange}
        direction="bottom"
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Acessar conta</DrawerTitle>
          </DrawerHeader>

          <SignInButton />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acessar conta</DialogTitle>
        </DialogHeader>

        <SignInButton />
      </DialogContent>
    </Dialog>
  )
}
