'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabase/browser'

const KakaoCallback = () => {
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const codeVerifier = localStorage.getItem('code_verifier') // 꺼내기

      if (!codeVerifier) {
        console.error('Code verifier가 없습니다.')
        return
      }
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('세션 가져오기 실패:', error.message)
        return
      }

      console.log('세션 데이터:', data)

      if (data?.session) {
        router.push('/') // 로그인 성공 후 리디렉션
      } else {
        console.error('세션이 없습니다.')
      }
    }

    fetchSession()
  }, [router])

  return (
    <div className="w-full flex justify-center items-center mt-20">
      {/* <Loader /> */}
      <iframe src="https://lottie.host/embed/c546dc9a-c34e-4061-ba9e-7740c28e4e95/UP68lLvxaN.json"></iframe>
    </div>
  )
}

export default KakaoCallback
