import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

export function BookingItem() {
  return (
    <Card>
      <CardContent className="p-0 flex justify-between">
        <div className="space-y-3 p-5">
          <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>

          <div className="space-y-2">
            <h2 className="font-bold">Corte de cabelo</h2>

            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage></AvatarImage>
                <AvatarFallback>T</AvatarFallback>
              </Avatar>

              <span className="text-sm">Vintage Barber</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 items-center justify-center border-l">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
