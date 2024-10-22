'use client'

import React, { useState } from 'react'
import ListItem from './ListItem'
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2'
import Link from 'next/link'
import styles from '../../page.module.scss'

interface ListProps {
  initialData: any[]
}

const List = ({ initialData }: ListProps) => {
  const [listData, setListData] = useState(initialData)

  // 삭제된 항목만 제거
  const handleRemove = (id: string) => {
    setListData(listData.filter((item) => item.id !== id))
  }

  return (
    <div className="p-2">
      <div className="mt-6 w-full text-center">
        <button className={[styles.mainButton, 'rounded-[10px]', 'text-sm', 'shadow-sm'].join(' ')}>
          <Link href="/invitation/new">+ 초대장 만들기</Link>
        </button>
      </div>
      {listData.length === 0 ? (
        <div className="my-10 mx-5 p-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl">
          <HiOutlineArchiveBoxXMark size={35} color="gray" />
          <p className="text-sm text-gray-500">저장된 초대장이 없습니다.</p>
        </div>
      ) : (
        listData.map((item: any) => <ListItem key={item.id} item={item} onRemove={handleRemove} />)
      )}
    </div>
  )
}

export default List
