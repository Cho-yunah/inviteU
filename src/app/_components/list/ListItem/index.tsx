import React from 'react'
import { IoIosLink } from "react-icons/io";
import { CiCalendar, CiShare2,CiTrash } from "react-icons/ci";
import { InvitationStateType } from '@/lib/features/invitation/invitationSlice';


const ListItem = ({ item }: { item: InvitationStateType }) => {

  console.log(item)
  
  return (
      <div className='relative m-5 rounded-md bg-gray-50 shadow-md'>
        <p className='absolute h-full w-2 rounded-l-md bg-red-400'></p>
        <div className='p-3 pl-5'>
          <p className='text-normal py-1 font-bold text-gray-700'>{item.title}</p>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='align-text-middle'>
                <IoIosLink className='inline text-gray-400' />  <span>happyforeverdogcat.io</span>
                <br/>
                <CiCalendar className='inline text-gray-400' /> <span>2021.10.10 SAT 14:00</span>
              </div>
            </div>
            <div className='m-1 flex w-14 items-end justify-between'>
              <div className='flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm'>
                <CiShare2 size='15' />
              </div>
              <div className='flex size-6 items-center justify-center rounded-[50%] bg-gray-200 shadow-sm'>
                <CiTrash size='15' />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;