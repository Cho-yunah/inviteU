import React from 'react'
import styles from '../contents.module.scss'
import { FileUpload } from './FileUpload'
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function ImageContainer() {

  const handleFileUpload = (files: FileList) => {
        // Handle the uploaded files here
        console.log("Uploaded files:", files);
  };
  const handleChange = (e) => {
        console.log(e)
  }

  return (
    <div>
        <p className={styles.contentStepTitle}>이미지 추가*</p>        
        <FileUpload onFileUpload={handleFileUpload} />

        <p className={styles.contentStepTitle}>레이아웃*</p>
        <div className='flex gap-3 my-2'>
            <div className="flex flex-1 items-center space-x-1 ">
                <input type='radio' value="vertical" id="vertical" className={styles.radioItem} name='structure' onChange={handleChange} defaultChecked />
                <label htmlFor="vertical" onClick={handleChange} className={styles.label}>
                  세로 나열형 
                </label>
            </div>
            <div className="flex flex-1 items-center space-x-1">
                <input type='radio' value="horizontal" id="horizontal" className={styles.radioItem} name='structure' onChange={handleChange}/>
                <label htmlFor="horizontal" onClick={handleChange} className={styles.label}>
                  가로 나열형 </label>
            </div>
        </div>      

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
  )
}
