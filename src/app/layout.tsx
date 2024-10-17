import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.scss'
import styles from './page.module.scss'
import SupabaseProvider from '@/supabase/provider'
import ReduxProvider from './StoreProvider'
import Header from './_components/common/Header'
import ModalSetup from './_components/common/modal/ModalSetup'
import AuthContext from './_components/common/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from '@/app/_components/common/errorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invite U',
  description: 'Service for creating invitations',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/img/logo.png', // 브라우저의 즐겨찾기 아이콘
  },
  openGraph: {
    title: 'Invite U',
    description: 'Create personalized invitations with ease.',
    url: 'https://invite-u.vercel.app',
    siteName: 'Invite U',
    images: [
      {
        url: 'http://invite-u.com/og-image.jpg',
        width: 600,
        height: 700,
      },
    ],
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={inter.className}>
        <ErrorBoundary>
          <SupabaseProvider>
            <AuthContext>
              {/* 루트 레이아웃 - 모바일 사이즈 레이아웃 */}
              <div className="container relative">
                <Header />
                <main className={styles.main}>
                  <ReduxProvider>
                    <div className={styles.description}>{children}</div>
                  </ReduxProvider>
                </main>
                <ModalSetup />
                <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
              </div>
            </AuthContext>
          </SupabaseProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
