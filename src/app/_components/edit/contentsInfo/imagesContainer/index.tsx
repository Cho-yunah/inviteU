import React, { useEffect } from 'react'
import styles from '../../edit.module.scss'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FileUpload } from './FileUpload'
import { ContentsContainerProps } from '@/app/_types/contentsInfoTypes'
import Accordion from '@/app/_components/common/accordion'

export default function ImageContainer({
  id,
  content,
  onDelete,
  handleUpdateContent,
}: ContentsContainerProps) {
  const [imageData, setImageData] = React.useState({
    type: 'image',
    layout: content.layout || 'vertical',
    ratio: content.ratio || 3 / 4,
    urls: content.urls ? content.urls.split(',') : ([] as string[]), // 문자열을 배열로 변환
  })

  const handleFileUpload = (files: any) => {
    const fileUrls = Array.from(files).map((file: any) => file) // 파일 이름을 배열로 추가
    setImageData({ ...imageData, urls: [...imageData.urls, ...fileUrls] }) // 기존 urls 배열에 파일 추가
  }

  const handleChange = (e: any) => {
    setImageData({
      ...imageData,
      [e.target.name.split('_')[0]]: e.target.value,
    })
  }

  useEffect(() => {
    const updatedContent = {
      ...imageData,
      urls: imageData.urls.length > 0 ? imageData.urls.join(',') : '',
    }
    handleUpdateContent(updatedContent) // 상위로 업데이트된 데이터를 전달
  }, [imageData])

  return (
    <Accordion>
      <Accordion.Header>{'이미지'}</Accordion.Header>
      <Accordion.Animation>
        <Accordion.Content description="초대장에 넣고 싶은 이미지를 추가해보세요">
          <div className="mt-4 pb-1">
            <p className="font-bold text-sm text-[#333] pb-1">이미지 추가*</p>
            <FileUpload onFileUpload={handleFileUpload} imageUrls={content.urls} />
            <p className="font-bold text-sm text-[#333] pb-1">레이아웃*</p>
            <div className="flex gap-3 my-2">
              <div className="flex flex-1 items-center space-x-1 ">
                <input
                  type="radio"
                  name={`layout_${id}`}
                  id="vertical"
                  value="vertical"
                  className={styles.radioItem}
                  checked={imageData.layout === 'vertical'}
                  onChange={handleChange} // input에만 onChange 이벤트 설정
                />
                <label htmlFor="vertical" className={styles.label}>
                  세로 나열형
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`layout_${id}`}
                  id="horizontal"
                  value="horizontal"
                  className={styles.radioItem}
                  checked={imageData.layout === 'horizontal'}
                  onChange={handleChange}
                />
                <label htmlFor="horizontal" className={styles.label}>
                  가로 나열형{' '}
                </label>
              </div>
            </div>

            <div className="flex gap-2 my-2">
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="ratio_3/4"
                  value={3 / 4}
                  className={styles.radioItem}
                  checked={imageData.ratio == 3 / 4}
                  onChange={handleChange}
                />
                <label htmlFor="ratio_3/4" className={styles.label}>
                  3:4
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="ratio_1/1"
                  value={1 / 1}
                  className={styles.radioItem}
                  checked={imageData.ratio == 1 / 1}
                  onChange={handleChange}
                />
                <label htmlFor="ratio_1/1" className={styles.label}>
                  1:1{' '}
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="ratio_4/3"
                  value={4 / 3}
                  className={styles.radioItem}
                  checked={imageData.ratio == 4 / 3}
                  onChange={handleChange}
                />
                <label htmlFor="ratio_4/3" className={styles.label}>
                  4:3{' '}
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => onDelete && onDelete(id)}
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
