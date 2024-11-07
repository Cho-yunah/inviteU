import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.scss'
import styles from './layout.module.scss'
import Providers from './Providers'
import Header from './_components/common/Header'
import ModalSetup from './_components/common/modal/ModalSetup'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invite U',
  description: 'Service for creating invitations',
  icons: { icon: '/favicon.ico', shortcut: '/img/logo.png' },

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

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          {/* 루트 레이아웃 - 모바일 사이즈 레이아웃 */}
          <div className="relative shadow-sm bg-white">
            <Header />
            <main className={styles.main}>
              <div className={styles.description}>{children}</div>
            </main>
            <ModalSetup />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar
              theme="colored"
              transition={Slide}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}
