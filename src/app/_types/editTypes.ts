export interface Component {
    id: string;
    content: JSX.Element;
}
  
export interface ContainerProps {
    setComponents:  (value: React.SetStateAction<Component[]>) => void
    id: number;
}