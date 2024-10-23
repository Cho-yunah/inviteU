import React, { useEffect } from 'react'
import Image from 'next/image'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { ContentsContainerProps, SortableItemProps } from '@/app/_types/contentsInfoTypes'
import ImageContainer from '../imagesContainer'
import VideoContainer from '../videoContainer'
import MapContainer from '../mapContainer'
import TextContainer from '../textContainer'
import IntervalContainer from '../intervalContainer'

const normalizeContent = (content: any) => {
  let urls = content.urls || content.image_url || '' // 두 가지 중 하나라도 사용
  return { ...content, urls }
}

function SortableItem({ id, type, setComponents, content }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    margin: '4px 0px',
  }
  const normalizedContent = normalizeContent(content)

  const handleUpdateContent = (updatedContent: any) => {
    setComponents((prevComponents: SortableItemProps[]) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, content: updatedContent } : component,
      ),
    )
  }

  const onDelete = (id: string) => {
    setComponents((prevComponents: SortableItemProps[]) =>
      prevComponents.filter((component) => component.id != id),
    )
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="absolute">
      {/* 드래그 핸들 버튼 */}
      <button
        {...listeners}
        type="button"
        style={{
          position: 'absolute',
          top: '17px',
          left: '7px',
          cursor: 'grab',
        }}
      >
        <Image src="/Drag.svg" alt="move button" width={24} height={24} />
      </button>
      {switchComponent({ id, type, content: normalizedContent, onDelete, handleUpdateContent })}
    </div>
  )
}

export default SortableItem

// 선택한 컴포넌트 추가
const switchComponent = ({
  id,
  type,
  content,
  onDelete,
  handleUpdateContent,
}: ContentsContainerProps) => {
  switch (type) {
    case 'image':
      return (
        <ImageContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
    case 'video':
      return (
        <VideoContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
    case 'map':
      return (
        <MapContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
    case 'text':
      return (
        <TextContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
    case 'interval':
      return (
        <IntervalContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
    default:
      return (
        <ImageContainer
          id={id}
          content={content}
          onDelete={onDelete}
          handleUpdateContent={handleUpdateContent}
        />
      )
  }
}
