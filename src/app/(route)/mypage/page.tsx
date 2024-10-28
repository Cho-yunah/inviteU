'use client'
import { supabase } from '@/supabase/browser'
import { useUser } from '@supabase/auth-helpers-react'
import React from 'react'

const Mypage = () => {
  const data = useUser()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    console.log('error', error)
    alert('로그아웃 되었습니다')
  }

  const handleWithdrawalmembership = () => {
    console.log('회원탈퇴')
  }

  return (
    <div className="my-3 ">
      <div className="p-4">
        <h2 className="font-bold">닉네임</h2>
        <form className="flex w-full">
          <input type="text" className="my-1 mr-1 grow border border-gray-600 p-1 px-2" />
          <button className="m-1 border border-gray-400 px-2 py-1 font-semibold ">저장</button>
        </form>
        <p className="my-1 text-xs text-gray-400">
          닉네임은 카카오 기본 정보에 따라 등록되며, 수정할 수 있어요
        </p>
      </div>
      <div className="my-3 px-4">
        <h1 className="font-bold">기본 정보</h1>
        <ul className="my-1 rounded-md bg-gray-100 p-3">
          <li className="flex p-1">
            <span className="grow text-gray-400">이름</span>
            <span className="grow-[3] text-gray-600">{data?.user_metadata.full_name}</span>
          </li>
          <li className="flex p-1">
            <span className="grow-[1.3] text-gray-400">이메일</span>
            <span className="grow-[3] text-gray-600">{data?.user_metadata.email}</span>
          </li>
        </ul>
        <p className="my-2 text-xs text-gray-400">
          {' '}
          * 카카오 가입계정은 기본 정보를 수정할 수 없어요
        </p>
      </div>
      <div className="mb-5 mt-6 w-full text-center">
        <button className="text-xs underline" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <div className="h-2 w-full bg-gray-100"></div>
      <div className="mb-5 mt-6 w-full text-center">
        <button className="text-xs text-gray-400" onClick={handleWithdrawalmembership}>
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}

export default Mypage
