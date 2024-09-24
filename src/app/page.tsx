'use client'
import { useEffect, useState } from 'react';
import Slider from './_components/main/Slider';
import { useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setInvitation } from '@/lib/features/invitation/invitationSlice';
import { useRouter } from 'next/navigation';
import { useAuthState } from './_components/common/AuthContext';

export default function Home() {
  const userData = useUser()
  const router = useRouter();
  const dispatch = useDispatch();
  const {session} = useAuthState();

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [invitationCount, setInvitationCount] = useState(0);

  const getInvitationInfo = async () => {
    try {
      const {data} = await axios.get(`/api/invitation`)
      console.log(data)
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

  const handleMoveEditPage = () => {
    router.push('/edit')
  }
  const handleMoveListPage = () => {
    router.push('/list')
  }

  useEffect(() => {
    console.log('hello',session)
    if(session?.access_token != null) {
      getInvitationInfo();
    }
  },[session])

  return (
    <>
      <div className="p-4">
        <h1 className="pb-3 pt-4 font-[Menlo] text-2xl font-bold text-slate-900">
          Invite U
        </h1>
        <div className="w-full h-auto text-left text-slate-400">
          <p>당신만의 특별한 초대장을 만들어보세요<br/>
            하나뿐인 초대장으로 소중한 사람들을 초대하세요
          </p>
          {/* 서비스 소개 일러스트 */}
          <img src='/img/weddingIntro.png' width={350} height={350} className='py-4'/>
        </div>
      </div>
      <button onClick={handleMoveEditPage}
          className="m-4 rounded-3xl border-2 p-3 shadow-sm" 
        >
        초대장 만들기
      </button>
      {/* <ListButton handleMoveListPage={handleMoveListPage} invitationCount={invitationCount} /> */}
      {session?.access_token && (
        <button onClick={handleMoveListPage}
          className="m-4 mt-0 rounded-3xl border-2 border-slate-800 bg-slate-800 p-3 text-white"
        >
          내 초대장 {invitationCount}
        </button>
      )}
      <div className="mt-10 h-[400px] bg-slate-100">
        <Slider />
      </div>
    </>
  )
}
