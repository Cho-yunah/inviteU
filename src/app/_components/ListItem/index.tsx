import React from 'react'
import { IoIosLink } from "react-icons/io";
import { CiCalendar, CiShare2,CiTrash } from "react-icons/ci";
import { InvitationStateType } from '@/lib/features/invitation/invitationSlice';


const ListItem = ({ item }: { item: InvitationStateType }) => {

  console.log(item)
  
  return (
      <div className='bg-gray-50 rounded-md m-5 shadow-md relative'>
        <p className='absolute w-2 h-full bg-red-400 rounded-l-md'></p>
        <div className='p-3 pl-5'>
          <p className='text-gray-700 text-normal font-bold pt-1 pb-1'>{item.title}</p>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='align-text-middle'>
                <IoIosLink className='inline text-gray-400' />  <span>happyforeverdogcat.io</span>
                <br/>
                <CiCalendar className='inline text-gray-400' /> <span>2021.10.10 SAT 14:00</span>
              </div>
            </div>
            <div className='flex items-end justify-between m-1 w-14'>
              <div className='rounded-[50%] bg-gray-200 shadow-sm w-6 h-6 flex items-center justify-center'>
                <CiShare2 size='15' />
              </div>
              <div className='rounded-[50%] bg-gray-200 shadow-sm w-6 h-6 flex items-center justify-center'>
                <CiTrash size='15' />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;