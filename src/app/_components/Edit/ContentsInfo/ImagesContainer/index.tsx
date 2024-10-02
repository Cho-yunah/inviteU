import React, { useEffect } from 'react'
import styles from '../../edit.module.scss'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FileUpload } from './FileUpload';
import Accordion from '@/app/_components/common/Accordion';

import { ImageType } from '@/lib/types'; 
import { ContentsContainerProps } from '@/app/_types/contentsInfoTypes';

const initialImageData: ImageType = {
  type: 'image',
  layout: 'vertical',
  ratio: 3/4,
  urls: [] as string[]
}

export default function ImageContainer({id, onDelete, handleUpdateContent}: ContentsContainerProps) {
  const [imageData, setImageData] = React.useState(initialImageData);

  const handleFileUpload = (files: any) => {
      const updatedImageData = { ...imageData, urls: [...files] };
      setImageData(updatedImageData);
      handleUpdateContent && handleUpdateContent(updatedImageData);  // 상위 컴포넌트로 업데이트된 content 전달
  };

  const handleChange = (e:any) => {
    setImageData({
      ...imageData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Accordion>
        <Accordion.Header >{'이미지'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="초대장에 넣고 싶은 이미지를 추가해보세요">
            {/* <ImageContainer /> */}
            <div className='mt-4 pb-1'>
                <p className='font-bold text-sm text-[#333] pb-1'>이미지 추가*</p>      
                <FileUpload onFileUpload={handleFileUpload} />
                <p className='font-bold text-sm text-[#333] pb-1'>레이아웃*</p>
                <div className='flex gap-3 my-2'>
                    <div className="flex flex-1 items-center space-x-1 ">
                        <input type='radio' value="vertical" id="vertical" className={styles.radioItem} name='layout' onChange={handleChange} defaultChecked />
                        <label htmlFor="vertical" onClick={handleChange} className={styles.label}>
                          세로 나열형 
                        </label>
                    </div>
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="horizontal" id="horizontal" className={styles.radioItem} name='layout' onChange={handleChange}/>
                        <label htmlFor="horizontal" onClick={handleChange} className={styles.label}>
                          가로 나열형 </label>
                    </div>
                </div>      

                <div className='flex gap-2 my-2' >
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="3/4" id="3/4" className={styles.radioItem} name='ratio' onChange={handleChange} defaultChecked />
                        <label htmlFor="3/4" onClick={handleChange} className={styles.label}>
                          3:4
                        </label>
                    </div>
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="1/1" id="1/1" className={styles.radioItem} name='ratio' onChange={handleChange}/>
                        <label htmlFor="1/1" onClick={handleChange} className={styles.label}>
                          1:1 </label>
                    </div>
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="4/3" id="4/3" className={styles.radioItem} name='ratio' onChange={handleChange}/>
                        <label htmlFor="4/3" onClick={handleChange} className={styles.label}>
                          4:3 </label>
                    </div>
                </div>      
            </div>
            <button onClick={(e) => onDelete && onDelete(id)} className='relative bottom-0 left-[235px] flex items-center justify-center border-[1px] border-gray-300 rounded-sm w-[65px] p-1 my-2'>
                <p>삭제</p>
                <RiDeleteBin6Line className='size-4 text-gray-600 ml-1' />
            </button>
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
  )
}
