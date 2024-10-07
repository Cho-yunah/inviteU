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

interface TimePickerDemoProps {
  time: string
  setTime: any
  field: any
  formSchema: any
}

export function TimePickerCustom({ time, setTime, field, formSchema }: TimePickerDemoProps) {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [period, setPeriod] = useState('')

  useEffect(() => {
    if (hours && minutes && period) {
      const convertHour = convert12HourTo24Hour(parseInt(hours), period as Period)
      const tempDate = new Date()

      tempDate.setHours(convertHour)
      tempDate.setMinutes(parseInt(minutes, 10))

      const formattedTime = dayjs(tempDate).format('HH:mm')
      setTime(formattedTime)
      field.onChange(formattedTime) // React Hook Form과 연결
    }
  }, [hours, minutes, period])

  // useEffect(() => {
  //   console.log('time:', time)
  // }, [time])

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
              {time ? (
                <span className="text-left">{`${hours} : ${minutes} ${period}`}</span>
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
              <TimeSelect id={'hours'} arr={HOURS} item={hours} setItem={setHours} />
            </div>
            <div className="mx-1">
              <TimeSelect id={'minutes'} arr={MINUTES} item={minutes} setItem={setMinutes} />
            </div>
            <div className="mx-1">
              <TimeSelect id={'period'} arr={PERIOD} item={period} setItem={setPeriod} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
