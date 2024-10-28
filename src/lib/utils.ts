import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: any, timeString: any) {
  let [year, month, day] = dateString.split('-')
  day = day.split('T')[0]
  const [hour, minute] = timeString.split(':')

  // 병합된 Date 객체 생성
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))

  // 일정과 시간 문자열로 포맷팅
  const formattedDate = format(date, 'yyyy년 M월 d일', { locale: ko })
  const formattedTime = format(date, 'a h시 mm분', { locale: ko })

  return `${formattedDate} \n ${formattedTime}`
}
