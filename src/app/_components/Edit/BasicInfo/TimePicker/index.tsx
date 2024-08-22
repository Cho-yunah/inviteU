"use client";
 
import * as React from "react";
import { TimePickerInput } from "./TimePickerInput";
import { Period } from "./time-picker-utils";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
 
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const FormSchema = z.object({
    date: z.date({
      required_error: "A date of birth is required.",
    }),
})

export function TimePickerCustom({ date, setDate }: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>("PM");
 
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  return (
    <>
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex max-w-sm gap-0 space-y-0" style={{marginTop: '10px'}}>
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
                  {hourRef.current? (
                    <span className="text-left">{`${hourRef.current?.value} : ${minuteRef.current?.value} ${period}`}</span>
                  ) : (
                   <label htmlFor='selectTime' className="text-slate-400 text-left">Select Time</label> 
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[335px] p-2 flex justify-center bg-white" align="start">
              <TimePickerInput />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
    </>
  );
}
      