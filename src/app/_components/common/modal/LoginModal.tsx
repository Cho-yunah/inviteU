import React from 'react'
import Modal from 'react-modal';
import './style.scss'
import Image from 'next/image';
import Logo from '/public/img/logo.png'
import { IoMdClose } from "react-icons/io";
import { useUser } from '@supabase/auth-helpers-react';
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
    padding:'20px',
    borderRadius:'10px',
    width: '55%',
    maxWidth:'335px'
  },
};

const LoginModal = ({isOpen,setIsOpen}: any) => {
  const data = useUser()

  const logInWithKakao = async () => {
    try {
      // OAuth 인증 시작
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
      });
      if (error) throw new Error(error.message);
      // 인증 완료 후 세션 정보를 가져오기
      // const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      // if (sessionError) throw new Error(sessionError.message);
      if(data) {
        sessionStorage.setItem('username', data?.user_metadata.full_name)
        sessionStorage.setItem('email', data?.email)      }
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  };

  return (
    <div>   
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName='fixed inset-0 bg-black bg-opacity-50 z-10 '
        // onAfterOpen={afterOpenModal}
        // appElement={document.getElementById('root') as HTMLElement}
      >
        <div className='text-center py-3'>
          <div className='flex p-2 items-center justify-center'>
            <Image src={Logo} alt='logo' width='28' className='p-1'/>
            <p className='p-1 text-gray-600 font-semibold'>Invite U</p>
          </div>
          <p className='text-sm text-gray-600'>간편한 카카오 로그인으로 시작해보세요!</p>
        </div>
        <IoMdClose color='#4c4b4b' className='absolute top-3 right-3 size-5' onClick={closeModal}/>
        <button
        onClick={logInWithKakao}
        className="w-full bg-[#FEE500] h-[50px] my-1 flex items-center justify-center gap-2 rounded-lg"
        >
          <Image
            width={18}
            height={18}
            alt="kakao-logo"
            src="./kakao-logo.svg"
            className=" fill-black"
          ></Image>
          <p className="text-black text-sm font-semibold">카카오로 바로 시작하기</p>
        </button>
      </Modal>
  </div>
  )
}

export default LoginModal;