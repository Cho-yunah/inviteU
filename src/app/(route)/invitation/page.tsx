'use client'

import React, { useEffect, useState } from 'react';
import styles from "../../page.module.css";
import ListItem from '@/app/_components/list/ListItem';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setInvitationList } from '@/lib/features/invitation/invitationSlice';
import Loader from '@/app/_components/common/Loader';
import { useRouter } from 'next/navigation';
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { useAuthState } from '@/app/_components/common/AuthContext';
import { toast } from 'react-toastify';

const List = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {session} = useAuthState();

  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);

  const handleMoveEditPage=() => {
    router.push('/invitation/new')
  }

  const getInvitationInfo = async () => {
    try {
      const {data} = await axios.get(`/api/invitation`)
      if(data) {
        dispatch(setInvitationList(data))
        setListData(data)
        localStorage.setItem("invitationCount", data?.length);
      }
    } catch(error) {
      console.error('초대장 정보 조회 실패', error)
      toast.error( "초대장 정보 조회에 실패했습니다.")    
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  }

  useEffect(() => {
    if(session?.access_token != null) {
      getInvitationInfo();
    } else {
      setLoading(false)
    }
  },[session?.access_token])

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
            {listData?.length === 0 ? (
              <div className='my-10 mx-5 p-10 flex flex-col items-center justify-center bg-gray-100 rounded-xl'>
                <HiOutlineArchiveBoxXMark size={35} color='gray' /><br/>
                <p className='text-sm text-gray-500'>저장된 초대장이 없습니다.</p>
              </div>
            ) : (
              listData?.map((item: any) => (
                <ListItem key={item.id} item={item} />
              ))
            )}
          </div>
        )}
    </div>
  )
}

export default List;