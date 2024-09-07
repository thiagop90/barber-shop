'use client'

import { PopoverClose } from '@radix-ui/react-popover'
import { Calendar, CalendarDays, LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

export function StatusAuthenticated() {
  const { status, data } = useSession()

  async function handleLoginClick() {
    await signIn('google')
  }

  async function handleLogoutClick() {
    await signOut()
  }

  return (
    <div className="space-y-4">
      {status === 'unauthenticated' && (
        <>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>Olá!</p>
              <p className="text-sm text-muted-foreground">
                Faça login na plataforma.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={handleLoginClick}
            className="w-full leading-normal"
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={16}
              height={16}
              className="mr-2"
            />
            Continuar com Google
          </Button>
        </>
      )}

      {status === 'authenticated' && (
        <>
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>
                {data.user?.name?.[0].toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={data?.user?.image ?? ''} />
            </Avatar>
            <div>
              <p>Olá, {data.user?.name}!</p>
              <p className="text-sm text-muted-foreground">
                Gerencie seus agendamentos.
              </p>
            </div>
          </div>
          <PopoverClose asChild>
            <Button asChild variant="outline" className="w-full leading-normal">
              <Link href="/bookings">
                <CalendarDays className="mr-2 h-4 w-4" strokeWidth={1.75} />
                Meus agendametos
              </Link>
            </Button>
          </PopoverClose>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full leading-normal text-red-400 hover:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" strokeWidth={1.75} />
                Sair da conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza de que deseja sair da sua conta?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                <AlertDialogAction onClick={handleLogoutClick}>
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {status === 'loading' && (
        <>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </>
      )}
    </div>
  )
}
