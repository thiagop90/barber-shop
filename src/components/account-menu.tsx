import { CalendarDays, LogOut } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { auth, signOut } from '@/auth'
import { cn } from '@/lib/utils'

import { AccessAccount } from './access-account'
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
import { Button, buttonVariants } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export async function AccountMenu() {
  const t = await getTranslations('AccountMenu')
  const session = await auth()
  const user = session?.user

  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className="border border-neutral-700/50 px-3"
            >
              <Avatar className="mr-3 size-6">
                <AvatarFallback className=" bg-neutral-700">
                  {user.name?.[0]}
                </AvatarFallback>
                <AvatarImage src={user?.image ?? ''} />
              </Avatar>
              <span translate="no">{user.name?.split(' ')[0]}</span>&nbsp;
              <span translate="no" className="hidden min-[500px]:block">
                {user.name?.split(' ')[1]}
              </span>
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" sideOffset={8}>
            <div className="mb-4">
              <p>
                {t('hello', {
                  name: user.name?.split(' ')[0] ?? '',
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('manageYourAppointments')}
              </p>
            </div>

            <div className="space-y-3">
              <Link
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full justify-between',
                )}
                href="/bookings"
              >
                {t('mySchedules')}
                <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full  justify-between text-red-400 hover:text-red-400"
                  >
                    {t('signOut')}
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('signOut')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('confirmSignOut')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>

                    <form
                      action={async () => {
                        'use server'
                        await signOut()
                      }}
                      className="w-full"
                    >
                      <AlertDialogAction asChild>
                        <button type="submit">{t('logOut')}</button>
                      </AlertDialogAction>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <AccessAccount>
          <Button>{t('signIn')}</Button>
        </AccessAccount>
      )}
    </>
  )
}
