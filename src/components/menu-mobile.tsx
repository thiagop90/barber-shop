import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { StatusAuthenticated } from './status-authenticated'

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="border-b p-5 text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <StatusAuthenticated />
      </SheetContent>
    </Sheet>
  )
}
