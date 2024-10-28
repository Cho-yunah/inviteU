import {
  ImageComponent,
  IntervalComponent,
  MapComponent,
  TextComponent,
  VideoComponent,
} from '@/app/_components/edit/previewModal/RenderContents'
import { ContentDataType } from '@/lib/types'
import KakaoShareButton from '@/app/_components/common/kakaoShareButton'
import { formatDateTime } from '@/lib/utils'

type InvitationData = {
  title: string
  primary_image: string
  custom_url: string
  date: string
  time: string
  main_address: string
  background_image: string
  contents: ContentDataType[]
}

async function getInvitationData(customUrl: string): Promise<InvitationData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/invitation?custom_url=${customUrl}`,
    { cache: 'no-store' }, // SSR용으로 실시간 데이터를 불러옴
  )

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

  const background = invitationData ? Number(invitationData.background_image) : 0
  const formattedDateTime = invitationData
    ? formatDateTime(invitationData.date, invitationData.time)
    : ''

  const renderContent = (content: ContentDataType, index: number) => {
    switch (content.type) {
      case 'image':
        return (
          <ImageComponent
            key={index}
            type="image"
            layout={content.layout}
            ratio={content.ratio}
            urls={content.image_url}
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
    <div className="relative min-h-full bg-gray-50 flex items-center justify-center">
      {/* 페이지 중앙 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 pt-1"
        style={{
          backgroundImage: `url('/img/background_${+(background ?? 0) + 1}.png')`,
        }}
      />

      {/* 중앙 콘텐츠 */}
      <div className="relative z-10 w-8/12 max-w-xl rounded-xl p-1 overflow-y-auto max-h-[53vh] scrollbar-hide smooth-scroll">
        {/* 제목 */}
        <h1 className="text-4xl font-semibold text-center mb-4 font-batang">
          {invitationData.title}
        </h1>

        {/* 메인 이미지 */}
        <img
          src={invitationData.primary_image}
          alt="초대장 메인 이미지"
          className="w-full h-auto rounded-xl shadow-lg mb-6"
        />
        <p className="text-center text-base mb-4 font-batang font-semibold whitespace-pre">
          {formattedDateTime}
        </p>

        {/* 주소 */}
        <p className="text-sm text-center mb-6">{invitationData.main_address}</p>

        {/* 콘텐츠 컴포넌트 렌더링 */}
        <div className="space-y-6">
          {invitationData.contents.map((content, index) => renderContent(content, index))}
        </div>

        <KakaoShareButton
          title={invitationData.title}
          imageUrl={invitationData.primary_image}
          date={invitationData.date}
          time={invitationData.time}
          invitationUrl={`${process.env.NEXT_PUBLIC_API_URL}/${params.custom_url}`}
        />
        {/* 카카오톡 공유 버튼 */}
      </div>
    </div>
  )
}
