'use client'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import dayjs from 'dayjs'

interface DatePickerProps {
  field: any
  formSchema: any
}

export function DatePickerForm({ field }: DatePickerProps) {
  // Popover 상태 관리
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()

  const selectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      field.onChange(dayjs(selectedDate).format('YYYY-MM-DD')) // React Hook Form과 연결
      setIsOpen(false) // 날짜 선택 후 Popover 닫기
    }
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal mt-0 border-gray-300 rounded-md',
                !date && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                format(field.value, 'yyyy-MM-dd')
              ) : (
                <span className="text-slate-400">Select a Date</span>
              )}
              <CalendarIcon className="ml-auto size-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            className="bg-white"
            selected={date}
            onSelect={selectDate}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
