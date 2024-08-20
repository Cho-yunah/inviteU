import React, { useState } from 'react'
import SearchPostCode from './SearchPostcode'

const MapContainer = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')

    const handleInputClick = () => {
        setShowModal(true)
    }

  return (
    <div className='mt-4'>
        <p className='font-bold text-sm text-[#333] pb-1'>위치 검색*</p>  
        <div className='flex w-full' onClick={handleInputClick}>
            <input placeholder='주소를 검색해주세요' 
                className='border-[1px] border-gray-300 rounded-l-md py-2 px-2 w-10/12'
                value={address}
             />
            <button className='bg-black text-white p-2 rounded-r-md w-2/12'>검색</button>
        </div>
        <input placeholder='상세 주소를 입력해주세요' className='border-[1px] border-gray-300 rounded-md py-2 px-4 w-full mt-3' />
        {showModal && 
            <SearchPostCode 
                showModal={showModal} setShowModal={setShowModal}
                address={address} setAddress={setAddress}
            />
        }
    </div>
  )
}

export default MapContainer;