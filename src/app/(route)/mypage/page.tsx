// import { useUser } from '@supabase/auth-helpers-react';
import React from 'react'

const Mypage = () => {
  // const [username, setUsername] = useState('');


  
  return (
    <div className='my-3 '>
      <div className='p-4'>
        <h2 className='font-bold'>닉네임</h2>
        <form className='flex w-full'>
          <input type="text" className='p-1 px-2 border-[1px] border-gray-600 grow my-1 mr-1'/>
          <button className='border-[1px] border-gray-400 py-1 px-2 m-1 font-semibold '>저장</button>
        </form>
        <p className='text-xs text-gray-400 my-1'>닉네임은 카카오 기본 정보에 따라 등록되며, 수정할 수 있어요</p>
      </div>
      <div className='my-3 px-4'>
        <h1 className='font-bold'>기본 정보</h1>
        <ul className='my-1 bg-gray-100 rounded-md p-3'>
          <li className='p-1 flex'>
            <span className='grow-[1] text-gray-400'>이름</span>
            <span className='grow-[3] text-gray-600'>{'홍길동'}</span>
          </li>
          <li className='p-1 flex'>
            <span className='grow-[1.3] text-gray-400'>이메일</span>
            <span className='grow-[3] text-gray-600'>inviteu@gmail.com</span>
          </li>
        </ul>
        <p className='text-xs text-gray-400 my-2'> * 카카오 가입계정은 기본 정보를 수정할 수 없어요</p>
      </div>
      <div className='w-full text-center mt-6 mb-5'>
        <button className='underline text-xs'>로그아웃</button>
      </div>
      <div className='bg-gray-100 w-full h-2'></div>
      <div className='w-full text-center mt-6 mb-5'>
        <button className='text-xs text-gray-400'>회원 탈퇴</button>
      </div>
    </div>
  )
}

export default Mypage;