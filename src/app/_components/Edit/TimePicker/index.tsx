"use client";
 
import * as React from "react";
import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./period-select";
import { Period } from "./time-picker-utils";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
 
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
                    <span className="text-slate-400 text-left">Select Time</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[335px] p-2 flex justify-center bg-white" align="start">
                <TimePickerInput
                    picker="12hours"
                    period={period}
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
                <TimePickerInput
                    picker="minutes"
                    id="minutes12"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
                <TimePeriodSelect
                    period={period}
                    setPeriod={setPeriod}
                    date={date}
                    setDate={setDate}
                    ref={periodRef}
                    onLeftFocus={() => secondRef.current?.focus()}
                />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
    </>
  );
}
      