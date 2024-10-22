'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import styles from '../edit.module.scss'
import { z } from 'zod'
import BaseInfo from '@/app/_components/edit/basicInfo'
import ContentsInfo from '@/app/_components/edit/contentsInfo'
import Background from '@/app/_components/edit/background'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@supabase/auth-helpers-react'
import { ContentDataType } from '@/lib/types'
import axios from 'axios'
import PreviewModal from '@/app/_components/edit/previewModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import dayjs from 'dayjs'
import { invitationFormSchema } from '@/app/_types/invitationFormSchema'
import { toast } from 'react-toastify'

interface AsyncDefaultValues {
  user_id: string
  title: string
  custom_url: string
  date: string
  time: string
  primary_image: string
  background_image: string
  contents: ContentDataType[]
}

const Edit = () => {
  const user = useUser()
  const dispatch = useDispatch()
  const currentInvitation = useSelector((state: RootState) => state.invitation.selected)

  const [contentsInfo, setContentsInfo] = useState<ContentDataType[]>(
    currentInvitation?.contents || [],
  )
  const [checkedSlide, setCheckedSlide] = useState<number>(0)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const onClosePreviewModal = () => setShowPreviewModal(false)

  const form = useForm<z.infer<typeof invitationFormSchema>>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      ...currentInvitation,
      contents: currentInvitation?.contents || [],
    },
  })

  useEffect(() => {
    if (currentInvitation) {
      form.reset({
        ...currentInvitation,
        contents: currentInvitation.contents || [],
      })
    }
  }, [currentInvitation, form])

  useEffect(() => {
    if (user) {
      form.setValue('user_id', user.id)
    }
  }, [user, form])

  async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
    // form.setValue('contents', [...contentsInfo])
    //  dispatch(setInvitation(values))

    const transformValues = {
      ...values,
      contents: JSON.stringify(values.contents),
    }

    //  if (transformValues) {
    //    try {
    //     //  const response = await axios.put('/api/invitation', transformValues)
    //     //  const invitationId = response.data.id // 생성된 초대장의 ID

    //      toast.success('🎉 초대장 저장에 성공했습니다 🎉')
    //     //  router.replace(`/invitation/${invitationId}/preview`) // 미리보기 페이지로 이동
    //    } catch (error) {
    //      console.error('초대장 저장 실패', error)
    //      toast.error('초대장 저장 실패')
    //    }
    //  }
  }

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TabsContent className="px-6 py-2" value="basic">
              <BaseInfo form={form} formSchema={invitationFormSchema} />
            </TabsContent>
            <TabsContent className="px-6 py-2" value="contents">
              <ContentsInfo
                contentsInfo={contentsInfo}
                setContentsInfo={setContentsInfo}
                setShowPreviewModal={setShowPreviewModal}
                onClose={onClosePreviewModal}
              />
            </TabsContent>
            <TabsContent className="px-6 py-2" value="background">
              <Background
                form={form}
                checkedSlide={checkedSlide}
                setCheckedSlide={setCheckedSlide}
              />
            </TabsContent>
            <button
              type="submit"
              className="absolute top-[-9px] right-2 z-100 bg-gray-700 px-[14px] py-2 rounded-md text-white font-semibold"
            >
              저장함
            </button>
          </form>
        </Form>
      </Tabs>
      <PreviewModal form={form} isOpen={showPreviewModal} onClose={onClosePreviewModal} />
    </div>
  )
}
export default Edit
