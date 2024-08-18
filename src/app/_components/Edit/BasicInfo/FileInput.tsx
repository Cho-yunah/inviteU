import React from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
// import Upload from '/img/upload.png'
import { Label } from '@/components/ui/label'

export default function FileInput() {
  return (
    <div className='border-[1px] border-gray-200 rounded-2 flex flex-col items-center justify-center p-5'>
        <Image src='/img/upload.png' width='36' height='36' alt='upload icon'/>
        <p className='text-sm font-bold pb-1 text-gray-400'>이미지 파일을 업로드 해주세요</p>
        <p className='text-xs mb-2 text-gray-400'>최대 파일 사이즈 : 5 MB </p>
        <div className='mt-2'>
          <Label htmlFor="picture" className='rounded-[3px] bg-black text-white py-2 px-8 text-xs'>파일 선택</Label>
          <Input id="picture" type="file" className='invisible h-0 w-0'/>
        </div>
    </div>
  )
}
