'use client'
// import { useUser } from '@supabase/auth-helpers-react'
// import { supabase } from '@/supabase/browser'

import Link from 'next/link';
import Slider from '@/app/_components/main/Slider'


export default function Main() {

  return (
    <>
      <div className="p-4">
        <p className="pb-1 text-slate-500">부소개글</p>
        <h1 className="py-2 font-[Menlo]  text-2xl font-bold text-slate-900">
          Invite U
        </h1>
        <div className="w-full h-[250px] bg-pink-100 p-8 text-center text-slate-400">
          서비스 소개 일러스트
        </div>
      </div>
      <button className="m-4 rounded-3xl border-2 p-3 shadow-sm">
        초대장 만들기
      </button>
      {true && (
        <Link
          href="/invitation"
          className="m-4 mt-0 rounded-3xl border-2 border-slate-800 bg-slate-800 p-3 text-white"
        >
          내 초대장 1
        </Link>
      )}
      <div className="mt-10 h-[400px] bg-slate-100">
        <Slider />
      </div>
    </>
  )
}
