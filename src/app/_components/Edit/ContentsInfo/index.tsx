import React, { useState } from 'react';
import Image from 'next/image';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImageContainer from './ImagesContainer';
import VideoContainer from './VideoContainer';
import MapContainer from './MapContainer'
import IntervalContainer from './IntervalContainer'
import TextContainer from './TextContainer'
import BottomDrawer from '../../common/BottomDrawer';

interface Component {
  id: string;
  content: JSX.Element;
}

const initialComponents: Component[] = [];

interface SortableItemProps {
  id: string;
  content: JSX.Element;
  handleDeleteComponent: (id: string) => void;
}

function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    margin: "4px 0px"
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} className='absolute'>
      {/* 드래그 핸들 버튼 */}
      <button
        {...listeners}
        style={{
          position: "absolute",
          top: "13px",
          left: "8px",
          cursor: "grab",
        }}
      >
        <Image src="./Drag.svg" alt='move button' width={24} height={24} />
      </button>
      {props.content}
    </div>
  );
}

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
    // 선택한 컴포넌트 추가
    const switchComponent = () => {
      switch (name) {
        case 'Image':
          return <ImageContainer setComponents={setComponents} id={components.length+1} />;
        case 'Video':
          return <VideoContainer setComponents={setComponents} id={components.length+1} />;
        case 'Map':
          return <MapContainer setComponents={setComponents} id={components.length+1} />;
        case 'Text':
          return <TextContainer setComponents={setComponents} id={components.length+1} />;
        case 'Interval':
          return <IntervalContainer setComponents={setComponents} id={components.length+1} />;
        default:
          return <ImageContainer setComponents={setComponents} id={components.length+1} />;
      }
    }

    const newComponent = {
        id: `${components.length + 1}`,
        content: switchComponent(), // 새로운 컴포넌트 유형을 원하는 대로 설정할 수 있습니다.
    };
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };


  const handleDeleteComponent = (id: string) => {
    console.log('delete', id)
    setComponents((prevComponents) => prevComponents.filter((component) => component.id !== id));
  };

  return (
    <div >
      <div className='w-full'>
        <button onClick={handleShowDrawer} className='mt-5 bg-black w-full rounded-md text-base text-white p-3 flex items-center justify-center'>
          <span>콘텐츠 추가하기 + </span>
        </button>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={components} strategy={verticalListSortingStrategy}>
            {components.map((component) => (
              <SortableItem 
                key={component.id} 
                id={component.id} 
                content={component.content}
                handleDeleteComponent={handleDeleteComponent} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <BottomDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} handleAddComponent={handleAddComponent} />  
    </div>
  );
}

