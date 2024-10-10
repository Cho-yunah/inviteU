'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { useUser } from '@supabase/auth-helpers-react'

interface FileUploadProps {
  onFileUpload: (files: FileList) => void
}

interface videoFileProps {
  url: string
  thumbnailUrl: string
}

// 썸네일을 생성하는 함수
const generateThumbnail = (file: File, callback: (thumbnailUrl: string) => void) => {
  const video = document.createElement('video')
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  video.src = URL.createObjectURL(file)
  video.addEventListener('loadeddata', () => {
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context?.drawImage(video, 0, 0, canvas.width, canvas.height)

    const thumbnailUrl = canvas.toDataURL('image/png')
    callback(thumbnailUrl)
  })
}

export const VideoUpload: React.FC<FileUploadProps> = ({ onFileUpload, ...props }) => {
  const { id } = useUser() || {}

  const [isDragging, setIsDragging] = useState(false)
  const [videoFile, setVideoFile] = useState<videoFileProps>()

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
      handleFileInput(files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileInput(files)
    }
  }

  const handleFileInput = (files: FileList) => {
    const file = files[0]

    // 썸네일 생성
    generateThumbnail(file, (thumbnailUrl) => {
      setVideoFile({
        url: URL.createObjectURL(file),
        thumbnailUrl: thumbnailUrl,
      })
    })

    handleFileUpload(file) // 파일 업로드
  }

  /* Multipart/formdata Upload */
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
        setVideoFile((prev) => prev && { ...prev, url: responseData?.publicUrl })
        onFileUpload(responseData?.publicUrl) // 상위 컴포넌트로 업로드된 파일 URL 전달
      } catch (error) {
        console.error('File upload failed', error)
      }
    }
  }

  const previewFiles = (files: FileList) => {
    const previews: string[] = []
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        previews.push(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDeletePreview = () => {
    setVideoFile(undefined)
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1 px-2 mb-4">
      <div
        className={`w-full bg-gray-50 border-[1px] rounded-md border-gray-300 p-2 text-center ${isDragging && 'shadow-[0_0px_0px_5px_rgba(135,211,248,0.5)_inset]'}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {videoFile?.url ? (
          <div className="relative">
            <video src={videoFile.url} controls className="object-contain" />
            <Button
              color="danger"
              size="sm"
              onClick={handleDeletePreview}
              className="absolute top-1 right-2 size-5 p-0 bg-slate-300"
            >
              <IoClose />
            </Button>
          </div>
        ) : (
          <>
            <Input
              id="video-input"
              type="file"
              {...props}
              onChange={handleFileInputChange}
              className="hidden "
              accept=".mov, .mp4"
            />
            <label
              htmlFor={'video-input'}
              className="cursor-pointer text-gray-500 min-h-[140px] size-full flex flex-col items-center justify-center"
            >
              {videoFile?.thumbnailUrl ? (
                <img src={videoFile.thumbnailUrl} alt="Video thumbnail" />
              ) : (
                <img src="/plus.svg" width="24" height="24" alt="plus icon" className="my-10" />
              )}{' '}
            </label>
          </>
        )}
      </div>
    </div>
  )
}
