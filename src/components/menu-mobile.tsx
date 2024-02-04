import { User } from 'lucide-react'

import { StatusAuthenticated } from './status-authenticated'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function MenuMobile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mr-5">
        <StatusAuthenticated />
      </PopoverContent>
    </Popover>
  )
}
