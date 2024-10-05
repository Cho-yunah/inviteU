import React, { useEffect } from 'react';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { ContentsContainerProps, SortableItemProps } from '@/app/_types/contentsInfoTypes';
import ImageContainer from '../ImagesContainer';
import VideoContainer from '../VideoContainer';
import MapContainer from '../MapContainer';
import TextContainer from '../TextContainer';
import IntervalContainer from '../IntervalContainer';

function SortableItem({id, type, setComponents}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        margin: "4px 0px"
    };

    const handleUpdateContent = (updatedContent : any) => {
        setComponents((prevComponents: SortableItemProps[]) =>
            prevComponents.map((component) =>
            component.id === id ? { ...component, content: updatedContent } : component
        ));
    };

    const onDelete = (id :string) => {
        setComponents((prevComponents: SortableItemProps[]) => prevComponents.filter((component) => component.id != id));
    };
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} className='absolute'>
            {/* 드래그 핸들 버튼 */}
            <button
                {...listeners}
                    style={{
                    position: "absolute",
                    top: "17px",
                    left: "7px",
                    cursor: "grab",
                }}
            >
                <Image src="/Drag.svg" alt='move button' width={24} height={24} />
            </button>
            {switchComponent({ id, type, onDelete, handleUpdateContent})} 
        </div>
    );
}

export default SortableItem;

// 선택한 컴포넌트 추가
const switchComponent = ({id, type, onDelete, handleUpdateContent}: ContentsContainerProps) => {
    switch (type) {
        case 'Image':
            return <ImageContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
        case 'Video':
            return <VideoContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
        case 'Map':
            return <MapContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
        case 'Text':
            return <TextContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
        case 'Interval':
            return <IntervalContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
        default:
            return <ImageContainer id={id} onDelete={onDelete} handleUpdateContent={handleUpdateContent}/>;
    }
}