'use client'

import Link from 'next/link'
import styles from '@/app/_components/edit/previewModal/previewModal.module.scss'
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
    <div className="w-[375px] h-full flex flex-col justify-center align-center items-center  p-3">
      <div style={{ maxHeight: '80vh' }} className="border-[1px] rounded-xl shadow-md">
        <div
          style={{
            backgroundImage: `url('/img/background_${+(background_image ?? 0) + 1}.png')`,
            paddingTop: background_image && +background_image % 2 == 1 ? '1rem' : '8rem', // 홀수일 때 더 많은 마진
            backgroundRepeat:
              background_image && +background_image % 2 === 1 ? 'no-repeat' : 'repeat-y',
            backgroundAttachment: 'scroll', // background가 스크롤과 함께 움직이도록 설정
          }}
          className={`bg-cover min-w-[300px] min-h-[500px] rounded-xl overflow-hidden`}
        >
          <div className={styles.scroll}>
            {contents &&
              contents.map((content, index) => {
                return renderContent(content, index)
              })}
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
          urls={content.urls}
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
