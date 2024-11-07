'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import styles from '@/styles/page.module.scss'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BaseInfo from '@/app/_components/edit/basicInfo'
import ContentsInfo from '@/app/_components/edit/contentsInfo'
import Background from '@/app/_components/edit/background'
import PreviewModal from '@/app/_components/edit/previewModal'
import { ContentDataType } from '@/types/types'
import { invitationFormSchema } from '@/types/invitationFormSchema'
import { InvitationStateType } from '@/lib/store/features/invitation/invitationSlice'
import { useInvitationForm } from '@/hooks/useInvitationForm'
import SaveButton from '@/app/_components/common/buttons/SaveButton'

const NewInvitation = () => {
  const data = useUser()

  const [contentsInfo, setContentsInfo] = useState<ContentDataType[] | []>([])
  const [checkedSlide, setCheckedSlide] = useState<string>('')
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

  const { form, onSubmit } = useInvitationForm({ initialData: contentsInfo, apiMethod: 'POST' })

  const onClosePreviewModal = () => setShowPreviewModal(false)

  const handleOpenPreview = useCallback(() => {
    const formData = form.getValues()
    setPreviewData({ ...formData, contents: contentsInfo })
    setShowPreviewModal(true)
  }, [form, contentsInfo])

  useEffect(() => {
    form.setValue('contents', [...contentsInfo])
  }, [contentsInfo])

  useEffect(() => {
    data && form.setValue('user_id', data.id)
  }, [data && data.id])

  return (
    <div className="w-full min-h-[375px] overflow-hidden">
      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-3 bg-gray-100 p-0">
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
          <form onSubmit={onSubmit} className="px-5 py-3">
            <TabsContent value="basic">
              <BaseInfo form={form} formSchema={invitationFormSchema} />
            </TabsContent>
            <TabsContent value="contents">
              <ContentsInfo
                contentsInfo={contentsInfo}
                setContentsInfo={setContentsInfo}
                onOpenPreview={handleOpenPreview}
              />
            </TabsContent>
            <TabsContent value="background">
              <Background
                form={form}
                checkedSlide={checkedSlide}
                setCheckedSlide={setCheckedSlide}
              />
            </TabsContent>
            <SaveButton onSave={onSubmit} />
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
export default NewInvitation
