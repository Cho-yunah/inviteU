import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { ContentsComponentType } from '@/app/_types/contentsInfoTypes'
import SortableItem from '@/app/_components/edit/contentsInfo/sortableItem'
import BottomDrawer from '@/app/_components/common/bottomDrawer'
import { ContentDataType } from '@/lib/types'

const initialComponents: ContentsComponentType[] = []

export default function ContentsInfo({
  contentsInfo,
  setContentsInfo,
  setShowPreviewModal,
  onClose,
}: {
  contentsInfo: ContentDataType[]
  setContentsInfo: (value: ContentDataType[]) => void
  setShowPreviewModal: (value: boolean) => void
  onClose: () => void
}) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [components, setComponents] = useState(initialComponents)

  const handleShowDrawer = () => {
    setShowDrawer(true)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleAddComponent = (name: string) => {
    const newComponent = {
      id: uuidv4(), // UUID 사용
      type: name,
      content: {},
    }
    setComponents((prevComponents) => [...prevComponents, newComponent])
  }

  const handlePreview = () => {
    setShowPreviewModal(true)
  }

  // components가 변경될 때 contentsInfo를 업데이트
  useEffect(() => {
    console.log('컴포넌트 변경', components)

    // 현재 components와 contentsInfo가 다를 때만 업데이트
    if (components.length > 0) {
      const contentArray: ContentDataType[] = components.map(
        (item) => item.content as ContentDataType,
      )
      if (JSON.stringify(contentArray) !== JSON.stringify(contentsInfo)) {
        setContentsInfo(contentArray)
      }
    }
  }, [components, contentsInfo, setContentsInfo])

  // contentsInfo가 변경될 때 components를 업데이트
  useEffect(() => {
    if (contentsInfo.length > 0 && components.length === 0) {
      console.log(contentsInfo)
      // 컴포넌트가 초기화되지 않은 경우에만 실행
      const updatedComponents = contentsInfo.map((info) => ({
        id: uuidv4(),
        type: info.type,
        content: info, // contentsInfo의 항목을 content 객체에 넣음
      }))
      setComponents(updatedComponents)
    }
  }, [contentsInfo])

  return (
    <div>
      <div className="w-full">
        <button
          type="button"
          onClick={handleShowDrawer}
          className="mt-5 bg-black w-full rounded-md text-base text-white p-2 border-2 border-black flex items-center justify-center"
        >
          <span>콘텐츠 추가하기 + </span>
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="mt-3 bg-white w-full rounded-md text-base text-black border-[1px] p-2"
        >
          <span>미리보기</span>
        </button>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={components} strategy={verticalListSortingStrategy}>
            {components.map((component) => (
              <SortableItem
                key={component.id}
                id={component.id}
                setComponents={setComponents}
                type={component.type || ''}
                content={component.content} // contentsInfo에서 내려주는 content
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <BottomDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        handleAddComponent={handleAddComponent}
      />
    </div>
  )
}
