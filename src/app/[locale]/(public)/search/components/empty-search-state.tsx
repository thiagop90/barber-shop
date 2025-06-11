import { Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export async function EmptySearchState() {
  const t = await getTranslations('SearchPage')

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-8">
        <div className="relative h-32 w-32 rounded-full bg-muted/30">
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20">
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40">
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary">
                <Search className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary-foreground" />
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-4 h-2 w-2 rounded-full bg-primary/60"></div>
          <div className="absolute -left-1 top-8 h-1.5 w-1.5 rounded-full bg-primary/40"></div>
          <div className="absolute -bottom-2 right-6 h-1 w-1 rounded-full bg-primary/50"></div>
          <div className="absolute -left-2 bottom-2 h-1.5 w-1.5 rounded-full bg-primary/30"></div>
          <div className="absolute -bottom-1 right-2 h-1 w-1 rounded-full bg-primary/40"></div>
          <div className="absolute -top-1 left-8 h-1 w-1 rounded-full bg-primary/35"></div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground">
          {t('findEstablishment')}
        </h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          {t('searchByNameOrCity')}
        </p>
      </div>
    </div>
  )
}
