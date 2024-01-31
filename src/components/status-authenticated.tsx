'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
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
    <>
      {status === 'unauthenticated' && (
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>Olá!</p>
              <p className="text-sm text-muted-foreground">
                Faça login para continuar
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={handleLoginClick}
            className="w-full"
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            Continuar com Google
          </Button>
        </div>
      )}

      {status === 'loading' && (
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {status === 'authenticated' && (
        <div className="space-y-4 p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>
                {data.user?.name?.[0].toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={data?.user?.image ?? ''} />
            </Avatar>
            <div>
              <p>Olá, {data.user?.name}!</p>
              <p className="text-sm text-muted-foreground">Bem-vindo.</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogoutClick}
            className="w-full text-red-400 hover:text-red-400"
          >
            <LogOut className="mr-2 h-5 w-5" strokeWidth={1.75} />
            Sair da conta
          </Button>
        </div>
      )}
    </>
  )
}
