import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import styles from "./page.module.css";
import SupabaseProvider from '@/supabase/provider'
import ReduxProvider from "./StoreProvider";
import Header from './_components/common/Header';
import ModalSetup from './_components/common/modal/ModalSetup';
import AuthContext from "./_components/common/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./_components/common/ErrorBoundary/Errorboundary";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
        <body className={inter.className}>
          <ErrorBoundary >
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
                    <ToastContainer 
                      position="top-center"
                      autoClose={500}
                      hideProgressBar
                    />
                    </div>
              </AuthContext>
            </SupabaseProvider>
          </ErrorBoundary>
        </body>
      </html>
  )
}