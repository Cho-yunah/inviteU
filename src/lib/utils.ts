import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function formatDateTime(dateString: any, timeString: any) {
//   let [year, month, day] = dateString.split('-')
//   day = day.split('T')[0]
//   const [hour, minute] = timeString.split(':')

//   // 병합된 Date 객체 생성
//   const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))

//   // 일정과 시간 문자열로 포맷팅
//   const formattedDate = format(date, 'yyyy년 M월 d일', { locale: ko })
//   const formattedTime = format(date, 'a h시 mm분', { locale: ko })

//   return `${formattedDate} \n ${formattedTime}`
// }

export function formatDateTime(dateString: any, timeString?: any) {
  // ISO 8601 형식에서 날짜와 시간을 분리
  const isISODateTime = dateString.includes('T')
  const [isoDate, isoTime] = isISODateTime ? dateString.split('T') : [dateString, null]

  // date와 time 형식 검증
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(isoDate)
  const isValidTime = timeString ? /^\d{2}:\d{2}$/.test(timeString) : isoTime != null

  if (!isValidDate) {
    console.error('Invalid date format. Using current date as fallback.')
    dateString = format(new Date(), 'yyyy-MM-dd')
  }

  // 날짜 포맷팅
  let [year, month, day] = isoDate.split('-')
  day = day.split('T')[0] // 날짜 부분만 가져오기
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  const formattedDate = format(date, 'yyyy년 M월 d일', { locale: ko })

  // 시간 포맷팅 - timeString이 없으면 isoTime을 사용
  let formattedTime = ''
  if (isValidTime) {
    const [hour, minute] = (timeString || isoTime).split(':')
    const dateWithTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    )
    formattedTime = format(dateWithTime, 'a h시 mm분', { locale: ko })
  }

  // date와 time을 조건에 따라 반환
  return isValidTime
    ? `일정 : ${formattedDate}\n시간 : ${formattedTime}`
    : `일정 : ${formattedDate}`
}
