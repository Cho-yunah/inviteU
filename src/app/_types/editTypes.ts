export interface ContainerProps {
    id: string;
    type?: string;
    components?: any;
    setComponents?: (component: any) => void;
    onDelete?: (id: string) => void;
    contentInfo?:any;
    setContentInfo?: (content: any) => void;
    onUpdateContent?: (content: any) => void;
}