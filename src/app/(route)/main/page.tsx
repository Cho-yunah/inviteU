'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '@/supabase/browser'

import Link from 'next/link';
import Slider from '@/app/_components/Slider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const data = useUser()
  const router = useRouter();
  // const logInWithKakao = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'kakao',
  //   })
  //   if (error) throw error.message;
  //   else {router.push('/list')}
  //   console.log('로그인 성공', data)
  // }

  const getInvitationInfo = async () => {
    console.log('hello')
    // const { data, error: sessionError } = await supabase.auth.getSession();
    // console.log(data)
    try {
      const response = await axios.get(`http://localhost:3000/api/invitation/`)
      console.log(response)
    } catch(error) {
      console.error('초대장 정보 조회 실패', error)
    }
  
  }

  useEffect(() => {
    getInvitationInfo();
    console.log('data',data)
      // if (sessionError) throw new Error(sessionError.message);
    // if (data) {
      // 초대장 갯수 조회 
    // }
  },[])

  return (
    <>

      <div className="p-[1rem]">
        <p className="text-slate-500 pb-1">부소개글</p>
        <h1 className="text-slate-900 text-2xl  font-bold pt-2 pb-2 font-[Menlo]">
          Invite U
        </h1>
        <div className="text-slate-400 bg-pink-100 w-100 h-[250px] text-center p-8">
          서비스 소개 일러스트
        </div>
      </div>
      <button className="m-4 p-3 border-2 rounded-3xl shadow-sm">
        초대장 만들기
      </button>
      {true && (
        <Link
          href="/list"
          className="m-4 mt-0 p-3 bg-slate-800 border-2 border-slate-800 text-white rounded-3xl"
        >
          내 초대장 1
        </Link>
      )}
      <div className="mt-10 bg-slate-100 h-[400px]">
        <Slider />
      </div>
    </>
  )
}
