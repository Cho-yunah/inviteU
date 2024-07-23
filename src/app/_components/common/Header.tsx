'use client'

import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import Logo from "/public/img/logo.png"
import LoginModal from './modal/LoginModal'
import { useUser } from '@supabase/auth-helpers-react'
import { CiUser } from "react-icons/ci";
import { useRouter } from 'next/navigation'

const Header = () => {
  const data = useUser();
  const router = useRouter();

  const [isSignedIn, setisSignedIn] =useState(false);
  const [isModalsOpen, setIsModalOpen] = React.useState(false);

  const handleShowLoginModal=() => {
    setIsModalOpen(true)
  }

  const handleMoveMyPage = () => {
    router.push('/mypage')
  }

  useEffect(() => {
    if(data) {
      setisSignedIn(true)
    }
  },[data])

  return (
    <>
      <header className="flex justify-between border-b py-3 px-5 shadow-sm">
        <div className="flex">
          <Image src={Logo} alt="logo" width="28" />
          <p className="px-3">Invite U</p>
        </div>
        <div>
          {isSignedIn ? (
          <button 
            onClick={handleMoveMyPage}
            className="w-6 h-6 flex items-center justify-center border-[1px] border-gray-500 rounded-full bg-gray-100"
          ><CiUser/></button>
          ) : (  
            <button onClick={handleShowLoginModal} className="btn text-sm">간편 로그인</button>
          )
          }
        </div>
      </header>
      <LoginModal isOpen={isModalsOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}

export default Header;