'use client'

import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export function AccessAccount() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const [isDismissible, setIsDismissible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function SignInButton() {
    async function handleSignIn() {
      setIsLoading(true)
      setIsDismissible(true)
      await signIn('google')
    }

    return (
      <div className="p-4 pt-0">
        <Button
          variant="outline"
          onClick={handleSignIn}
          className="w-full gap-3 bg-card"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Icons.google />
          )}
          Continuar com Google
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
        <DrawerTrigger asChild>
          <Button size="sm">Reservar</Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Acessar conta</DrawerTitle>
            <DrawerDescription>
              Para realizar uma reserva é necessário entrar em sua conta
            </DrawerDescription>
          </DrawerHeader>

          <SignInButton />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Reservar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acessar conta</DialogTitle>
        </DialogHeader>

        <SignInButton />
      </DialogContent>
    </Dialog>
  )
}
