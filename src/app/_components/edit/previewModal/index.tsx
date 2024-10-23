'use client'

import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ContentDataType } from '@/lib/types'
import styles from './previewModal.module.scss'
import { IoMdClose } from 'react-icons/io'
import {
  ImageComponent,
  IntervalComponent,
  MapComponent,
  TextComponent,
  VideoComponent,
} from '@/app/_components/edit/previewModal/RenderContents'

const PreviewModal = ({
  form,
  isOpen,
  onClose,
  contentsInfo,
}: {
  form: any
  isOpen: boolean
  onClose: () => void
  contentsInfo: ContentDataType[]
}) => {
  const [contentsData, setContentsData] = useState<ContentDataType[]>([])
  const [background, setBackground] = useState(0)

  useEffect(() => {
    let formData = form.getValues()
    setBackground(Number(formData?.background_image) + 1)
  }, [form.getValues()])

  useEffect(() => {
    setContentsData(contentsInfo)
  }, [contentsInfo])

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
          paddingTop: background % 2 === 1 ? '8rem' : '0.5rem', // 홀수일 때 더 많은 마진
          backgroundRepeat: background % 2 === 1 ? 'no-repeat' : 'repeat-y',
          backgroundAttachment: 'scroll', // background가 스크롤과 함께 움직이도록 설정
        }}
        className={`bg-contain bg-white max-w-[330px] min-h-[560px] rounded-b-xl overflow-hidden`}
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
