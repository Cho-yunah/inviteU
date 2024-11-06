import { setSelectedInvitation } from '@/lib/store/features/invitation/invitationSlice'
import { invitationFormSchema } from '@/types/invitationFormSchema'
import { ContentDataType } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'

interface UseInvitationFormProps {
  initialData: any
  apiMethod: 'POST' | 'PUT'
}

export const useInvitationForm = ({ initialData, apiMethod }: UseInvitationFormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const form = useForm<z.infer<typeof invitationFormSchema>>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      user_id: '',
      title: '',
      custom_url: '',
      date: '',
      time: '',
      primary_image: '',
      background_image: '',
      contents: [] as ContentDataType[],
    },
  })

  const onSubmit = async (values: z.infer<typeof invitationFormSchema>) => {
    form.setValue('contents', [...initialData])

    const transformValues = {
      ...values,
      contents: JSON.stringify(values.contents),
    }
    if (transformValues) {
      try {
        const response = await axios({
          method: apiMethod,
          data: transformValues,
        })

        const invitationId = response.data.id // 생성된 초대장의 ID
        dispatch(setSelectedInvitation({ ...values, contents: [...initialData] })) // 선택된 초대장으로 설정

        toast.success('🎉 초대장 저장에 성공했습니다 🎉')
        router.replace(`/invitation/${invitationId}/preview`) // 미리보기 페이지로 이동
        router.refresh()
      } catch (error) {
        console.error('초대장 저장 실패', error)
        toast.error('초대장 저장 실패')
      }
    }
  }
  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
