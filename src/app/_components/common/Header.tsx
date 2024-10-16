'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@supabase/auth-helpers-react'
import { useAuthState } from './AuthContext'
import { CiUser } from "react-icons/ci";
import { GrPrevious } from "react-icons/gr";
import LoginModal from './modal/LoginModal'

const getTitle = (path: string) => {
  switch (path) {
    case '/':
      return 'Invite U';
    case '/invitation':
      return '초대장 목록';
    case '/invitation/new':
      return '초대장 생성'
    case `/invitation/${path.split('/')[2]}`:
      return '초대장 수정'
    case '/mypage':
      return '마이페이지';
    default:
      return 'Invite U';
  }
};



const Header = () => {
  // const data = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const {session} = useAuthState();

  const [isModalsOpen, setIsModalOpen] = React.useState(false);

  const handleShowLoginModal=() => {
    setIsModalOpen(true)
  }

  const handleMoveMyPage = () => {
    router.push('/mypage')
  }

  const handleMoveHome = () => {
    router.push('/')
  }

  const handleMoveBack = () => {
    router.back();
  }

  const headerType = ['/mypage', '/invitation/new', `/invitation/${pathName.split('/')[2]}`].includes(pathName)
  ? 'elseHeader'
  : 'homeHeader'

  return (
    <>
      <header className="border-b px-2 py-3 shadow-sm">
        {headerType === 'elseHeader' ? (
          <div className="relative flex items-center justify-center">
            <GrPrevious
              className="absolute left-1 size-6 cursor-pointer p-1"
              onClick={handleMoveBack}
            />
            <div>{getTitle(pathName)}</div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div
              className="flex cursor-pointer items-center"
              onClick={handleMoveHome}
            >
              <img
                src="/img/logo.png"
                alt="logo"
                className="size-6" 
              />
              <p className="px-3">Invite U</p>
            </div>
            <div>
              {session?.access_token != null ? (
                <button
                  onClick={handleMoveMyPage}
                  className="flex size-6 items-center justify-center rounded-full border border-gray-500 bg-gray-100"
                >
                  <CiUser />
                </button>
              ) : (
                <button onClick={handleShowLoginModal} className="btn text-sm">
                  간편 로그인
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      <LoginModal isOpen={isModalsOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}

export default Header;
