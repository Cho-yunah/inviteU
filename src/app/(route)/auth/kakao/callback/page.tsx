'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabase/browser'

const KakaoCallback = () => {
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()
      if (error) {
        console.error('세션 가져오기 실패:', error.message)
        return
      }
      console.log('세션 데이터:', sessionData)

      // 세션이 있으면 메인 페이지로 이동
      if (sessionData?.session) {
        router.push('/')
      }
    }

    fetchSession()
  }, [router])

  return <p>로그인 처리 중...</p>
}

export default KakaoCallback
