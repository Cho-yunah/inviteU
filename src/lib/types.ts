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
  post_number: string
}
export type ContentDataType = ImageType | VideoType | TextType | IntervalType | MapType

export const exampleContents: ContentDataType[] = [
  {
    type: 'image',
    layout: 'vertical',
    ratio: 1.5,
    urls: 'https://hjjneamnafhopugmpfpu.supabase.co/storage/v1/object/public/inviteU/image/a9542077-f708-481b-b72f-7fec5ca4ff55/1727196501845.svg',
  },
  {
    type: 'video',
    ratio: 16 / 9,
    urls: 'https://hjjneamnafhopugmpfpu.supabase.co/storage/v1/object/public/inviteU/image/a9542077-f708-481b-b72f-7fec5ca4ff55/1727196501845.svg',
  },
  {
    type: 'text',
    font_size: 16,
    font_type: '나눔고딕',
    layout: 'center',
    text: '안녕하세요, 이것은 예시 텍스트입니다.',
  },
  {
    type: 'interval',
    size: 'medium',
  },
  {
    type: 'map',
    main_address: '서울특별시 강남구',
    detail_address: '테헤란로 123',
    post_number: string,
  },
]
