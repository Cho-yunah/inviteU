'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthState } from './AuthContext'
import { CiUser } from 'react-icons/ci'
import { GrPrevious } from 'react-icons/gr'
import LoginModal from './modal/LoginModal'
import { UserType, HeaderType } from '@/types/enums'

const determineUserType = (session: any) => {
  return session?.access_token ? UserType.MEMBER : UserType.GUEST
}

const determineHeaderType = (pathName: string): HeaderType => {
  if (/^\/mypage$|^\/invitation(\/new|\/\w+)/.test(pathName)) {
    return HeaderType.ELSE
  }
  return HeaderType.HOME
}

const setHeaderName = (path: string) => {
  switch (path) {
    case '/':
      return 'Invite U'
    case '/invitation':
      return '초대장 목록'
    case '/invitation/new':
      return '초대장 생성'
    case `/invitation/${path.split('/')[2]}`:
      return '초대장 수정'
    case '/mypage':
      return '마이페이지'
    default:
      return 'Invite U'
  }
}

const Header = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { session } = useAuthState()

  const [isModalsOpen, setIsModalOpen] = React.useState(false)

  const handleNavigation = {
    home: () => router.push('/'),
    myPage: () => router.push('/mypage'),
    back: () => router.back(),
    showLoginModal: () => setIsModalOpen(true),
    closeLoginModal: () => setIsModalOpen(false),
  }

  const headerName = useMemo(() => setHeaderName(pathName), [pathName])
  const userType = useMemo(() => determineUserType(session), [session])
  const headerType = useMemo(() => determineHeaderType(pathName), [pathName])

  return (
    <>
      <header className="border-b px-2 py-3 shadow-sm">
        {headerType === 'elseHeader' ? (
          <div className="relative flex items-center justify-center">
            <GrPrevious
              className="absolute left-1 size-6 cursor-pointer p-1"
              onClick={handleNavigation.back}
            />
            <div>{headerName}</div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex cursor-pointer items-center" onClick={handleNavigation.home}>
              <img src="/img/logo.png" alt="logo" className="size-6" />
              <p className="px-3">Invite U</p>
            </div>
            <div>
              {userType === UserType.MEMBER ? (
                <button
                  onClick={handleNavigation.myPage}
                  className="flex size-6 items-center justify-center rounded-full border border-gray-500 bg-gray-100"
                >
                  <CiUser />
                </button>
              ) : (
                <button onClick={handleNavigation.showLoginModal} className="btn text-sm">
                  간편 로그인
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      <LoginModal isOpen={isModalsOpen} onClose={handleNavigation.closeLoginModal} />
    </>
  )
}

export default Header
