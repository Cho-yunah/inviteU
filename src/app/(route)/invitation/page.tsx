import React from 'react'
import styles from '../../page.module.scss'
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2'
import ListComponent from '@/app/_components/list/List'
import Link from 'next/link'

async function getInvitationList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invitation`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('초대장 정보 조회에 실패했습니다.')
  }
  const data = await res.json()
  return data
}

interface ListProps {
  initialData: any[]
}

const List: React.FC<ListProps> = async ({ initialData }) => {
  let listData: any[] = []

  try {
    listData = await getInvitationList()
    console.log('list_Data', listData)
  } catch (error) {
    console.error('초대장 정보 조회 실패', error)
    return (
      <div className="p-2">
        <div className="mt-6 w-full text-center">
          <button
            className={[styles.mainButton, 'rounded-[10px]', 'text-sm', 'shadow-sm'].join(' ')}
          >
            <Link href="/invitation/new">+ 초대장 만들기</Link>
          </button>
        </div>
        <div>
          <div className="my-10 mx-5 p-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
            <HiOutlineArchiveBoxXMark size={35} color="gray" />
            <br />
            <p className="text-sm text-gray-500">저장된 초대장이 없습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return <ListComponent initialData={listData} />
}

export default List
