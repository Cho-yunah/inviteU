'use client'

import Image from 'next/image'
import React, { use, useState } from 'react'
import Logo from "../../../../public/logo.png"
import LoginModal from './modal/LoginModal'


const Header = () => {
  const [isSignedIn, setisSignedIn] =useState(false);
  const [isModalsOpen, setIsModalOpen] = React.useState(false);


  const handleShowLoginModal=() => {
    console.log('show login modal')
    setIsModalOpen(true)
  }

  return (
    <>
      <header className="flex justify-between border-b py-3 px-5 shadow-sm">
        <div className="flex">
          <Image src={Logo} alt="logo" width="28" />
          <p className="px-3">Invite U</p>
        </div>
        <div>
          {isSignedIn ? (
          <button className="btn text-sm">로그아웃</button>
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