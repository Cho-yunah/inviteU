import React from 'react'
import Modal from 'react-modal'
import './style.scss'
import Image from 'next/image'
import Logo from '/public/img/logo.png'
import { IoMdClose } from 'react-icons/io'
import { supabase } from '@/supabase/browser'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-52%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '55%',
    maxWidth: '335px',
  },
}

const LoginModal = ({ isOpen, onClose }: any) => {
  const logInWithKakao = async () => {
    try {
      // PKCE를 위한 code_verifier 생성
      const codeVerifier = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('code_verifier', codeVerifier) // 저장

      const { data, error }: { data: any; error: any } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
        },
      })

      if (error) throw new Error(error.message)
      console.log('로그인 성공:', data)
      if (data.session) {
        localStorage.setItem('supabase-session', JSON.stringify(data.session))
      }
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  // function closeModal() {
  //   setIsOpen(false)
  // }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-10 "
      >
        <div className="py-3 text-center">
          <div className="flex items-center justify-center p-2">
            <Image src={Logo} alt="logo" width="28" height="26" className="p-1" />
            <p className="p-1 font-semibold text-gray-600">Invite U</p>
          </div>
          <p className="text-sm text-gray-600">간편한 카카오 로그인으로 시작해보세요!</p>
        </div>
        <IoMdClose color="#4c4b4b" className="absolute right-3 top-3 size-5" onClick={onClose} />
        <button
          onClick={logInWithKakao}
          className="my-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500]"
        >
          <Image
            width={18}
            height={18}
            alt="kakao-logo"
            src="/kakao-logo.svg"
            className=" fill-black"
          ></Image>
          <p className="text-sm font-semibold text-black">카카오로 바로 시작하기</p>
        </button>
      </Modal>
    </div>
  )
}

export default LoginModal
