import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImageContainer from './ImagesContainer'
import VideoContainer from './VideoContainer'
import MapContainer from './MapContainer'
import IntervalContainer from './IntervalContainer'
import TextContainer from './TextContainer'
import Image from 'next/image';

const initialComponents = [
  { id: '1', content: <ImageContainer /> },
  { id: '2', content: <VideoContainer /> },
  { id: '3', content: <MapContainer /> },
  { id: '4', content: <TextContainer />},
  { id: '5', content: <IntervalContainer /> },
];

 function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    margin: "4px 0",
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
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
  const [components, setComponents] = useState(initialComponents);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className='w-max-[350px] overflow-hidden'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={components} strategy={verticalListSortingStrategy}>
          {components.map((component) => (
            <SortableItem key={component.id} id={component.id} content={component.content} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

