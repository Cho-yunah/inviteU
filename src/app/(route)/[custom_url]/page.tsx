// app/(route)/[custom_url]/page.tsx

import {
  ImageComponent,
  IntervalComponent,
  MapComponent,
  TextComponent,
  VideoComponent,
} from '@/app/_components/edit/previewModal/RenderContents'
import { ContentDataType } from '@/lib/types'

type InvitationData = {
  title: string
  primary_image: string
  custom_url: string
  main_address: string
  background_image: string
  contents: ContentDataType[]
}

async function getInvitationData(customUrl: string): Promise<InvitationData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/invitation?custom_url=${customUrl}`,
    { cache: 'no-store' }, // SSR용으로 실시간 데이터를 불러옴
  )
  console.log(res)

  if (!res.ok) {
    return null
  }

  return res.json()
}

interface Props {
  params: { custom_url: string }
}

export default async function InvitationPage({ params }: any) {
  const invitationData = await getInvitationData(params.custom_url)
  console.log(invitationData)
  const background = invitationData ? Number(invitationData.background_image) : 0
  const contentsData = invitationData ? invitationData.contents : []

  const renderContent = (content: ContentDataType, index: number) => {
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

  if (!invitationData) {
    return <h1>초대장을 찾을 수 없습니다.</h1>
  }

  return (
    <div>
      <h1>{invitationData.title}</h1>
      <img src={invitationData.primary_image} alt="초대장 이미지" width={100} height={100} />
      <div
        style={{
          backgroundImage: `url('/img/background_${background}.png')`,
          paddingTop: background % 2 === 1 ? '8rem' : '0.5rem', // 홀수일 때 더 많은 마진
          backgroundRepeat: background % 2 === 1 ? 'no-repeat' : 'repeat-y',
          backgroundAttachment: 'scroll', // background가 스크롤과 함께 움직이도록 설정
        }}
        className={`bg-contain bg-white max-w-[330px] min-h-[560px] rounded-b-xl overflow-hidden`}
      >
        {/* 콘텐츠 렌더링 */}
        <div>
          {contentsData.length > 0 &&
            contentsData.map((content: ContentDataType, index: number) =>
              renderContent(content, index),
            )}
        </div>
      </div>
    </div>
  )
}
