"use client"
import React, { useEffect, useState } from 'react'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {  FormControl  } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  field: any;
  formSchema: any;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function DatePickerForm({ date, setDate }: DatePickerProps) {
  // Popover 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const selectDate = (date: Date | undefined) => {
    if(date) {
      setDate(date);
      setIsOpen(false); // 날짜 선택 후 Popover 닫기
    }
  }

  useEffect(() => {
    console.log('Date:', date)
  }, [date])

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal mt-0 border-gray-300 rounded-md",
                    !date && "text-muted-foreground",
                 )}
              >
                {date ? (
                  format(date, "yyyy-MM-dd")
                 ) : (
                  <span className="text-slate-400">Select a Date</span>
                 )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
