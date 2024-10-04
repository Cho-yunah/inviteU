import React, { useEffect, useState } from 'react'
import styles from '../../edit.module.scss'
import debounce from 'lodash/debounce'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Accordion from '@/app/_components/common/accordion'
import { ContentsContainerProps } from '@/app/_types/contentsInfoTypes'

export default function TextContainer({
  id,
  onDelete,
  handleUpdateContent,
}: ContentsContainerProps) {
  const [textData, setTextData] = useState({
    type: 'text',
    text: '',
    font_type: '',
    font_size: '',
    layout: 'left',
  })

  const handleChange = (e: any) => {
    console.log(e)
    setTextData({
      ...textData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = debounce((e, type) => {
    setTextData({
      ...textData,
      [type]: e,
    })
  }, 300)

  useEffect(() => {
    if (handleUpdateContent) {
      handleUpdateContent(textData)
    }
  }, [textData])

  return (
    <Accordion>
      <Accordion.Header>{'텍스트'}</Accordion.Header>
      <Accordion.Animation>
        <Accordion.Content description="초대장에 문구를 추가해보세요">
          <div className="mt-4 pb-1">
            <p className="font-bold text-sm text-[#333] pb-1 mt-2">문구*</p>
            <div className="flex gap-2 my-2">
              <textarea
                className="w-full h-24 p-2 border-[1px] border-gray-200 rounded-md"
                placeholder="내용을 입력해주세요"
                name="text"
                onChange={handleChange}
              ></textarea>
            </div>
            <p className="font-bold text-sm text-[#333] pb-1 mt-2">폰트 및 사이즈*</p>
            <div className="gap-2 my-2">
              <Select onValueChange={(e) => handleSelectChange(e, 'font_type')} name="font_type">
                <SelectTrigger className="my-2 text-sm">
                  <SelectValue placeholder="글씨체를 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="나눔명조">나눔명조 - Nanum Myeongjo</SelectItem>
                  <SelectItem value="고운바탕">고운바탕 - Gowun Batang</SelectItem>
                  <SelectItem value="김정철명조">김정철명조 - Kimjungchul Myungjo</SelectItem>
                  <SelectItem value="잉크립퀴드체">잉크립퀴드체 - Ink lipquid</SelectItem>
                  <SelectItem value="온글잎">온글잎 누카 - Ownglyph Nuka</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => handleSelectChange(e, 'font_size')} name="font_type">
                <SelectTrigger className="text-sm  placeholder-red-300 ">
                  <SelectValue
                    placeholder="글 사이즈를 선택해주세요"
                    className="placeholder-red-400"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="8">8pt</SelectItem>
                  <SelectItem value="10">10pt</SelectItem>
                  <SelectItem value="12">12pt</SelectItem>
                  <SelectItem value="16">16pt</SelectItem>
                  <SelectItem value="20">20pt</SelectItem>
                  <SelectItem value="24">24pt</SelectItem>
                  {/* <SelectItem value="36">36pt</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <p className="font-bold text-sm text-[#333] pb-1 mt-4">정렬*</p>
            <div className="flex gap-2 my-2">
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  value="left"
                  id="text_left"
                  className={styles.radioItem}
                  name="arrangement"
                  onChange={handleChange}
                  defaultChecked
                />
                <label htmlFor="text_left" onClick={handleChange} className={styles.label}>
                  Left
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  value="center"
                  id="text_center"
                  className={styles.radioItem}
                  name="layout"
                  onChange={handleChange}
                />
                <label htmlFor="text_center" onClick={handleChange} className={styles.label}>
                  Center{' '}
                </label>
              </div>
              <div className="flex flex-1 items-center space-x-1">
                <input
                  type="radio"
                  value="right"
                  id="text_right"
                  className={styles.radioItem}
                  name="arrangement"
                  onChange={handleChange}
                />
                <label htmlFor="text_right" onClick={handleChange} className={styles.label}>
                  Right{' '}
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
