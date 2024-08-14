import React from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Upload from '../../../../public/img/upload.png'
import { Label } from '@/components/ui/label'



interface Props {

}

export default function FileInput() {
  return (
    <div className='border-[1px] border-gray-200 rounded-2 flex flex-col items-center justify-center p-5'>
        <Image src={Upload} alt='upload icon' className='mt-3'/>
        <p className='font-bold pb-1 text-gray-400'>이미지 파일을 업로드 해주세요</p>
        <p className='text-xs pb-2 text-gray-400'>최대 파일 사이즈 : 5 MB </p>
        <Label htmlFor="picture" className='mt-2 rounded-[3px] bg-black text-white py-2 px-8 text-xs'>파일 선택</Label>
        <Input id="picture" type="file" className='opacity-0'/>
    </div>
  )
}
