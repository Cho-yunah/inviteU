import React from 'react'
import styles from '../../edit.module.scss'
import { VideoUpload } from './VideoUpload'
import Accordion from '@/app/_components/common/accordion/Accordion';

export default function VideoContainer() {

  const handleFileUpload = (files: FileList) => {
        console.log("Uploaded files:", files);
  };
  const handleChange = (e: any) => {
        console.log(e)
  }

  return (
    <Accordion>
        <Accordion.Header >{'동영상'}</Accordion.Header>
        <Accordion.Animation>
          <Accordion.Content description="초대장에 넣고 싶은 동영상을 추가해보세요">
            <div className='mt-4'>
                <p className='font-bold text-sm text-[#333] pb-1'>동영상 추가*</p>        
                <VideoUpload onFileUpload={handleFileUpload} />

                <p className='font-bold text-sm text-[#333] pb-1'>동영상 비율</p>
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
          </Accordion.Content>
        </Accordion.Animation>
      </Accordion>
  )
}
