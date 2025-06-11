'use client'

import { SearchIcon, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePathname, useRouter } from '@/i18n/routing'

export function SearchBar() {
  const t = useTranslations('SearchPage')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query')?.toString() || '',
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  function handleClear() {
    setSearchValue('')
    const params = new URLSearchParams(searchParams)
    params.delete('query')
    replace(`${pathname}?${params.toString()}`)
    inputRef.current?.focus()
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchValue(value)
    handleSearch(value)
  }

  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute left-3 ml-px h-5 w-5 text-primary" />

      <Input
        className="h-12 bg-card pl-11"
        placeholder={t('search')}
        ref={inputRef}
        value={searchValue}
        onChange={handleInputChange}
        autoComplete="off"
        spellCheck={false}
      />

      {searchValue && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 size-9 rounded-full"
              onClick={handleClear}
              aria-label={t('clear')}
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('clear')}</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
