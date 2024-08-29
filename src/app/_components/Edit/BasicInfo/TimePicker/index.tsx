"use client";
 
import React, { useEffect, useState } from "react";
import { convert12HourTo24Hour, Period } from "./time-picker-utils";
import {  FormControl } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import TimeSelect from "./TimeSelect";
import { MINUTES, PERIOD, HOURS } from "@/constants/edit";
 
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  field : any;
  formSchema: any;
}

export function TimePickerCustom({date, setDate, field, formSchema }: TimePickerDemoProps) {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [period, setPeriod] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(()=> {    
    if (hours && minutes && period) {
      const convertHour = convert12HourTo24Hour(parseInt(hours), period as Period)
      const tempDate = new Date(date as Date);

      tempDate.setHours(convertHour);
      tempDate.setMinutes(parseInt(minutes, 10));

      // const formattedTime = format(tempDate, "hh:mm");
      setDate(tempDate)
    }
  }, [hours, minutes, period]);

  useEffect(() => {
    console.log('Date:', date)
  }, [date])


  return (
    <>
          <Popover >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 flex justify-start text-left font-normal mt-0 border-gray-300 rounded-md",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {date? (
                    <span className="text-left">{`${hours} : ${minutes} ${period}`}</span>
                  ) : (
                   <label htmlFor='selectTime' className="text-slate-400 text-left">Select Time</label> 
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[335px] p-2 flex justify-center bg-white" align="start">
              <div className=" h-[120px] w-full flex justify-center overflow-hidden">
                <div className="mx-1"><TimeSelect id={'hours'} arr={HOURS} item={hours} setItem={setHours}/></div>
                <div className="mx-1"><TimeSelect id={'minutes'}  arr={MINUTES} item={minutes} setItem={setMinutes}/></div>
                <div className="mx-1"><TimeSelect id={'period'} arr={PERIOD} item={period} setItem={setPeriod}/></div>
                {/* <div className="mx-1"><TimePeriodSelect date={date} setDate={setDate} period={period} setPeriod={setPeriod}/> </div> */}
              </div>
            </PopoverContent>
          </Popover>
         
    </>
  );
}
      