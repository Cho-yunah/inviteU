"use client"

import React, { use, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePickerForm } from './DatePicker'
import { TimePickerCustom } from './TimePicker'
import FileInput from './FileInput'

const formSchema = z.object({
  title: z.string().min(7, {
    message: "초대장 제목은 7자 이상 입력해주세요.",
  }).max(60, {
    message: "초대장 제목은 60자 이하로 입력해주세요.",
  }),
  custom_url: z.string().min(6, {
    message: "6자 이상 입력해주세요.",
  }).refine (value => /^[a-z-]+$/g.test(value), {
    message: "커스텀 주소는 영어 소문자로 입력해주세요.",
  }),
  date: z.date().min(new Date(), {
    message: "날짜를 입력해주세요.",
  }),
  image_urls: z.string(z.string().min(3, {
    message: "이미지 URL을 입력해주세요.",
  })),
})

export default function BaseInfo() {
  const [date, setDate] = useState<Date>();

  // const onChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   console.log(e)
  //   console.log('Change:', e.target.value)
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      custom_url:"",
      date: new Date(),
      image_urls:'',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    
  }



  return (
    <div className='px-5'>
      <h2 className='text-gray-400 text-base font-bold pb-2'>기본정보</h2>
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
                <FormMessage className='text-xs text-red-400 p-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="custom_url"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
              <div className='flex leading-7 items-center my-0'>
                <FormLabel className='justify-center font-semibold'>링크 생성</FormLabel>
                <span className='text-red-600 self-start pl-1'>*</span>
              </div>
              <FormControl className=''>
                <Input className='mt-0 border-gray-300 rounded-md placeholder:text-slate-400 ' placeholder="기본 URL/wearegettingmarry" {...field} />
              </FormControl>
              <FormMessage className='text-xs text-red-400 p-1' />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
              <div className='flex leading-7 items-center my-0'>
                <FormLabel className='justify-center font-semibold'>날짜</FormLabel>
                <span className='text-red-600 self-start pl-1'>*</span>
              </div>
              <FormControl className=''>
                {/* <Input className='mt-0 border-gray-300 rounded-md placeholder:text-slate-400 ' placeholder="기본 URL/wearegettingmarry" {...field} /> */}
                <DatePickerForm field={field} formSchema={formSchema} date={date} setDate={setDate} />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0 my-[5px]'>
                <div className='flex leading-7 items-center my-0'>
                  <FormLabel className='justify-center font-semibold'>시간</FormLabel>
                  <span className='text-red-600 self-start pl-1'>*</span>
                </div>
                <FormControl className=''>
                  <TimePickerCustom field={field} formSchema={formSchema} date={date} setDate={setDate} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_urls"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
                <div className='flex leading-7 items-center my-0'>
                  <FormLabel className='justify-center font-semibold'>대표 이미지</FormLabel>
                  <span className='text-red-600 self-start pl-1'>*</span>
                </div>
                <FormControl className=''>
                  <FileInput />
                </FormControl>
                <FormMessage className='text-xs text-red-400 p-1' />
              </FormItem>
            )}
          />
          <Button type="submit">임시 저장</Button>
        </form>
      </Form>
    </div>
  )
}
