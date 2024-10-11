import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Accordion from '@/app/_components/common/accordion'
import SearchPostCode from './SearchPostcode'
import { ContentsContainerProps } from '@/app/_types/contentsInfoTypes'

const MapContainer = ({ id, content, onDelete, handleUpdateContent }: ContentsContainerProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [mapData, setMapData] = useState({
    type: 'map',
    main_address: content.main_address || '',
    detail_address: content.detail_address || '',
    post_number: content.post_number || '',
  })

  const handleInputClick = () => {
    setShowModal(true)
  }

  const handleChange = (e: any) => {
    setMapData({
      ...mapData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (handleUpdateContent) {
      handleUpdateContent(mapData)
    }
  }, [mapData])

  return (
    <Accordion>
      <Accordion.Header>{'지도'}</Accordion.Header>
      <Accordion.Animation>
        <Accordion.Content description="일정이 열리는 위치를 추가해보세요">
          <div className="mt-4 pb-1">
            <p className="font-bold text-sm text-[#333] pb-1">위치 검색*</p>
            <div className="flex w-full" onClick={handleInputClick}>
              <input
                className="border-[1px] border-gray-300 rounded-l-md p-2 w-10/12"
                placeholder="주소를 검색해주세요"
                name="main_address"
                onChange={handleChange}
                value={mapData.main_address}
              />
              <button className="bg-black text-white p-2 rounded-r-md w-2/12">검색</button>
            </div>
            <input
              className="border-[1px] border-gray-300 rounded-md py-2 px-4 w-full mt-3"
              placeholder="상세 주소를 입력해주세요"
              name="detail_address"
              onChange={handleChange}
              value={mapData.detail_address}
            />
            {showModal && (
              <SearchPostCode
                setShowModal={setShowModal}
                setMapData={setMapData}
                mapData={mapData}
              />
            )}
          </div>
          <button
            onClick={() => onDelete && onDelete(id)}
            className="relative bottom-0 left-[235px] flex items-center justify-center border-[1px] border-gray-300 rounded-sm w-[65px] p-1 my-2"
          >
            <p>삭제</p>
            <RiDeleteBin6Line className="size-4 text-gray-600 ml-1" />
          </button>
        </Accordion.Content>
      </Accordion.Animation>
    </Accordion>
  )
}

export default MapContainer
