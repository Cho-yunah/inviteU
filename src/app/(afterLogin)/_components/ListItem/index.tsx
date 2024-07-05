import React from 'react'

const ListItem = () => {
  return (
      <div className='bg-gray-50 rounded-md m-5 shadow-md relative'>
        <p className='absolute w-1 h-full bg-pink-200 rounded-l-md'> </p>
        <div className='p-3'>
          <p className='text-gray-700 text-normal font-bold pt-2 pb-2'>강아지&고양이의 앞날의 시작에 함께해주세요</p>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='align-text-middle'>
                <p>* happyforeverdogcat.io</p>
                <p>* 2021.10.10 SAT 14:00</p>
              </div>
            </div>
            <div>
              <button className='bg-gray-200 p-2 rounded-md'>수정</button>
              {/* <button className='bg-gray-200 p-2 rounded-md'>삭제</button> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;