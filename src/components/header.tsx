import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { MenuMobile } from './menu-mobile'

export function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" width={120} height={18} />

        <MenuMobile />
      </CardContent>
    </Card>
  )
}
