import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Search() {
  return (
    <div className="flex items-center gap-3">
      <Input placeholder="Busque por uma barbearia..." />
      <Button size="icon" className="flex-none">
        <SearchIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}
