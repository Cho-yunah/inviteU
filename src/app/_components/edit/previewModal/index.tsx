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
import { formatDateTime } from '@/lib/utils'

const PreviewModal = ({
  form,
  isOpen,
  onClose,
  contentsInfo,
  currentInvitation,
}: {
  form: any
  isOpen: boolean
  onClose: () => void
  contentsInfo: ContentDataType[]
  currentInvitation: any
}) => {
  const [contentsData, setContentsData] = useState<ContentDataType[]>([])
  const [background, setBackground] = useState(0)

  const formattedDateTime = currentInvitation
    ? formatDateTime(currentInvitation.date, currentInvitation.time)
    : ''

  useEffect(() => {
    let formData = form.getValues()
    setBackground(Number(formData?.background_image))
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

      <div className="relative min-h-[78vh] bg-gray-50 flex items-center justify-center">
        {/* 페이지 중앙 배경 */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 pt-1"
          style={{
            backgroundImage: `url('/img/background_${+(background ?? 0) + 1}.png')`,
          }}
        />

        {/* 중앙 콘텐츠 */}
        <div className="relative z-10 w-9/12 max-w-xl rounded-xl p-1 mt-4 max-h-[43vh] overflow-y-auto scrollbar-hide smooth-scroll">
          {/* 제목 */}
          <h1 className="text-4xl font-semibold text-center mb-4 font-batang">
            {currentInvitation && currentInvitation.title}
          </h1>

          {/* 메인 이미지 */}
          <img
            src={currentInvitation && currentInvitation.primary_image}
            alt="초대장 메인 이미지"
            className="w-full h-auto rounded-xl shadow-lg mb-6"
          />
          <p className="text-center text-base mb-4 font-batang font-semibold whitespace-pre">
            {formattedDateTime}
          </p>

          {/* 콘텐츠 컴포넌트 렌더링 */}
          <div className="space-y-6">
            {contentsData.map((content, index) => renderContent(content, index))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PreviewModal
