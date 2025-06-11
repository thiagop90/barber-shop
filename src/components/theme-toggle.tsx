'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLayoutEffect, useState } from 'react'

import { Button, buttonVariants } from './ui/button'

const themes = {
  light: { icon: Sun, label: 'Tema claro' },
  dark: { icon: Moon, label: 'Tema escuro' },
} as const

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={buttonVariants({ size: 'icon', variant: 'outline' })}>
        <div className="size-4 animate-pulse rounded-full bg-muted" />
      </div>
    )
  }

  const currentTheme = resolvedTheme || 'dark'
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
  const CurrentIcon = themes[currentTheme as keyof typeof themes].icon

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label={`Toggle Theme`}
      onClick={() => setTheme(nextTheme)}
      data-theme-toggle=""
    >
      <CurrentIcon className="size-4" />
    </Button>
  )
}
