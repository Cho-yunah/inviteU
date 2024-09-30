import React, { useEffect } from 'react';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { SortableItemProps } from '@/app/_types/contentsInfoTypes';
import ImageContainer from '../ImagesContainer';
import VideoContainer from '../VideoContainer';
import MapContainer from '../MapContainer';
import TextContainer from '../TextContainer';
import IntervalContainer from '../IntervalContainer';
import { ContainerProps } from '@/app/_types/editTypes';


function SortableItem({id, setComponents, type}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        margin: "4px 0px"
    };

    const onDelete = (id :string) => {
        setComponents((prevComponents:  ContainerProps[]) => prevComponents.filter((component) => component.id != id));
    };

    useEffect(()=> {
        console.log(type)
    }, [type])
    
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
            {/* {props.content} */}
            {switchComponent({ id, type, setComponents, onDelete})} 
        </div>
    );
}

export default SortableItem;

// 선택한 컴포넌트 추가
const switchComponent = ({id, type, onDelete}: SortableItemProps) => {
    switch (type) {
        case 'Image':
            return <ImageContainer  type='image' id={id} onDelete={onDelete}/>;
        case 'Video':
            return <VideoContainer  type='video' id={id} onDelete={onDelete} />;
        case 'Map':
            return <MapContainer  type='map' id={id} onDelete={onDelete} />;
        case 'Text':
            return <TextContainer type='text' id={id} onDelete={onDelete} />;
        case 'Interval':
            return <IntervalContainer  type='interval' id={id} onDelete={onDelete} />;
        default:
            return <ImageContainer  type='image' id={id} onDelete={onDelete} />;
    }
}