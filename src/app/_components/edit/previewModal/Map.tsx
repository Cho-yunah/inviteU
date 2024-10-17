import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface StaticMapProps {
  address: string
  width?: number
  height?: number
  level?: number
}

const Map: React.FC<StaticMapProps> = ({ address, width = 310, height = 200, level = 12 }) => {
  const API_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await fetch(`/api/geocode?query=${address}`)
        const data = await res.json()

        if (data.addresses.length > 0) {
          const { y, x } = data.addresses[0] // 위도와 경도
          setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) })
        } else {
          console.error('해당 주소를 찾을 수 없습니다.')
        }
      } catch (error) {
        console.error('Geocoding API 호출 오류:', error)
      }
    }

    fetchCoordinates()
  }, [address]) // 주소가 변경될 때마다 호출

  const markerParam = `type:d|size:small|color:red|pos:${coordinates.lng}%20${coordinates.lat}`

  const mapSrc = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=${width}&h=${height}&center=${coordinates?.lng},${coordinates?.lat}&scale=2&level=${level}&markers=${markerParam}&X-NCP-APIGW-API-KEY-ID=${API_KEY}`

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <img
        src={mapSrc}
        alt="지도"
        style={{ width: '100%', height: '100%' }}
        onError={() => console.error('지도 로드에 실패했습니다.')}
      />
    </div>
  )
}

export default Map
