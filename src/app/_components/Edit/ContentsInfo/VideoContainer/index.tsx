import React from 'react'
import styles from '../../edit.module.scss'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ContainerProps } from '@/app/_types/editTypes';
import Accordion from '@/app/_components/common/Accordion';
import { VideoUpload } from './VideoUpload';

export default function VideoContainer({setComponents,id}: ContainerProps) {

  const handleFileUpload = (files: FileList) => {
        console.log("Uploaded files:", files);
  };
  const handleChange = (e: any) => {
        console.log(e)
  }

  const handleDeleteComponent = (id: number) => {
    setComponents((prevComponents:  ContainerProps[]) => prevComponents.filter((component) => component.id != id));
  };

  return (
    <Accordion >
        <Accordion.Header >{'동영상'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="초대장에 넣고 싶은 동영상을 추가해보세요">
            <div className='mt-4 pb-1'>
                <p className='font-bold text-sm text-[#333] pb-1'>동영상 추가*</p>        
                <VideoUpload onFileUpload={handleFileUpload} />

                <p className='font-bold text-sm text-[#333] py-1'>동영상 비율</p>
                <div className='flex gap-2 my-2' >
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="3:4" id="3/4" className={styles.radioItem} name='arrangement' onChange={handleChange} defaultChecked />
                        <label htmlFor="3/4" onClick={handleChange} className={styles.label}>
                          3:4
                        </label>
                    </div>
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="1:1" id="1/1" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                        <label htmlFor="1/1" onClick={handleChange} className={styles.label}>
                          1:1 </label>
                    </div>
                    <div className="flex flex-1 items-center space-x-1">
                        <input type='radio' value="4:3" id="4/3" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                        <label htmlFor="4/3" onClick={handleChange} className={styles.label}>
                          4:3 </label>
                    </div>
                </div>      
            </div>
             <button onClick={() => handleDeleteComponent(id)} className='relative bottom-0 left-[235px] flex items-center justify-center border-[1px] border-gray-300 rounded-sm w-[65px] p-1 my-2'>
                <p>삭제</p>
                <RiDeleteBin6Line className='size-4 text-gray-600 ml-1' />
              </button>
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
  )
}
