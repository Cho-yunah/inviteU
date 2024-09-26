import React from 'react'
import { IoIosLink } from "react-icons/io";
import { CiCalendar, CiShare2,CiTrash } from "react-icons/ci";
import { InvitationStateType } from '@/lib/features/invitation/invitationSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListItem = ({ item }: { item: InvitationStateType }) => {

  const handleClickShare= async() => {
    console.log('share click', item.custom_url)
    try {
      await navigator.clipboard.writeText(item.custom_url);
      toast.success('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  }

  const handleClickDelete = async() => { 
    console.log('삭제 요청')
    try {
      const res = await axios.delete(`/api/invitation/user_id=${item.user_id}&invitation_id=${item.id}`)
      console.log(res)
    } catch (error) {
      console.error('삭제 실패',error)
    }
  }

  return (
      <div className='relative m-5 rounded-md bg-gray-50 shadow-md'>
        <p className='absolute h-full w-2 rounded-l-md bg-red-400'></p>
        <div className='p-3 pl-5'>
          <p className='text-sm py-1 font-bold text-gray-800'>{item.title}</p>
          <div className='flex justify-between mt-1'>
            <div className=''>
              <div className='flex items-center text-xs text-gray-700 '>
                <IoIosLink size={15} className='text-gray-400 mr-1' /><span> {item.custom_url}</span>
              </div>
              <div className='flex items-center justify-center text-xs text-gray-700 '>
                <CiCalendar size={15} className='text-gray-400 mr-1' /><span className='mt-[2px] align-bottom'> {item.date}</span>
              </div>
            </div>
            <div className='m-1 flex w-14 items-end justify-between'>
              <button 
                onClick={handleClickShare}
                className='flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm'
              >
                <CiShare2 size='15' />
              </button>
              <button
                onClick={handleClickDelete} 
                className='flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm'
              >
                <CiTrash size='15' />
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;