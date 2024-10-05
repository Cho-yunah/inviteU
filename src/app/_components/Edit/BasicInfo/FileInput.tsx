import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { IoClose } from 'react-icons/io5';
import { useUser } from '@supabase/auth-helpers-react';

interface FileUploadProps  {
  field: any;
  onFileUpload: (files: FileList) => void;
}

export default function FileInput({ field, onFileUpload, ...props }:FileUploadProps) {
    const {id} = useUser() || {};
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
  
    const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      setIsDragging(false);
    };
  
    const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFiles(files);
        previewFiles(files);
      }
    };
  
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        uploadFiles(files);
        previewFiles(files);
        handleFileUpload(files[0])
      }
    };
  
    const uploadFiles = (files: FileList) => {
      Array.from(files).forEach((file) => {
        const totalSize = file.size;
        const chunkSize = 1024 * 1024; 
        let uploaded = 0;
  
        const uploadInterval = setInterval(() => {
          uploaded += chunkSize;
          const progress = (uploaded / totalSize) * 100;
  
          setUploadProgress(progress);
  
          if (progress >= 100) {
            clearInterval(uploadInterval);
            setTimeout(() => {
              setUploadProgress(null);
            }, 500); // Delay for visual feedback
          }
        }, 500); // Simulated 500ms delay per chunk
      });
    };
    
    const previewFiles = (files: FileList) => {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          previews.push(reader.result as string);
          setFilePreviews([...filePreviews , ...previews]);
        };
        reader.readAsDataURL(file);
      });
    };
  
    const handleDeletePreview = () => {
      setFilePreviews([]);
    };

    /* Multipart/formdata Upload */
    const handleFileUpload= async(file: File) => {
      const form = new FormData();
      form.append('file', file);
      if(!!id && !!form) {
        const response = await fetch(`/api/files?user_uuid=${id}`, {
          method: 'POST',
          body: form,
        })
        const responseData = await response.json();
        // console.log(responseData, 'onSubmitImage_response');
        field.onChange(responseData?.publicUrl); // field value에 파일 정보 전달
        onFileUpload(responseData?.publicUrl); // 상위 컴포넌트로 파일 정보 전달
      }
    }

  return (
    <div className={`border-[1px] border-gray-200 rounded-md flex flex-col items-center justify-center p-2 
      ${isDragging && 'shadow-[0_0px_0px_5px_rgba(135,211,248,0.5)_inset]'}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      >
        {filePreviews.length != 0? 
          <div className="relative flex flex-wrap border-[1px] rounded-md border-gray-300">
            <img
              src={filePreviews[0]}
              alt={`File Preview`}
              className="aspect-auto object-cover rounded-sm"
            />
            <Button
              color="danger"
              size='sm'
              onClick={handleDeletePreview}
              className="absolute top-1 right-2 size-6 p-0 bg-slate-50"
            >
              <IoClose />
            </Button>
          </div>
          :
        <div className='p-3 flex flex-col items-center'>
          <Image src='/img/upload.png' width='36' height='36' alt='upload icon'/>
          <p className='text-sm font-bold pb-1 text-gray-400'>이미지 파일을 업로드 해주세요</p>
          <p className='text-xs mb-2 text-gray-400'>최대 파일 사이즈 : 5 MB </p>
          <input 
            type="file" 
            accept="image/jpg, image/png, image/jpeg" 
            {...props} 
            onChange={handleFileInputChange} 
            className="hidden"
            id='img-input'
          />
          <label htmlFor="img-input" className='cursor-pointer'>
            <p className='rounded-[3px] bg-black text-white py-2 px-8 text-xs'>파일 선택</p>
          </label>
        </div>
        }
    </div>
  )
}
