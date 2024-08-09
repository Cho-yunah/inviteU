'use client'

import React, { useState } from 'react'
import LoginModal from './modal/LoginModal'
import { useUser } from '@supabase/auth-helpers-react'
import { CiUser } from "react-icons/ci";
import { usePathname, useRouter } from 'next/navigation'
import { GrPrevious } from "react-icons/gr";
import EditButton from '../Edit/EditButton/EditButton'
import { useAuthState } from '../AuthContext'

const getTitle = (path: string) => {
  switch (path) {
    case '/':
      return 'Invite U';
    case '/list':
      return 'About Us';
    case '/mypage':
      return '마이페이지';
    case '/edit':
      return '초대장 생성'
    default:
      return 'Invite U';
  }
};


const Header = () => {
  const data = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const {session} = useAuthState();

  const [isModalsOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const headerType = ['/mypage', '/edit'].includes(pathName)
  ? 'elseHeader'
  : 'homeHeader'

  return (
    <>
      <header className="border-b py-3 px-2 shadow-sm">
        {headerType === 'elseHeader' ? (
          <div className="relative flex items-center justify-center">
            <GrPrevious
              className="absolute left-1 p-1 w-6 h-6 cursor-pointer"
              onClick={handleMoveBack}
            />
            <div>{getTitle(pathName)}</div>
            {pathName === '/edit' && <EditButton text="저장" position="right" />}
          </div>
        ) : (
          <div className="flex justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleMoveHome}
            >
              <p className="px-3">Invite U</p>
            </div>
            <div>
              {session?.access_token != null ? (
                <button
                  onClick={handleMoveMyPage}
                  className="w-6 h-6 flex items-center justify-center border-[1px] border-gray-500 rounded-full bg-gray-100"
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
