import React from 'react'
import { IoIosLink } from "react-icons/io";
import { CiCalendar, CiShare2 } from "react-icons/ci";



const ListItem = () => {
  return (
      <div className='bg-gray-50 rounded-md m-5 shadow-md relative'>
        <p className='absolute w-2 h-full bg-red-200 rounded-l-md'> </p>
        <div className='p-3 pl-5'>
          <p className='text-gray-700 text-normal font-bold pt-2 pb-2'>강아지&고양이의 앞날의 시작에 함께해주세요</p>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='align-text-middle'>
               <IoIosLink className='inline' />  <span>happyforeverdogcat.io</span>
               <br/>
               <CiCalendar className='inline' /> <span>2021.10.10 SAT 14:00</span>
              </div>
            </div>
            <div className='rounded-[50%] bg-gray-200 shadow-sm w-8 h-8 flex items-center justify-center'>
              <CiShare2 size='15' />
              {/* <button className='bg-gray-200 p-2 rounded-md'>수정</button> */}
              {/* <button className='bg-gray-200 p-2 rounded-md'>삭제</button> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;