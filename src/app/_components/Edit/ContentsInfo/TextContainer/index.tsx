import React from 'react'
import styles from '../../edit.module.scss'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'

export default function TextContainer() {

  const handleChange = (e:any) => {
        console.log(e)
  }

  return (
    <div className='mt-4'>
        <p className='font-bold text-sm text-[#333] pb-1 mt-2'>문구*</p>        
        <div className='flex gap-2 my-2' >
            <textarea className='w-full h-24 p-2 border border-[#333] rounded-md' placeholder='내용을 입력해주세요'></textarea>
        </div>      
        <p className='font-bold text-sm text-[#333] pb-1 mt-2'>폰트 및 사이즈*</p>        
        <div className='flex gap-2 my-2' >
            <Select>
                    {/* <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                    </FormControl> */}
                    <SelectContent>
                    <SelectItem value="나눔명조">나눔명조 Regular</SelectItem>
                    <SelectItem value="고운바탕">고운바탕</SelectItem>
                    <SelectItem value="김정철명조">김정철명조</SelectItem>
                    <SelectItem value="잉크립퀴드체">잉크립퀴드체</SelectItem>
                    <SelectItem value="온글잎">온글잎 누카</SelectItem>
                    </SelectContent>
            </Select>            
            <Select>
                    <SelectContent>
                    <SelectItem value="8pt">8pt</SelectItem>
                    <SelectItem value="10pt">10pt</SelectItem>
                    <SelectItem value="12pt">12pt</SelectItem>
                    <SelectItem value="16pt">16pt</SelectItem>
                    <SelectItem value="20pt">20pt</SelectItem>
                    <SelectItem value="24pt">24pt</SelectItem>
                    <SelectItem value="36pt">36pt</SelectItem>
                    </SelectContent>
            </Select>            
        </div>      
        <p className='font-bold text-sm text-[#333] pb-1 mt-2'>정렬*</p>        
        <div className='flex gap-2 my-2' >
            <div className="flex flex-1 items-center space-x-1">
                <input type='radio' value="text_left" id="text_left" className={styles.radioItem} name='arrangement' onChange={handleChange} defaultChecked />
                <label htmlFor="text_left" onClick={handleChange} className={styles.label}>
                  Left
                </label>
            </div>
            <div className="flex flex-1 items-center space-x-1">
                <input type='radio' value="text_center" id="text_center" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                <label htmlFor="text_center" onClick={handleChange} className={styles.label}>
                  Center </label>
            </div>
            <div className="flex flex-1 items-center space-x-1">
                <input type='radio' value="text_right" id="text_right" className={styles.radioItem} name='arrangement' onChange={handleChange}/>
                <label htmlFor="text_right" onClick={handleChange} className={styles.label}>
                 Right </label>
            </div>
        </div>      
    </div>
  )
}
