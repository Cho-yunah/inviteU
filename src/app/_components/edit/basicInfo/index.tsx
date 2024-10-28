import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DatePickerForm } from './datePicker'
import { TimePickerCustom } from './timePicker'
import FileInput from './FileInput'

export default function BaseInfo({ form, formSchema }: { form: any; formSchema: any }) {
  const handleFileUpload = (files: any) => {
    // console.log('Uploaded files:', files)
  }

  return (
    <div>
      <h2 className="text-black text-base font-bold pb-2">기본정보</h2>
      <FormField
        control={form.control}
        name="title"
        render={({ field, formState: { errors } }) => (
          <FormItem className="grid w-full max-w-sm gap-0 space-y-0 mt-1">
            <div className="flex leading-7 items-center my-0">
              <FormLabel className="justify-center font-semibold">초대장 제목</FormLabel>
              <span className="text-red-600 self-start pl-1">*</span>
            </div>
            <FormControl className="space-y-0 ">
              <Input
                className=" mt-0 border-gray-300 rounded-md placeholder:text-slate-400 "
                placeholder="내용을 입력해주세요"
                {...field}
              />
            </FormControl>
            {errors.title ? (
              <FormMessage className="text-xs text-red-400 p-1" />
            ) : (
              <span className="block">&nbsp;</span>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="custom_url"
        render={({ field, formState: { errors } }) => (
          <FormItem className="grid w-full max-w-sm gap-0 space-y-0 mt-0">
            <div className="flex leading-7 items-center my-0">
              <FormLabel className="justify-center font-semibold">링크 생성</FormLabel>
              <span className="text-red-600 self-start pl-1">*</span>
            </div>
            <FormControl>
              <Input
                className="mt-0 border-gray-300 rounded-md placeholder:text-slate-400 "
                placeholder="기본 URL/wearegettingmarry"
                {...field}
              />
            </FormControl>
            {errors.custom_url ? (
              <FormMessage className="text-xs text-red-400 p-1" />
            ) : (
              <span className="block">&nbsp;</span>
            )}{' '}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field, formState: { errors } }) => (
          <FormItem className="grid w-full max-w-sm gap-0 space-y-0 mt-0">
            <div className="flex leading-7 items-center my-0">
              <FormLabel className="justify-center font-semibold">날짜</FormLabel>
              <span className="text-red-600 self-start pl-1">*</span>
            </div>
            <FormControl>
              <DatePickerForm field={field} formSchema={formSchema} />
            </FormControl>
            {errors.date ? (
              <FormMessage className="text-xs text-red-400 p-1" />
            ) : (
              <span className="block">&nbsp;</span>
            )}{' '}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="time"
        render={({ field, formState: { errors } }) => (
          <FormItem className="grid w-full max-w-sm gap-0 space-y-0 mt-0">
            <div className="flex leading-7 items-center my-0">
              <FormLabel className="justify-center font-semibold">시간</FormLabel>
              <span className="text-red-600 self-start pl-1">*</span>
            </div>
            <FormControl>
              <TimePickerCustom field={field} formSchema={formSchema} />
            </FormControl>
            {errors.time ? (
              <FormMessage className="text-xs text-red-400 p-1" />
            ) : (
              <span className="block">&nbsp;</span>
            )}{' '}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="primary_image"
        render={({ field }) => (
          <FormItem className="grid w-full max-w-sm gap-0 space-y-0 mt-2">
            <div className="flex leading-7 items-center my-0">
              <FormLabel className="justify-center font-semibold">대표 이미지</FormLabel>
              <span className="text-red-600 self-start pl-1">*</span>
              <FormMessage className="text-xs text-red-400 py-1 px-3" />
            </div>
            <p className="text-[10px] text-slate-400">
              카카오톡 공유 시 보여지는 썸네일 이미지입니다.
            </p>
            <FormControl>
              <FileInput field={field} onFileUpload={handleFileUpload} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
