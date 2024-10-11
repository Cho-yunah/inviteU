import React, { useEffect } from 'react'
import styles from '../../edit.module.scss'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Accordion from '@/app/_components/common/accordion'
import { VideoUpload } from './VideoUpload'
import { ContentsContainerProps } from '@/app/_types/contentsInfoTypes'

export default function VideoContainer({
  id,
  content,
  onDelete,
  handleUpdateContent,
}: ContentsContainerProps) {
  const [videoData, setVideoData] = React.useState({
    type: 'video',
    ratio: content.ratio || 3 / 4,
    urls: content.urls ? content.urls.split(',') : ([] as string[]), // 문자열을 배열로 변환
  })

  const handleFileUpload = (files: FileList) => {
    setVideoData({ ...videoData, urls: files }) // 기존 urls 배열에 파일 추가
  }

  const handleChange = (e: any) => {
    if (e.target.name) {
      setVideoData({
        ...videoData,
        [e.target.name.split('_')[0]]: e.target.value,
      })
    }
  }

  useEffect(() => {
    const updatedContent = {
      ...videoData,
      urls: videoData.urls.length > 0 ? videoData.urls : '',
    }
    handleUpdateContent(updatedContent) // 상위로 업데이트된 데이터를 전달
  }, [videoData])

  return (
    <Accordion>
      <Accordion.Header>{'동영상'}</Accordion.Header>
      <Accordion.Animation>
        <Accordion.Content description="초대장에 넣고 싶은 동영상을 추가해보세요">
          <div className="mt-4 pb-1">
            <p className="font-bold text-sm text-[#333] pb-1">동영상 추가*</p>
            <VideoUpload onFileUpload={handleFileUpload} />
            <p className="font-bold text-sm text-[#333] py-1">동영상 비율</p>
            <div className="flex gap-2 my-2">
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="videoRatio_3/4"
                  value={3 / 4}
                  className={styles.radioItem}
                  checked={videoData.ratio == 3 / 4}
                  onChange={handleChange}
                />
                <label htmlFor="videoRatio_3/4" onClick={handleChange} className={styles.label}>
                  3:4
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="videoRatio_1/1"
                  value={1 / 1}
                  className={styles.radioItem}
                  checked={videoData.ratio == 1 / 1}
                  onChange={handleChange}
                />
                <label htmlFor="videoRatio_1/1" onClick={handleChange} className={styles.label}>
                  1:1{' '}
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`ratio_${id}`}
                  id="videoRatio_4/3"
                  value={4 / 3}
                  className={styles.radioItem}
                  checked={videoData.ratio == 4 / 3}
                  onChange={handleChange}
                />
                <label htmlFor="videoRatio_4/3" onClick={handleChange} className={styles.label}>
                  4:3{' '}
                </label>
              </div>
            </div>
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
