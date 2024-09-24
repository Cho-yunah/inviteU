'use client'

import React, { useEffect, useState } from 'react';
import styles from "../../page.module.css";
import ListItem from '@/app/_components/list/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setInvitation } from '@/lib/features/invitation/invitationSlice';
import Loader from '@/app/_components/common/Loader';
import { useRouter } from 'next/navigation';
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";


const List = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const listData = useSelector((state: any)=> state.invitation)
  const [loading, setLoading] = useState(true);

  const getInvitationInfo = async () => {
    try {
      const {data} = await axios.get(`/api/invitation/`)
      console.log(data)
      if(data) {
        dispatch(setInvitation(data.invitations))
      }
    } catch(error) {
      console.error('초대장 정보 조회 실패', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoveEditPage=() => [
    router.push('/edit')
  ]

  useEffect(() => {
    if(listData.length === 0) {
      getInvitationInfo();
    } else {
      setLoading(false)
    }
  },[listData])

  return (
    <div >
        <div className='p-4'>
          <h1 className='py-2 text-2xl font-bold text-gray-700'>내 초대장</h1>
        </div>
        <div className='w-full text-center'>
          <button 
            onClick={handleMoveEditPage}
            className={[styles.mainButton, 'rounded-[10px]', 'text-sm','shadow-sm'].join(' ')}>
            + 초대장 만들기
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          // 로딩이 완료되면 리스트 데이터 렌더
          <div>
            {listData.length === 0 ? (
              <div className='my-10 mx-5 p-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl'>
                <HiOutlineArchiveBoxXMark size={35} color='gray' /><br/>
                <p className='text-sm text-gray-500'>저장된 초대장이 없습니다.</p>
              </div>
            ) : (
              listData.map((item: any, index: number) => (
                <ListItem key={item.id} item={item} />
              ))
            )}
          </div>
        )}
    </div>
  )
}

export default List;