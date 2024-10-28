'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUser } from '@supabase/auth-helpers-react'
import styles from '../edit.module.scss'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BaseInfo from '@/app/_components/edit/basicInfo'
import ContentsInfo from '@/app/_components/edit/contentsInfo'
import PreviewModal from '@/app/_components/edit/previewModal'
import Background from '@/app/_components/edit/background'
import { invitationFormSchema } from '@/app/_types/invitationFormSchema'
import {
  InvitationStateType,
  setSelectedInvitation,
} from '@/lib/features/invitation/invitationSlice'
import { RootState } from '@/lib/store'
import { ContentDataType } from '@/lib/types'

const EditInvitation = () => {
  const user = useUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const currentInvitation = useSelector((state: RootState) => state.invitation.selected)

  const [contentsInfo, setContentsInfo] = useState<ContentDataType[]>(
    currentInvitation?.contents || [],
  )
  const [checkedSlide, setCheckedSlide] = useState(currentInvitation?.background_image || '')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewData, setPreviewData] = useState<InvitationStateType>({
    user_id: '',
    custom_url: '',
    date: '',
    time: '',
    title: '',
    background_image: '',
    primary_image: '',
  })

  const onClosePreviewModal = () => setShowPreviewModal(false)

  const form = useForm<z.infer<typeof invitationFormSchema>>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      ...currentInvitation,
      contents: currentInvitation?.contents || [],
    },
  })

  const handleOpenPreview = useCallback(() => {
    const formData = form.getValues()
    console.log('모달이 열림', formData)
    setPreviewData({ ...formData, contents: contentsInfo })
    setShowPreviewModal(true)
  }, [form, contentsInfo])

  // 폼 제출 핸들러
  async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
    try {
      form.setValue('contents', contentsInfo)
      form.setValue('id', currentInvitation?.id || '')

      const transformedValues = {
        ...values,
        contents: JSON.stringify(contentsInfo),
      }

      const response = await axios.put('/api/invitation', transformedValues)
      const invitationId = response.data.id // 생성된 초대장 ID
      dispatch(setSelectedInvitation({ ...values, contents: [...contentsInfo] })) // 선택된 초대장으로 설정
      toast.success('🎉 초대장 저장에 성공했습니다 🎉')
      router.replace(`/invitation/${invitationId}/preview`) // 미리보기 페이지로 이동
      router.refresh()
    } catch (error) {
      console.error('초대장 저장 실패', error)
      toast.error('초대장 저장 실패')
    }
  }

  useEffect(() => {
    if (currentInvitation) {
      form.reset({
        ...currentInvitation,
        contents: currentInvitation.contents || [],
      })
      setPreviewData(currentInvitation)
    }
  }, [currentInvitation, form])

  // 유저 ID를 폼에 설정
  useEffect(() => {
    if (user) {
      form.setValue('user_id', user.id)
    }
  }, [user, form])

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
                onOpenPreview={handleOpenPreview}
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
        contentsInfo={contentsInfo}
        isOpen={showPreviewModal}
        onClose={onClosePreviewModal}
        previewData={previewData}
      />
    </div>
  )
}

export default React.memo(EditInvitation)
