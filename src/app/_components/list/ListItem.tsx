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
      className="relative m-5 rounded-md bg-gray-50 shadow-md cursor-pointer"
    >
      <p className="absolute h-full w-2 rounded-l-md bg-red-400"></p>
      <div className="p-3 pl-5">
        <p className="text-sm py-1 font-bold text-gray-800">{item.title}</p>
        <div className="flex justify-between mt-1">
          <div className="">
            <div className="flex items-center text-xs text-gray-700 ">
              <IoIosLink size={15} className="text-gray-400 mr-1" />
              <span> {item.custom_url}</span>
            </div>
            <div className="flex items-center justify-center text-xs text-gray-700 ">
              <CiCalendar size={15} className="text-gray-400 mr-1" />
              <span className="mt-[2px] align-bottom">
                {' '}
                {dayjs(item.date).format('YYYY.MM.DD')}
              </span>
            </div>
          </div>
          <div className="m-1 flex w-14 items-end justify-between">
            <button
              onClick={handleClickShare}
              className="flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm"
            >
              <CiShare2 size="15" />
            </button>
            <button
              onClick={handleClickDelete}
              className="flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm"
            >
              <CiTrash size="15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

ListItem.displayName = 'ListItem'
export default ListItem
