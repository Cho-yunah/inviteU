'use client'

import React, { useEffect } from 'react';
import styles from "../../page.module.css";
import ListItem from '../../_components/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setInvitation } from '@/lib/features/invitation/invitationSlice';


const List = () => {
  const dispatch = useDispatch();

  const listData = useSelector((state: any)=> state.invitation)
  console.log('listData', listData)

  const getInvitationInfo = async () => {
    try {
      const {data} = await axios.get(`/api/invitation/`)
      if(data) {
        dispatch(setInvitation(data.invitations))
      }
    } catch(error) {
      console.error('초대장 정보 조회 실패', error)
    } 
  }

  useEffect(() => {
    if(listData.length === 0) {
      getInvitationInfo();
    }
  },[])

  return (
    <div >
        <div className='p-[1rem]'>
          <h1 className='text-gray-700 text-2xl font-bold pt-2 pb-2'>내 초대장</h1>
        </div>
        <div className='w-full text-center'>
          <button className={[styles.mainButton, 'rounded-[10px]', 'text-sm','shadow-sm'].join(' ')}>+ 초대장 만들기</button>
        </div>
        {listData.map((item: any, index: number) => (
          <ListItem key={index} item={item} />
        ))}
        {/* <ListItem /> */}
    </div>
  )
}

export default List;