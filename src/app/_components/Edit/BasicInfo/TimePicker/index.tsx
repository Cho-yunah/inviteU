'use client'

import React, { useEffect, useState } from 'react'
import { convert12HourTo24Hour, Period } from './time-picker-utils'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import TimeSelect from './TimeSelect'
import { MINUTES, PERIOD, HOURS } from '@/constants/edit'
import dayjs from 'dayjs'

interface TimePickerProps {
  field: any
  formSchema?: any
}

export function TimePickerCustom({ field }: TimePickerProps) {
  const [timeState, setTimeState] = useState({ hours: '', minutes: '', period: '' })
  const [initialized, setInitialized] = useState(false) // 초기화 상태 확인용

  const initializeTimeState = (value: string) => {
    console.log(value)
    if (value && !initialized) {
      const [initialHours, initialMinutes] = value.split(':')

      // 24시간 형식에서 12시간 형식으로 변환
      const hoursIn24 = parseInt(initialHours)
      const formattedHour =
        hoursIn24 > 12
          ? (hoursIn24 - 12).toString().padStart(2, '0')
          : hoursIn24.toString().padStart(2, '0')
      const formattedPeriod = hoursIn24 >= 12 ? 'PM' : 'AM'

      setTimeState({
        hours: formattedHour,
        minutes: initialMinutes,
        period: formattedPeriod,
      })
      console.log('timeState 초기화', timeState)
    }
    setInitialized(true) // 초기화 완료
  }

  // field.value 가 존재할때, 초기 상태 설정
  useEffect(() => {
    initializeTimeState(field.value)
  }, [field.value])

  // 시간 선택 시 상태 업데이트 및 필드와 연동
  const handleTimeChange = (key: string, value: string) => {
    console.log('timeState 변경')
    setTimeState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  // 상태가 변경될 때 필드에 저장
  useEffect(() => {
    const { hours, minutes, period } = timeState
    console.log('timeState', timeState, hours, minutes, period, initialized)
    if (hours && minutes && initialized) {
      const convertHour = convert12HourTo24Hour(parseInt(hours), period as Period)
      const formattedTime = dayjs().hour(convertHour).minute(parseInt(minutes)).format('HH:mm')
      console.log('formattedTime', formattedTime)
      field.onChange(formattedTime) // 필드와 연결된 값 저장
    }
  }, [timeState, initialized])

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 flex justify-start text-left font-normal mt-0 border-gray-300 rounded-md',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                <span className="text-left">{`${timeState.hours} : ${timeState.minutes} ${timeState.period}`}</span>
              ) : (
                <label htmlFor="selectTime" className="text-slate-400 text-left">
                  Select Time
                </label>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[335px] p-2 flex justify-center bg-white" align="start">
          <div className=" h-[120px] w-full flex justify-center overflow-hidden">
            <div className="mx-1">
              <TimeSelect
                id="hours"
                options={HOURS}
                value={timeState.hours}
                onChange={(val) => handleTimeChange('hours', val)}
              />
            </div>
            <div className="mx-1">
              <TimeSelect
                id="minutes"
                options={MINUTES}
                value={timeState.minutes}
                onChange={(val) => handleTimeChange('minutes', val)}
              />
            </div>
            <div className="mx-1">
              <TimeSelect
                id="period"
                options={PERIOD}
                value={timeState.period}
                onChange={(val) => handleTimeChange('period', val)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
