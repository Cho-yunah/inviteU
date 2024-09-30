import React, { useState } from 'react'
import { ContainerProps } from '@/app/_types/editTypes'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Accordion from '@/app/_components/common/Accordion'
import SearchPostCode from './SearchPostcode'

const MapContainer = ({id, onDelete}: ContainerProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [detailAddress, setDetailAddress] = useState<string>('')

    const handleInputClick = () => {
        setShowModal(true)
    }

  return (
    <Accordion>
        <Accordion.Header >{'지도'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="일정이 열리는 위치를 추가해보세요">
            <div className='mt-4 pb-1'>
                <p className='font-bold text-sm text-[#333] pb-1'>위치 검색*</p>  
                <div className='flex w-full' onClick={handleInputClick}>
                    <input placeholder='주소를 검색해주세요' 
                        className='border-[1px] border-gray-300 rounded-l-md p-2 w-10/12'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button className='bg-black text-white p-2 rounded-r-md w-2/12'>검색</button>
                </div>
                <input placeholder='상세 주소를 입력해주세요' 
                        className='border-[1px] border-gray-300 rounded-md py-2 px-4 w-full mt-3'
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)} />
                {showModal && 
                    <SearchPostCode
                        showModal={showModal} setShowModal={setShowModal}
                        address={address} setAddress={setAddress}
                    />
                }
            </div>
            <button onClick={() => onDelete && onDelete(id)} className='relative bottom-0 left-[235px] flex items-center justify-center border-[1px] border-gray-300 rounded-sm w-[65px] p-1 my-2'>
                <p>삭제</p>
                <RiDeleteBin6Line className='size-4 text-gray-600 ml-1' />
            </button>
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
  )
}

export default MapContainer;