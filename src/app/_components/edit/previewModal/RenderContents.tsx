import { ImageType, IntervalType, MapType, TextType, VideoType } from '@/types/types'
import styles from './previewModal.module.scss'
import Map from './Map'
import { getCoordinates } from '@/lib/geocode'

// 이미지 컴포넌트
export const ImageComponent = ({ layout, ratio, urls }: ImageType) => {
  return (
    <div className={`image-container ${layout} px-0 py-1`}>
      {urls
        ?.split(',')
        ?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Content Image"
            className="w-auto h-auto rounded-xl shadow-md mb-6"
          />
        ))}
    </div>
  )
}

// 비디오 컴포넌트
export const VideoComponent = ({ ratio, urls }: VideoType) => (
  <div className="video-container" style={{ aspectRatio: ratio }}>
    <video controls>
      <source src={urls} type="video/mp4" />
    </video>
  </div>
)

// 텍스트 컴포넌트
export const TextComponent = ({ font_size, font_type, layout, text }: TextType) => (
  <div
    className={`text-container text-${layout} text-[${font_size}px] font-${font_type} whitespace-pre-wrap overflow-wrap-break-word`}
    style={{
      wordBreak: 'keep-all', // 한글 단어가 중간에 끊기지 않도록 설정
      wordWrap: 'break-word', // 단어가 긴 경우 자동 줄바꿈
    }}
  >
    <p>{text}</p>
  </div>
)

// 간격 컴포넌트
export const IntervalComponent = ({ size }: IntervalType) => (
  <div className={`${styles.interval} ${styles[`interval-${size}`]}`} />
)

// 지도 컴포넌트
export const MapComponent = ({ main_address, detail_address }: MapType) => {
  return (
    <div className="text-xs text-slate-500">
      <p>
        {main_address}, {detail_address}
      </p>
      <Map address={main_address} />
    </div>
  )
}

export const ServerMapComponent = async ({ main_address, detail_address }: MapType) => {
  const API_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
  const coordinates = await getCoordinates(main_address)

  const width = 310
  const height = 200
  const level = 12
  console.log('coordinates:', coordinates)

  const markerParam = `type:d|size:small|color:red|pos:${coordinates.lng}%20${coordinates.lat}`
  const mapSrc = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=${width}&h=${height}&center=${coordinates?.lng},${coordinates?.lat}&scale=2&level=${level}&markers=${markerParam}&X-NCP-APIGW-API-KEY-ID=${API_KEY}`

  return (
    <div className="text-xs text-slate-500">
      <p>
        {main_address}, {detail_address}
      </p>
      <div style={{ width, height, overflow: 'hidden' }}>
        <img
          src={mapSrc}
          alt="지도"
          style={{ width: '100%', height: '100%' }}
          onError={() => console.error('지도 로드에 실패했습니다.')}
        />
      </div>
      {/* <Map address={main_address} coordinates={coordinates} /> */}
    </div>
  )
}
