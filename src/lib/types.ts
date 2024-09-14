export type ImageType = {
  type: 'image'
  layout: 'vertical' | 'horizontal'
  ratio: number
  urls: string
}
export type VideoType = {
  type: 'video'
  ratio: number
  urls: string
}
export type TextType = {
  type: 'text'
  font_size: number
  font_type: string
  urls: string
  layout: 'left' | 'center' | 'right'
  text: string
}
export type IntervalType = {
  type: 'interval'
  size: 'small' | 'medium' | 'big'
}

export type MapType = {
  type: 'map'
  main_address: string
  detail_address: string
  post_number: number
}
export type ContentDataType =
  | ImageType
  | VideoType
  | TextType
  | IntervalType
  | MapType
