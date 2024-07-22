import React, { useEffect } from 'react'
import Modal from 'react-modal';
import './style.scss'
import Image from 'next/image';
import Logo from '../../../../../public/logo.png'
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
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  const data = useUser()
  const logInWithKakao = async (e:any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
    console.log('로그인 성공', data)
    if (error) throw error.message;
  }


  function openModal() {
    setIsOpen(true);
  }
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

export default LoginModal