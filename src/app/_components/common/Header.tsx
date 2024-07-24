'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from "/public/img/logo.png"
import LoginModal from './modal/LoginModal'
import { useUser } from '@supabase/auth-helpers-react'
import { CiUser } from "react-icons/ci";
import { usePathname, useRouter } from 'next/navigation'
import { GrPrevious } from "react-icons/gr";


const getTitle = (path: string) => {
  switch (path) {
    case '/':
      return 'Invite U';
    case '/list':
      return 'About Us';
    case '/mypage':
      return '마이페이지';
    default:
      return 'Invite U';
  }
};


const Header = () => {
  const data = useUser();
  const router = useRouter();
  const pathName = usePathname();

  const [isSignedIn, setisSignedIn] =useState(false);
  const [isModalsOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShowLoginModal=() => {
    setIsModalOpen(true)
  }

  const handleMoveMyPage = () => {
    router.push('/mypage')
  }

  useEffect(() => {
    if(data) {
      console.log(data)
      setisSignedIn(true)
    }
  },[data])

  return (
    <>
      <header className="border-b py-3 px-2 shadow-sm">
        {pathName == '/mypage' ? (
          <div className='relative flex items-center justify-center'>
            <GrPrevious className='absolute left-1'/>
            <div>{getTitle(pathName)}</div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex" >
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
          </div>
          )
        }
      </header>
      <LoginModal isOpen={isModalsOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}

export default Header;
