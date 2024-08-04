'use client'
import { useEffect, useState } from 'react';
import Slider from './_components/Slider';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInvitation } from '@/lib/features/invitation/invitationSlice';

export default function Home() {
  const data = useUser()
  const dispatch = useDispatch();
  const [invitationCount, setInvitationCount] = useState(0);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const getInvitationInfo = async () => {
    try {
      const {data} = await axios.get(`/api/invitation/`)
      if(data) {
        dispatch(setInvitation(data.invitations))
        setInvitationCount(data.invitations.length)
      }
    } catch(error) {
      console.error('초대장 정보 조회 실패', error)
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  }

  useEffect(() => {
      getInvitationInfo();
  },[data])

  return (
    <>
      <div className="p-[1rem]">
        {/* <p className="text-slate-500 pb-1">Make Your Own Invitation Page</p> */}
        <h1 className="text-slate-900 text-2xl font-bold pt-4 pb-3 font-[Menlo]">
          Invite U
        </h1>
        <div className="text-slate-400 w-100 h-auto text-left">
          <p>당신만의 특별한 초대장을 만들어보세요<br/>
            하나뿐인 초대장으로 소중한 사람들을 초대하세요
          </p>
          {/* 서비스 소개 일러스트 */}
          <img src='/img/weddingIntro.png' width={350} height={350} className='py-4'/>
        </div>
      </div>
      <button className="m-4 p-3 border-2 rounded-3xl shadow-sm">
        초대장 만들기
      </button>
      {invitationCount !=0 && (
        <Link
          href="/list"
          className="m-4 mt-0 p-3 bg-slate-800 border-2 border-slate-800 text-white rounded-3xl"
        >
          내 초대장 {invitationCount}
        </Link>
      )}
      <div className="mt-10 bg-slate-100 h-[400px]">
        <Slider />
      </div>
    </>
  )
}
