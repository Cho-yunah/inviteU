import React from 'react'
import styles from '../../edit.module.scss'
import Accordion from '@/app/_components/common/accordion/Accordion'

export default function IntervalContainer() {

  const handleChange = (e: any) => {
        console.log(e)
  }

  return (
    <Accordion>
    <Accordion.Header >{'간격'}</Accordion.Header>
    <Accordion.Animation>
      <Accordion.Content description="콘텐츠와 콘텐츠 사이의 간격을 설정할 수 있어요">
        <div className='mt-4'>
            <p className='font-bold text-sm text-[#333] pb-1'>간격 사이즈*</p>        
            <div className='flex gap-2 my-2' >
                <div className="flex flex-1 items-center space-x-1">
                    <input type='radio' value="interval_sm" id="interval_sm" className={styles.radioItem} name='arrangement' onChange={handleChange} defaultChecked />
                    <label htmlFor="interval_sm" onClick={handleChange} className={styles.label}>
                      Small
                    </label>
                </div>
                <div className="flex flex-1 items-center space-x-1">
                    <input type='radio' value="interval_md" id="interval_md" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                    <label htmlFor="interval_md" onClick={handleChange} className={styles.label}>
                      Medium </label>
                </div>
                <div className="flex flex-1 items-center space-x-1">
                    <input type='radio' value="interval_lg" id="interval_lg" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                    <label htmlFor="interval_lg" onClick={handleChange} className={styles.label}>
                    Large </label>
                </div>
            </div>      
        </div>
      </Accordion.Content>
    </Accordion.Animation>
  </Accordion>
  )
}
