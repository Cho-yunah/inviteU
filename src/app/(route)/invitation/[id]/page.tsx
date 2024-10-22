'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { z } from 'zod'
import styles from '../edit.module.scss'
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
import { invitationFormSchema } from '@/app/_types/invitationFormSchema'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Edit = () => {
  const user = useUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const currentInvitation = useSelector((state: RootState) => state.invitation.selected)

  const [contentsInfo, setContentsInfo] = useState<ContentDataType[]>(
    currentInvitation?.contents || [],
  )
  const [checkedSlide, setCheckedSlide] = useState(currentInvitation?.background_image || '')
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
    console.log(currentInvitation)
    if (currentInvitation) {
      form.reset({
        ...currentInvitation,
        contents: currentInvitation.contents || [],
      })
    }
  }, [currentInvitation, form])

  // 유저 ID를 폼에 설정
  useEffect(() => {
    if (user) {
      form.setValue('user_id', user.id)
    }
  }, [user, form])

  // 폼 제출 핸들러
  async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
    console.log(form.getValues())
    try {
      // 콘텐츠 정보를 폼 값에 추가
      form.setValue('id', currentInvitation?.id || '')
      form.setValue('contents', [...contentsInfo])

      const transformedValues = {
        ...values,
        contents: JSON.stringify(values.contents),
      }

      const response = await axios.put('/api/invitation', transformedValues)
      const invitationId = response.data.id // 생성된 초대장 ID

      // dispatch(setSelectedInvitation({ ...values, id: currentInvitation?.id || '' }))

      toast.success('🎉 초대장 저장에 성공했습니다 🎉')
      router.replace(`/invitation/${invitationId}/preview`) // 미리보기 페이지로 이동
    } catch (error) {
      console.error('초대장 저장 실패', error)
      toast.error('초대장 저장 실패')
    }
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
              id="saveButton"
              className="absolute top-[-9px] right-2 z-100 bg-gray-700 px-[14px] py-2 rounded-md text-white font-semibold"
            >
              저장함
            </button>
          </form>
        </Form>
      </Tabs>
      <PreviewModal
        form={form}
        contentsInfo={contentsInfo}
        isOpen={showPreviewModal}
        onClose={onClosePreviewModal}
      />
    </div>
  )
}

export default Edit
