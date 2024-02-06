'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
  search: z
    .string({ required_error: 'Campo obrigatório.' })
    .trim()
    .min(1, { message: 'Campo obrigatório.' }),
})

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>
}

export function Search({ defaultValues }: SearchProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
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
                    type="search"
                    className="h-12 bg-card pl-10"
                    placeholder="Busque por uma barbearia..."
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
