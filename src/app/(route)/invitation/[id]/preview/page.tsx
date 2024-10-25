'use client'

import Link from 'next/link'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import {
  ImageComponent,
  IntervalComponent,
  MapComponent,
  TextComponent,
  VideoComponent,
} from '@/app/_components/edit/previewModal/RenderContents'

const PreviewPage = () => {
  const currentInvitation = useSelector((state: RootState) => state.invitation.selected)

  const { background_image, contents } = currentInvitation ?? {}

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-3">
      {/* 박스 내부 스크롤 영역 */}
      <div
        className="border-[1px] rounded-xl shadow-md overflow-y-scroll"
        style={{ maxHeight: '65vh', maxWidth: '310px' }}
      >
        <div
          className="bg-cover bg-center rounded-xl overflow-y-auto"
          style={{
            backgroundImage: `url('/img/background_${+(background_image ?? 0) + 1}.png')`,
            maxHeight: '80vh', // 박스 내 최대 높이 설정
            paddingTop: background_image && +background_image % 2 === 1 ? '1rem' : '8rem',
            backgroundRepeat:
              background_image && +background_image % 2 === 1 ? 'no-repeat' : 'repeat-y',
            backgroundAttachment: 'scroll',
          }}
        >
          <div className="p-1">
            {contents && contents.map((content, index) => renderContent(content, index))}
          </div>
        </div>
      </div>

      <button className="mt-4 w-10/12 rounded-md bg-gray-900 text-base text-white border-[1px] p-2">
        <Link href="/invitation">목록으로 돌아가기</Link>
      </button>
    </div>
  )
}

export default PreviewPage

const renderContent = (content: any, index: number) => {
  console.log('content', content)
  switch (content.type) {
    case 'image':
      return (
        <ImageComponent
          key={index}
          type="image"
          layout={content.layout}
          ratio={content.ratio}
          urls={content.urls || content.image_url}
        />
      )
    case 'video':
      return <VideoComponent key={index} type="video" ratio={content.ratio} urls={content.urls} />
    case 'text':
      return (
        <TextComponent
          key={index}
          type="text"
          font_size={content.font_size}
          font_type={content.font_type}
          layout={content.layout}
          text={content.text}
        />
      )
    case 'interval':
      return <IntervalComponent key={index} type="interval" size={content.size} />
    case 'map':
      return (
        <MapComponent
          key={index}
          type="map"
          main_address={content.main_address}
          detail_address={content.detail_address}
          post_number={content.post_number}
        />
      )
    default:
      return null
  }
}
