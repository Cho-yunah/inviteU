'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { IoIosLink } from 'react-icons/io'
import { CiCalendar, CiShare2, CiTrash } from 'react-icons/ci'
import { setSelectedInvitation } from '@/lib/features/invitation/invitationSlice'
import KakaoShareButton from '@/app/_components/common/kakao/KakaoShareButton'

interface ListItemProps {
  item: any
  onRemove: (id: string) => void
}

const ListItem = React.memo(({ item, onRemove }: ListItemProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  // 수정 페이지로 이동하는 핸들러
  const handleMoveEdit = useCallback(() => {
    dispatch(setSelectedInvitation(item))
    router.push(`/invitation/${item.id}`)
  }, [dispatch, item, router])

  const handleClickShare = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation() // 이벤트 전파 차단
      setLoading(true)
      try {
        await navigator.clipboard.writeText(`https://invite-u.vercel.app/${item.custom_url}`)
        toast.success('클립보드에 링크가 복사되었습니다.')
      } catch (e) {
        alert('복사에 실패하였습니다')
      }
    },
    [item.custom_url],
  )

  const handleClickDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      setLoading(true)

      try {
        const res = await axios.delete(
          `/api/invitation?user_id=${item.user_id}&invitation_id=${item.id}`,
        )
        if (res.status != 200) throw new Error('삭제 실패')

        toast.success('해당 초대장이 삭제되었습니다.')
        onRemove(item.id)
      } catch (error) {
        toast.error('해당 항목 삭제에 실패했습니다.')
        console.error('삭제 실패', error)
      } finally {
        setLoading(false)
      }
    },
    [item.id, item.user_id, onRemove],
  )

  return (
    <div
      onClick={handleMoveEdit}
      className="relative m-5 rounded-xl bg-white shadow-md cursor-pointer transition-all duration-300 border-t-[1px] border-gray-100 hover:border-gray-100 hover:shadow-lg hover:scale-105"
    >
      {/* 왼쪽 레드 포인트 바 */}
      <p className="absolute h-full w-2 rounded-l-md bg-[#f8a1b5]"></p>

      {/* 리스트 본문 */}
      <div className="p-4 pl-6">
        <p className="text-sm font-bold text-gray-800">{item.title}</p>
        {/* URL과 날짜 */}
        <div className="flex justify-between mt-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-xs text-gray-600">
              <IoIosLink size={15} className="text-gray-400 mr-2" />
              <span>{item.custom_url}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <CiCalendar size={15} className="text-gray-400 mr-2" />
              <span>
                {dayjs(item.date).format('YYYY.MM.DD')} {item.time}
              </span>
            </div>
          </div>
          {/* 공유 및 삭제 버튼 */}
          <div className="flex items-center gap-4">
            <KakaoShareButton
              buttonStyle="icon"
              title={item.title}
              imageUrl={item.primary_image}
              date={item.date}
              time={item.time}
              invitationUrl={`${process.env.NEXT_PUBLIC_API_URL}/${item.custom_url}`}
              buttonId={`kakao-share-btn-${item.id}`} // 고유한 ID 전달
            />
            <button
              onClick={handleClickDelete}
              className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-md transition-all duration-300"
            >
              <CiTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

ListItem.displayName = 'ListItem'
export default ListItem
