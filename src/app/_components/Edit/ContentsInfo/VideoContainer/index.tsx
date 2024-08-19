import React from 'react'
import styles from '../contents.module.scss'
import { VideoUpload } from './VideoUpload'

export default function VideoContainer() {

  const handleFileUpload = (files: FileList) => {
        console.log("Uploaded files:", files);
  };
  const handleChange = (e) => {
        console.log(e)
  }

  return (
    <div>
        <p className={styles.contentStepTitle}>동영상 추가*</p>        
        <VideoUpload onFileUpload={handleFileUpload} />

        <p className={styles.contentStepTitle}>동영상 비율</p>

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