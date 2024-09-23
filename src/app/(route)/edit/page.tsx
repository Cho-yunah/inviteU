'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from './edit.module.scss'
import BaseInfo from '@/app/_components/edit/BasicInfo'
import ContentsInfo from '@/app/_components/edit/ContentsInfo'
import Background from '@/app/_components/edit/Background'
import {Form} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  date: z.string().date("날짜(또는 시간)를 입력해주세요."),
  image_urls: z.string().min(3, {
    message: "이미지 URL을 입력해주세요.",
  }),
})

const Edit = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      custom_url:"",
      date: new Date().toISOString(),
      image_urls:'',
    },
  })

  return (
    <div className='w-[375px] '>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className='grid w-full grid-cols-3 bg-gray-100 p-0'>
            <TabsTrigger className={styles.tabTrigger} value="basic">기본 정보</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="contents">콘텐츠</TabsTrigger>
            <TabsTrigger className={styles.tabTrigger} value="backgrond">배경</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <TabsContent className='px-6 py-2' value="basic">
            <BaseInfo form={form} formSchema={formSchema}/>
          </TabsContent>
          <TabsContent className='px-6 py-2' value="contents">
            <ContentsInfo/>
          </TabsContent>
          <TabsContent className='px-6 py-2' value="backgrond">
            <Background />
          </TabsContent>
        </Form>
       </Tabs>
    </div>
  )
}

export default Edit
