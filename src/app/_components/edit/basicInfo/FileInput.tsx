'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IoClose } from 'react-icons/io5'
import { useUser } from '@supabase/auth-helpers-react'

interface FileUploadProps {
  field: any
  onFileUpload: (files: FileList) => void
}
interface ImageFileProps {
  url: string
}

// 이미지 파일을 미리보기로 생성하는 함수
const generateImagePreview = (file: File, callback?: (previewUrl: string) => void) => {
  const reader = new FileReader()
  reader.onload = () => {
    callback && callback(reader.result as string)
  }
  reader.readAsDataURL(file)
}

export default function FileInput({ field, onFileUpload, ...props }: FileUploadProps) {
  const { id } = useUser() || {}
  const [imageFile, setImageFile] = useState<ImageFileProps | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  // const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [filePreviews, setFilePreviews] = useState<string[]>([])

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileInput(files[0])
    }
  }

  // 파일 선택 또는 드래그 앤 드롭 시 호출되는 파일 처리 함수
  const handleFileInput = (file: File) => {
    generateImagePreview(file, (previewUrl) => {
      setImageFile({ url: previewUrl }) // 미리보기로 설정
    })
    handleFileUpload(file) // 파일 업로드
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileInput(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    if (id) {
      try {
        const response = await fetch(`/api/files?user_uuid=${id}`, {
          method: 'POST',
          body: form,
        })
        const responseData = await response.json()
        setImageFile((prev) => prev && { ...prev, url: responseData?.publicUrl })
        field.onChange(responseData?.publicUrl) // field value에 파일 정보 전달
        onFileUpload(responseData?.publicUrl) // 상위 컴포넌트로 업로드된 파일 URL 전달
      } catch (error) {
        console.error('File upload failed', error)
      }
    }
  }

  const handleDeletePreview = () => {
    setImageFile(null)
    field.onChange('') // field value 초기화
  }

  useEffect(() => {
    field.value && setImageFile({ url: field.value })
  }, [])

  return (
    <div
      className={`border-[1px] border-gray-200 rounded-md flex flex-col items-center justify-center p-2 
      ${isDragging && 'shadow-[0_0px_0px_5px_rgba(135,211,248,0.5)_inset]'}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {imageFile?.url ? (
        <div className="relative flex flex-wrap border-[1px] rounded-md border-gray-300">
          <img
            src={imageFile.url}
            alt={`File Preview`}
            className="aspect-auto object-cover rounded-sm"
          />
          <Button
            color="danger"
            size="sm"
            onClick={handleDeletePreview}
            className="absolute top-1 right-2 size-6 p-0 bg-slate-50"
          >
            <IoClose />
          </Button>
        </div>
      ) : (
        <div className="p-3 flex flex-col items-center">
          <Image src="/img/upload.png" width="36" height="36" alt="upload icon" />
          <p className="text-sm font-bold pb-1 text-gray-400">이미지 파일을 업로드 해주세요</p>
          <p className="text-xs mb-2 text-gray-400">최대 파일 사이즈 : 5 MB </p>
          <input
            id="img-input"
            type="file"
            onChange={handleFileInputChange}
            className="hidden"
            accept="image/jpg, image/png, image/jpeg"
          />
          <label
            htmlFor="img-input"
            className="cursor-pointer text-gray-500 size-full flex flex-col items-center justify-center"
          >
            <p className="rounded-[3px] bg-black text-white py-2 px-8 text-xs">파일 선택</p>
          </label>
        </div>
      )}
    </div>
  )
}
