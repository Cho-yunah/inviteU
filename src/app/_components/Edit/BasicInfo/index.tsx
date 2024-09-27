"use client"

import React, { useState } from 'react'
import { z } from "zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatePickerForm } from './DatePicker'
import { TimePickerCustom } from './TimePicker'
import FileInput from './FileInput'

export default function BaseInfo({form, formSchema, date, setDate}: {form: any, formSchema: any, date: Date, setDate: any}) {
  // const [date, setDate] = useState<Date>();

  const handleFileUpload = (files: any) => {
    console.log("Uploaded files:", files);
};

  function onSubmit(values: z.infer<typeof formSchema>) {
    // e.preventDefault();
    // console.log(date)
    console.log('values', values, form.getValues())
    // form.handleSubmit(onSubmit)
  }
  
  return (
    <div >
      <h2 className='text-black-400 text-base font-bold pb-2'>기본정보</h2>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}
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
              <FormControl >
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
                <FormControl >
                  <DatePickerForm field={field} formSchema={formSchema} date={date} setDate={setDate}  />
                </FormControl>
                <FormMessage className='text-xs text-red-400 p-1' />
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
                <FormControl >
                  <TimePickerCustom field={field} formSchema={formSchema} date={date} setDate={setDate} />
                </FormControl>
                <FormMessage className='text-xs text-red-400 p-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="primary_image"
            render={({ field }) => (
              <FormItem className='grid w-full max-w-sm gap-0 space-y-0'>
                <div className='flex leading-7 items-center my-0'>
                  <FormLabel className='justify-center font-semibold'>대표 이미지</FormLabel>
                  <span className='text-red-600 self-start pl-1'>*</span>
                  <FormMessage className='text-xs text-red-400 py-1 px-3' />
                </div>
                <FormControl >
                  <FileInput field={field} onFileUpload={handleFileUpload} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <button type="submit"  className='absolute top-[-5px] right-2 z-1000' >저장</button> */}

        {/* </form> */}
    </div>
  )
}
