export interface ContentsComponentType {
  id: string
  type: string
  content: {}
}

export interface SortableItemProps {
  id: string
  type: string
  setComponents: (component: any) => void
  content: any
}

export interface ContentsContainerProps {
  id: string
  type?: string
  content: any
  onDelete: (id: string) => void
  handleUpdateContent: (content: any) => void
}
