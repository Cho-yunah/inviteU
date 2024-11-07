import React from 'react'
import SupabaseProvider from '@/supabase/provider'
import ErrorBoundary from '@/app/_components/common/errorBoundary'
import AuthContext from '@/app/_components/common/AuthContext'
import ReduxProvider from './StoreProvider'
import KakaoInitializer from './_components/common/kakao/KakaoInitializer'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ErrorBoundary>
      <SupabaseProvider>
        <AuthContext>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthContext>
        <KakaoInitializer />
      </SupabaseProvider>
    </ErrorBoundary>
  )
}
