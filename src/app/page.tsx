'use client'
import { useEffect, useState } from 'react'
// import Slider from './_components/main/slider'
import { useUser } from '@supabase/auth-helpers-react'
import { useAuthState } from './_components/common/AuthContext'
import Link from 'next/link'

export default function Home() {
  const userData = useUser()
  const { session } = useAuthState()

  const [invitationCount, setInvitationCount] = useState(0)

  useEffect(() => {
    const checkSession = async () => {
      const count = localStorage.getItem('invitationCount')
      if (session?.access_token) {
        setInvitationCount(Number(count))
      }
    }
    checkSession()
  }, [session?.access_token])

  return (
    <>
      <div className="p-4">
        <h1 className="pb-3 pt-4 font-[Menlo] text-2xl font-bold text-slate-900">Invite U</h1>
        <div className="w-full h-auto text-left text-slate-400">
          <p>
            당신만의 특별한 초대장을 만들어보세요
            <br />
            하나뿐인 초대장으로 소중한 사람들을 초대하세요
          </p>
          <img src="/img/weddingIntro.png" width={350} height={350} className="py-4" />
        </div>
      </div>
      <button className="m-4 rounded-3xl border-2 p-3 shadow-sm">
        <Link href="/invitation/new">초대장 만들기</Link>
      </button>
      {session?.access_token && (
        <button className="m-4 mt-0 rounded-3xl border-2 border-slate-800 bg-slate-800 p-3 text-white">
          <Link href="/invitation">내 초대장 {invitationCount}</Link>
        </button>
      )}
      {/* <div className="mt-10 h-[400px] bg-slate-100">
        <Slider />
      </div> */}
    </>
  )
}
