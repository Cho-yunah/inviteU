'use client'
import { supabase } from '@/supabase/browser'
import { User, useUser } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'

/**@description TODO: svgr 컴포넌트 추가하기 */
const LoginContent = () => {
  // for display
  const logInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
    if (error) throw error.message
    console.log('로그인 성공', data)
  }

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <button
        onClick={logInWithKakao}
        className="w-full bg-[#FEE500] h-[50px] flex items-center justify-center gap-2 rounded-lg"
      >
        <Image
          width={18}
          height={18}
          alt="kakao-logo"
          src="./kakao-logo.svg"
          className=" fill-black"
        ></Image>
        <p className="text-black text-base">카카오로 시작하기</p>
      </button>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default LoginContent
