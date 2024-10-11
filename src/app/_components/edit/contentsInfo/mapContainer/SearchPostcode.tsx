import React, { useEffect } from 'react'
import DaumPostcode, { Address } from 'react-daum-postcode'

interface SearchPostCodeProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setMapData: React.Dispatch<React.SetStateAction<any>>
  mapData: any
}

const SearchPostCode = ({ setShowModal, mapData, setMapData }: SearchPostCodeProps) => {
  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let bname = data.bname
    let buildingName = data.buildingName

    setShowModal(false)
    setMapData({
      ...mapData,
      main_address: `${fullAddress} (${bname}, ${buildingName})`,
      post_number: data.zonecode,
    })
  }

  return (
    <div className="fixed bg-slate-500/35 size-full z-10 left-0 top-0">
      <DaumPostcode autoClose onComplete={handleComplete} />
    </div>
  )
}

export default SearchPostCode
