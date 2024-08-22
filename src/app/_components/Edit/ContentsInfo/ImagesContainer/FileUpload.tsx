'use client'

import React, { useState } from "react";
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

interface FileUploadProps  {
    onFileUpload: (files: FileList) => void;
}
  
export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, ...props }) => {
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
        console.log(files)
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
          setFilePreviews([...filePreviews , ...previews]);
        };
        reader.readAsDataURL(file);
      });
    };
  
    const handleDeletePreview = (index: number) => {
      const updatedPreviews = [...filePreviews];
      updatedPreviews.splice(index, 1);
      setFilePreviews(updatedPreviews);
    };
  
    return (
        <div className={`grid grid-cols-2 grid-rows-auto gap-x-4 gap-y-3 px-2 py-1 mb-4 ${isDragging && 'shadow-[0_0px_0px_5px_rgba(135,211,248,0.5)_inset]'}`}>
          <div
            className={`size-[130px] bg-gray-50 border-[1px] rounded-md border-gray-300 p-4 text-center ${
              isDragging ? "bg-gray-100" : ""
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Input
              id="file-input"
              type="file"
              {...props}
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
            <label htmlFor={"file-input"}
              className="cursor-pointer text-gray-500 size-full flex flex-col items-center justify-center"
            >
                <img src='/plus.svg' width='24' height='24' alt='plus icon' />
            </label>
          </div>
            {filePreviews.map((preview, index) => (
              <div key={index} className="size-[130px] relative flex flex-wrap p-2 border-[1px] rounded-md border-gray-300">
                <img
                  src={preview}
                  alt={`File Preview ${index + 1}`}
                  className="size-[110px] bg-yellow-300 aspect-square object-cover rounded-sm"
                />
                <Button
                  color="danger"
                  size='sm'
                  onClick={() => handleDeletePreview(index)}
                  className="absolute top-1 right-2 size-5 p-0 bg-slate-50"
                >
                    <IoClose />
                </Button>
              </div>
            ))}
        </div>
    );
};