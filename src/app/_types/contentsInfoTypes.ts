export interface ContentsComponentType {
    id: string;
    type: string;
    setComponents?: (component: any) => void;
}

export interface SortableItemProps {
    id: string;
    type: string;
    onDelete?: (id: string) => void;
    setComponents: (component: any) => void;
}

export interface ContainerProps {
    id: string;
    onDelete: (id: string) => void;
}