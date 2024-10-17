'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import styles from '../edit.module.scss'
import BaseInfo from '@/app/_components/edit/basicInfo/index'
import ContentsInfo from '@/app/_components/edit/contentsInfo/index'
import Background from '@/app/_components/edit/background/index'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUser } from '@supabase/auth-helpers-react'
import { ContentDataType } from '@/lib/types'

const formSchema = z.object({
  user_id: z.string().min(10),
  title: z
    .string()
    .min(7, {
      message: '초대장 제목은 7자 이상 입력해주세요.',
    })
    .max(60, {
      message: '초대장 제목은 60자 이하로 입력해주세요.',
    }),
  custom_url: z
    .string()
    .min(6, {
      message: '6자 이상 입력해주세요.',
    })
    .refine((value) => /^[a-z-]+$/g.test(value), {
      message: '커스텀 주소는 영어 소문자로 입력해주세요.',
    }),
  date: z.string().min(6, { message: '날짜(또는 시간)를 입력해주세요.' }),
  primary_image: z.string().min(3, {
    message: '이미지 URL을 넣어주세요.',
  }),
  background_image: z.string().min(3, {
    message: '배경 이미지를 선택해주세요.',
  }),
  contents: z.array(z.object({})).min(1, { message: '콘텐츠를 추가해주세요.' }),
})

const Edit = () => {
  const data = useUser()
  const [contentsInfo, setContentsInfo] = useState<ContentDataType[] | []>([])
  const [checkedSlide, setCheckedSlide] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      title: '',
      custom_url: '',
      date: '',
      primary_image: '',
      background_image: '',
      contents: [],
    },
  })
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log('values', values, form.getValues())
  //   // form.handleSubmit(onSubmit)
  // }

  return (
    <div className="w-[375px] min-h-[375px] overflow-hidden">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-0">
          <TabsTrigger className={styles.tabTrigger} value="basic">
            기본 정보
          </TabsTrigger>
          <TabsTrigger className={styles.tabTrigger} value="contents">
            콘텐츠
          </TabsTrigger>
          <TabsTrigger className={styles.tabTrigger} value="background">
            배경
          </TabsTrigger>
        </TabsList>
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}

          <TabsContent className="px-6 py-2" value="basic">
            <BaseInfo form={form} formSchema={formSchema} />
          </TabsContent>
          <TabsContent className="px-6 py-2" value="contents">
            <ContentsInfo contentsInfo={contentsInfo} setContentsInfo={setContentsInfo} />
          </TabsContent>
          <TabsContent className="px-6 py-2" value="background">
            <Background form={form} checkedSlide={checkedSlide} setCheckedSlide={setCheckedSlide} />
          </TabsContent>
          {/* <button type="submit"  className='absolute top-[-5px] right-2 z-1000' >저장</button> */}

          {/* </form> */}
        </Form>
      </Tabs>
    </div>
  )
}

export default Edit
