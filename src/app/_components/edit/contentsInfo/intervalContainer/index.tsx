import React, { useEffect } from 'react'
import styles from '../../edit.module.scss'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Accordion from '@/app/_components/common/accordion'
import { ContentsContainerProps } from '@/types/contentsInfoTypes'

export default function IntervalContainer({
  id,
  content,
  onDelete,
  handleUpdateContent,
}: ContentsContainerProps) {
  const [sizeData, setSizeData] = React.useState({
    type: 'interval',
    size: content.size || 'small',
  })

  const handleChange = (e: any) => {
    setSizeData({
      ...sizeData,
      [e.target.name.split('_')[0]]: e.target.value, // name에서 layout_을 제거하고 처리
    })
  }

  useEffect(() => {
    if (handleUpdateContent) {
      handleUpdateContent(sizeData)
    }
  }, [sizeData])

  return (
    <Accordion>
      <Accordion.Header>{'간격'}</Accordion.Header>
      <Accordion.Animation>
        <Accordion.Content description="콘텐츠와 콘텐츠 사이의 간격을 설정할 수 있어요">
          <div className="mt-4 pb-1">
            <p className="font-bold text-sm text-[#333] pb-1">간격 사이즈*</p>
            <div className="flex gap-2 my-2">
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`size_${id}`}
                  id={`size_sm_${id}`}
                  value="small"
                  className={styles.radioItem}
                  checked={sizeData.size === 'small'}
                  onChange={handleChange}
                />
                <label htmlFor={`size_sm_${id}`} className={styles.label}>
                  Small
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`size_${id}`}
                  id={`size_md_${id}`}
                  value="medium"
                  className={styles.radioItem}
                  checked={sizeData.size === 'medium'}
                  onChange={handleChange}
                />
                <label htmlFor={`size_md_${id}`} className={styles.label}>
                  Medium{' '}
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  name={`size_${id}`}
                  id={`size_big_${id}`}
                  value="big"
                  className={styles.radioItem}
                  checked={sizeData.size === 'big'}
                  onChange={handleChange}
                />
                <label htmlFor={`size_big_${id}`} className={styles.label}>
                  Large{' '}
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete && onDelete(id)}
            className="relative bottom-0 left-[220px] flex items-center justify-center border-[1px] border-gray-300 rounded-sm w-[65px] p-1 my-2"
          >
            <p>삭제</p>
            <RiDeleteBin6Line className="size-4 text-gray-600 ml-1" />
          </button>
        </Accordion.Content>
      </Accordion.Animation>
    </Accordion>
  )
}
