'use client'

import React, { useState } from "react";
import { Input } from '@/components/ui/input'
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/app/_components/common/LoadingSpinner";


interface FileUploadProps  {
    onFileUpload: (files: FileList) => void;
}

interface videoFileProps {
    url: string;
    // video: string;
}
  
export const VideoUpload: React.FC<FileUploadProps> = ({ onFileUpload, ...props }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [videoFile, setVideoFile] = useState<videoFileProps>()
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

      // upload 하려는 파일이 image 인지, video 인지 구분
      const imageType = files && files[0].type.includes('image');
      const videoType = files && files[0].type.includes('video');

      if (files && files.length > 0) {
        setVideoFile({
          url: URL.createObjectURL(files[0]),
        //   image: imageType,
        //   video: videoType,
        });
        uploadFiles(files);
        previewFiles(files);
      }
    };

    const uploadFiles = (files: FileList) => {
      Array.from(files).forEach((file, index) => {
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
              onFileUpload(files);
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
          setFilePreviews([...previews]);
        };
        reader.readAsDataURL(file);
      });
    };
  
    const handleDeletePreview = () => {
      setFilePreviews([]);
      setVideoFile({url: ''});
    };
  
    return (
        <div className="grid grid-cols-1 grid-rows-1 px-2 mb-4">
          <div
            className={`w-full aspect-[1.2/1] bg-gray-50 border-[1px] rounded-md border-gray-300 p-2 text-center ${isDragging && 'shadow-[0_0px_0px_5px_rgba(135,211,248,0.5)_inset]'}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {videoFile?.url ?
                <div className="relative">
                    <video src={videoFile.url} controls className="object-contain aspect-[1.2/1]" />
                    <Button
                        color="danger"
                        size='sm'
                        onClick={handleDeletePreview}
                        className="absolute top-1 right-2 w-5 h-5 p-0 bg-slate-300"
                        >
                            <IoClose />
                    </Button>
                </div>
                : <>
                    <Input
                        id="video-input"
                        type="file"
                        {...props}
                        onChange={handleFileInputChange}
                        className="hidden "
                        accept=".mov, .mp4"
                    />
                    <label htmlFor={"video-input"}
                        className="cursor-pointer text-gray-500 w-full h-full flex flex-col items-center justify-center"
                    >
                        <img src='/plus.svg' width='24' height='24' alt='plus icon' />
                    </label>
                </>
            }
          </div>
          {/* {uploadProgress !==null && (
            <LoadingSpinner />
          )} */}
        </div>
    );
};