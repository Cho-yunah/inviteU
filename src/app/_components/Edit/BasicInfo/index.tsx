"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import styles from './edit.module.scss'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePickerForm } from './DatePicker'
import { TimePickerCustom } from './TimePicker'
import FileInput from './FileInput'

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  url: z.string().min(7, {
    message: "Username must be at least 7 characters.",
  }),
})

export default function BaseInfo() {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = useState<Date | undefined>(undefined);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='px-5 w-max-[350px]'>
      <h2 className='text-gray-400 text-base font-bold pb-2' >기본정보</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
                <div className='flex leading-7 items-center my-0'>
                  <FormLabel className='justify-center font-semibold'>초대장 제목</FormLabel>
                  <span className='text-red-600 self-start pl-1'>*</span>
                </div>
                <FormControl className='space-y-0 '>
                  <Input className=' mt-0 border-gray-300 rounded-md placeholder:text-slate-400 ' placeholder="내용을 입력해주세요" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
              <div className='flex leading-7 items-center my-0'>
                <FormLabel className='justify-center font-semibold'>링크 생성</FormLabel>
                <span className='text-red-600 self-start pl-1'>*</span>
              </div>
              <FormControl className=''>
                <Input className='mt-0 border-gray-300 rounded-md placeholder:text-slate-400 ' placeholder="기본 URL/wearegettingmarry" {...field} />
              </FormControl>
            </FormItem>
            )}
          />
          <DatePickerForm/>
          <TimePickerCustom setDate={setDate} date={date} />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
                <div className='flex leading-7 items-center my-0'>
                  <FormLabel className='justify-center font-semibold'>대표 이미지</FormLabel>
                  <span className='text-red-600 self-start pl-1'>*</span>
                </div>
                <FormControl className=''>
                  <FileInput />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  )
}
