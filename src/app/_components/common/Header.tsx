import Image from 'next/image'
import React from 'react'
import Logo from "../../public/logo.png"


const Header = () => {
  return (
    <header className="flex justify-between border-b py-3 px-5 shadow-sm">
    <div className="flex">
      <Image src={Logo} alt="logo" width="28" />
      <p className="px-3">Invite U</p>
    </div>
    <div>
      <button className="btn text-sm">로그인</button>
    </div>
  </header>
  )
}

export default Header;