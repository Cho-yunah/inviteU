'use client'

import { supabase } from '@/supabase/browser'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js' // Import the Session type from the Supabase library

type SupabaseContext = {
  session: Session | null
  isLoading: boolean
}

// @ts-ignore
const Context = createContext<SupabaseContext>()

//TODO get stripe subscription data
export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const data = useUser()
  // const [supabase] = useState(() => createBrowserClient());
  const [session, setSession] = useState<null | Session>(null)
  const [isLoading, setLoading] = useState(true)

  // Supabase 세션 상태 변경 핸들링
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event)
      if (event === 'SIGNED_OUT') {
        setSession(null)
      } else if (session) {
        setSession(session)
      }

      setLoading(false) // 세션 설정 이후 로딩 종료
    })

    // 컴포넌트 언마운트 시 이벤트 정리
    return () => {
      authListener?.subscription.unsubscribe() // access the subscription property before calling unsubscribe()
    }
  }, [])

  // 새로고침 / 페이지로 이동되지 않도록 해야함
  // useEffect(() => {
  //   if (!data) {
  //     console.log('not found user')
  //     router.push('/')
  //   }
  // }, [data])

  return (
    <Context.Provider value={{ session, isLoading }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useAuthState = () => useContext(Context)
