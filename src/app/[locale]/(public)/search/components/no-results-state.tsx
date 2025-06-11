import { SearchX } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface NoResultsStateProps {
  query: string
}

export async function NoResultsState({ query }: NoResultsStateProps) {
  const t = await getTranslations('SearchPage')

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-8">
        <div className="relative h-32 w-32 rounded-full bg-muted/20">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/30">
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/40">
              <SearchX className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/70" />
            </div>
          </div>

          <div className="absolute -right-2 top-6 h-1.5 w-1.5 rounded-full bg-muted-foreground/30"></div>
          <div className="absolute -left-1 top-10 h-1 w-1 rounded-full bg-muted-foreground/25"></div>
          <div className="absolute -bottom-2 right-8 h-1 w-1 rounded-full bg-muted-foreground/20"></div>
          <div className="absolute -left-2 bottom-4 h-1.5 w-1.5 rounded-full bg-muted-foreground/25"></div>
          <div className="absolute -bottom-1 right-4 h-1 w-1 rounded-full bg-muted-foreground/30"></div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          {t('noResultsFound')}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t('noResultsDescription', { query: `"${query}"` })}
        </p>
      </div>
    </div>
  )
}
