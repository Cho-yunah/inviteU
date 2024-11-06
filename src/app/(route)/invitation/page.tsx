'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store/store'
import { setInvitationList } from '@/lib/store/features/invitation/invitationSlice'
import ListItem from '@/app/_components/list/ListItem'
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2'
import Link from 'next/link'
import axios from 'axios'
import styles from '@/styles/page.module.scss'

const List = () => {
  const dispatch = useDispatch()
  const invitationList = useSelector((state: RootState) => state.invitation.list)

  const [loading, setLoading] = useState(true)

  const fetchInvitations = async () => {
    try {
      const { data } = await axios.get(`/api/invitation`)
      dispatch(setInvitationList(data)) // Redux에 리스트 저장
    } catch (error) {
      console.error('초대장 정보를 불러오지 못했습니다.', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvitations()
  }, [])

  const handleRemove = (id: string) => {
    // 삭제된 항목만 Redux 리스트에서 제거
    const updatedList = invitationList.filter((item) => item.id !== id)
    dispatch(setInvitationList(updatedList))
  }

  return (
    <div className="p-2">
      <div className="mt-6 w-full text-center">
        <button className={[styles.mainButton, 'rounded-[10px]', 'text-sm', 'shadow-sm'].join(' ')}>
          <Link href="/invitation/new">+ 초대장 만들기</Link>
        </button>
      </div>
      {loading ? (
        <div className="my-7 flex items-center justify-center">
          <iframe src="https://lottie.host/embed/c546dc9a-c34e-4061-ba9e-7740c28e4e95/UP68lLvxaN.json"></iframe>
        </div>
      ) : invitationList.length === 0 ? (
        <div className="m-5 p-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
          <HiOutlineArchiveBoxXMark size={35} color="gray" />
          <p className="text-sm text-gray-500">저장된 초대장이 없습니다.</p>
        </div>
      ) : (
        invitationList.map((item) => <ListItem key={item.id} item={item} onRemove={handleRemove} />)
      )}
    </div>
  )
}

export default List
