'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from '../edit.module.scss'
import BaseInfo from '@/app/_components/edit/BasicInfo'
import ContentsInfo from '@/app/_components/edit/ContentsInfo'
import Background from '@/app/_components/edit/Background'
import {Form} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubmitHandler } from 'react-hook-form';


const formSchema = z.object({
  user_id: z.string().min(10),
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
  date: z.date().refine(value => value > new Date(), {
    message: "날짜는 오늘 이후로 선택해주세요."
  }),
  // time: z.string().refine(value => value > new Date().toLocaleTimeString(), {  
  //   message: "시간은 현재 시간 이후로 선택해주세요."
  // }),
  primary_image: z.string().min(3, {
    message: "이미지 URL을 넣어주세요.",
  }),
  background_image: z.string().min(3, {
    message: "배경 이미지를 선택해주세요.",
  }),
  contents:z.array(z.object({})).min(1, {message: "콘텐츠를 추가해주세요."})
})

const Edit = () => {
  const [date, setDate] = useState<Date>(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id:"",
      title: "",
      custom_url:"",
      date:  new Date(),
      // time: new Date().toLocaleTimeString(),
      primary_image:'',
      background_image: '',
      contents: []
    },
  })

  
  
  // function onSubmit(e:any, values: z.infer<typeof formSchema>) {
  //   e.preventDefault();
  //   form.setValue('date', date) 
  //   console.log(e);
  //   console.log('values', values, form.getValues());
  //   // form.handleSubmit(onSubmit)
  // };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values,form.getValues())
  }

  return (
    <div className='w-[375px] min-h-[375px] overflow-hidden'>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className='grid w-full grid-cols-3 bg-gray-100 p-0'>
            <TabsTrigger className={styles.tabTrigger} value="basic">기본 정보</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="contents">콘텐츠</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="backgrond">배경</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TabsContent className='px-6 py-2' value="basic">
              <BaseInfo form={form} formSchema={formSchema} date={date} setDate={setDate}/>
            </TabsContent>
            <TabsContent className='px-6 py-2' value="contents">
              <ContentsInfo/>
            </TabsContent>
            <TabsContent className='px-6 py-2' value="backgrond">
              <Background />
            </TabsContent>
            <button type="submit"  className='absolute top-[-9px] right-2 z-1000 bg-gray-700 px-[14px] py-2 rounded-md text-white font-semibold' >저장</button>
          </form>
        </Form>
       </Tabs>
    </div>
  )
}

export default Edit
