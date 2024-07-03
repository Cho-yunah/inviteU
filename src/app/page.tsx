'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '@/supabase/browser'

export default function Home() {
  const data = useUser()
  const logInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
    if (error) throw error.message
    console.log('로그인 성공', data)
  }
  console.log(data, 'data')
  return (
    <main className={styles.main}>
      <div className={styles.description}>
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
          <p className="overflow-scroll">{JSON.stringify(data)}</p>
        </div>
      </div>
    </main>
  )
}
