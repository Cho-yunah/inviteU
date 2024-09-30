import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import BottomDrawer from '../../common/BottomDrawer';
import SortableItem from './SortableItem';
import { ContentsComponentType } from '@/app/_types/contentsInfoTypes';


const initialComponents: ContentsComponentType[] = [];

export default function EditContents() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [components, setComponents] = useState(initialComponents);
  

  const handleShowDrawer = () => {
    setShowDrawer(true);
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddComponent = (name: string) => {
    const newComponent = {
        id: uuidv4(),  // UUID 사용
        type: name, 
    };
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handlePreview=() => {
    console.log('preview')
  }

  return (
    <div>
      <div className='w-full'>
        <button onClick={handleShowDrawer} className='mt-5 bg-black w-full rounded-md text-base text-white p-2 border-2 border-black flex items-center justify-center'>
          <span>콘텐츠 추가하기 + </span>
        </button>
        <button onClick={handlePreview} className='mt-3 bg-white w-full rounded-md text-base text-black border-[1px] p-2'>
          <span>미리보기</span>
        </button>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={components} strategy={verticalListSortingStrategy}>
            {components.map((component) => (
              <SortableItem
                key={component.id} 
                id={component.id} 
                setComponents={setComponents}
                type={component.type || ''}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <BottomDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} handleAddComponent={handleAddComponent} />  
    </div>
  );
}