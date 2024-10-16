'use client'

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ContentDataType, ImageType, IntervalType, MapType, TextType, VideoType } from '@/lib/types'
import styles from './previewModal.module.scss'
import { IoMdClose } from 'react-icons/io'
import Map from './Map'
import Script from 'next/script'

// 이미지 컴포넌트
const ImageComponent = ({ layout, ratio, urls }: ImageType) => {
  console.log('ImageComponent:', layout, ratio, urls.split(','))
  return (
    <div className={`image-container ${layout} p-2 ratio-${3 / 4}`}>
      {urls.split(',').map((url, index) => (
        <img
          key={index}
          src={url}
          alt="Content Image"
          style={{ aspectRatio: ratio, objectFit: 'contain' }}
        />
      ))}
      {/* <img src={urls} alt="Content Image" style={{ aspectRatio: ratio, objectFit: 'cover' }} /> */}
    </div>
  )
}

// 비디오 컴포넌트
const VideoComponent = ({ ratio, urls }: VideoType) => (
  <div className="video-container" style={{ aspectRatio: ratio }}>
    <video controls>
      <source src={urls} type="video/mp4" />
    </video>
  </div>
)

// 텍스트 컴포넌트
const TextComponent = ({ font_size, font_type, layout, text }: TextType) => (
  <div className={`text-container text-${layout} text-[${font_size}px] font-${font_type}`}>
    <p>{text}</p>
  </div>
)

// 간격 컴포넌트
const IntervalComponent = ({ size }: IntervalType) => (
  <div className={`${styles.interval} ${styles[`interval-${size}`]}`} />
)

// 지도 컴포넌트
const MapComponent = ({ main_address, detail_address, post_number }: MapType) => {
  return (
    <div className="map-container">
      <p>{main_address}</p>
      <p>{detail_address}</p>
      <p>{post_number}</p>
      <Map address={main_address} />
    </div>
  )
}

const PreviewModal = ({
  form,
  isOpen,
  onClose,
}: {
  form: any
  isOpen: boolean
  onClose: () => void
}) => {
  const [contentsData, setContentsData] = useState<ContentDataType[]>([])
  const [background, setBackground] = useState(0)

  useEffect(() => {
    let formData = form.getValues()
    console.log('formData:', formData)
    setContentsData(formData?.contents)
    setBackground(Number(formData?.background_image) + 1)
    console.log(background)
  }, [form.getValues()])

  const renderContent = (content: ContentDataType, index: number) => {
    switch (content.type) {
      case 'image':
        return (
          <ImageComponent
            key={index}
            type="image"
            layout={content.layout}
            ratio={content.ratio}
            urls={content.urls}
          />
        )
      case 'video':
        return <VideoComponent key={index} type="video" ratio={content.ratio} urls={content.urls} />
      case 'text':
        return (
          <TextComponent
            key={index}
            type="text"
            font_size={content.font_size}
            font_type={content.font_type}
            layout={content.layout}
            text={content.text}
          />
        )
      case 'interval':
        return <IntervalComponent key={index} type="interval" size={content.size} />
      case 'map':
        return (
          <MapComponent
            key={index}
            type="map"
            main_address={content.main_address}
            detail_address={content.detail_address}
            post_number={content.post_number}
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Invitation Preview"
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className="rounded-t-md p-3 border-b-[1px] bg-[#f2f2f2]">
        <button onClick={onClose} className={styles.closeButton}>
          <IoMdClose color="#4c4b4b" />
        </button>
        <h2 className="text-center">미리보기</h2>
      </div>

      <div
        style={{
          backgroundImage: `url('/img/background_${background}.png')`,
          paddingTop: background % 2 === 1 ? '9rem' : '1.5rem', // 홀수일 때 더 많은 마진
          backgroundRepeat: background % 2 === 1 ? 'no-repeat' : 'repeat-y',
          backgroundAttachment: 'scroll', // background가 스크롤과 함께 움직이도록 설정
        }}
        className={`bg-cover bg-white max-w-[330px] min-h-[560px] rounded-b-xl overflow-hidden`}
      >
        {/* 콘텐츠 렌더링 */}
        <div className={styles.scroll}>
          {contentsData.length > 0 &&
            contentsData.map((content: ContentDataType, index: number) =>
              renderContent(content, index),
            )}
        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal
