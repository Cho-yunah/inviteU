import { ImageType, IntervalType, MapType, TextType, VideoType } from '@/lib/types'
import styles from './previewModal.module.scss'
import Map from './Map'

// 이미지 컴포넌트
export const ImageComponent = ({ layout, ratio, urls }: ImageType) => {
  return (
    <div className={`image-container ${layout} px-0 py-1`}>
      {urls.split(',').map((url, index) => (
        <img
          key={index}
          src={url}
          alt="Content Image"
          style={{ aspectRatio: ratio, objectFit: 'cover' }}
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
