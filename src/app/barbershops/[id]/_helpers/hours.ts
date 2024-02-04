import { addMinutes, format, isAfter, setHours, setMinutes } from 'date-fns'

export function generateDayTimeList(date: Date): string[] {
  const currentTime = new Date()
  const startTime = setMinutes(setHours(date, 9), 0)
  const endTime = setMinutes(setHours(date, 21), 0)
  const interval = 45
  const timeList: string[] = []

  let currentTimeSlot = startTime

  while (currentTimeSlot <= endTime) {
    if (isAfter(currentTimeSlot, currentTime)) {
      timeList.push(format(currentTimeSlot, 'HH:mm'))
    }
    currentTimeSlot = addMinutes(currentTimeSlot, interval)
  }

  return timeList
}
