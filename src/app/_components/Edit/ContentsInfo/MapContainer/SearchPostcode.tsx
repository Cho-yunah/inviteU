import React, { useEffect } from 'react'
import DaumPostcode, { Address } from 'react-daum-postcode'

interface SearchPostCodeProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
  postNumber: string
  setPostNumber: React.Dispatch<React.SetStateAction<string>>
}

const SearchPostCode = ({
  setShowModal,
  address,
  setAddress,
  setPostNumber,
}: SearchPostCodeProps) => {
  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let bname = data.bname
    let buildingName = data.buildingName

    console.log(`${fullAddress} (${bname}, ${buildingName})`) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress(`${fullAddress} (${bname}, ${buildingName})`)
    setShowModal(false)
    setPostNumber(data.zonecode)
  }

  return (
    <div className="fixed bg-slate-500/35 size-full z-10 left-0 top-0">
      <DaumPostcode autoClose onComplete={handleComplete} />
    </div>
  )
}

export default SearchPostCode
