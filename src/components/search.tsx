'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRouter } from '@/i18n/routing'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

interface SearchProps {
  defaultValues?: { search: string }
}

export function Search({ defaultValues }: SearchProps) {
  const t = useTranslations('BarberShopsPage')
  const router = useRouter()
  const form = useForm({
    defaultValues,
  })

  function handleSubmit(data: { search: string }) {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="h-12 bg-card pl-10"
                    placeholder={t('search')}
                    {...field}
                  />
                  <SearchIcon className="absolute left-3 h-5 w-5 text-primary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
