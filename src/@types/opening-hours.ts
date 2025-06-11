export type WeekDay =
  | 'domingo'
  | 'segunda-feira'
  | 'terça-feira'
  | 'quarta-feira'
  | 'quinta-feira'
  | 'sexta-feira'
  | 'sábado'

export type OpeningHours = {
  [key in WeekDay]: {
    open: string | null
    close: string | null
  }
}
