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
  console.log(background)

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
          // backgroundImage: `url('/img/background_12.png')`,
        }}
      />

      {/* 중앙 콘텐츠 */}
      <div className="relative z-10 w-7/12 max-w-xl bg-opacity-100 rounded-xl mt-1 p-2 overflow-y-auto max-h-[52vh] scrollbar-hide smooth-scroll">
        {/* 제목 */}
        <h1 className="text-4xl font-semibold text-center mb-4">{invitationData.title}</h1>

        {/* 메인 이미지 */}
        <img
          src={invitationData.primary_image}
          alt="초대장 메인 이미지"
          className="w-full h-auto rounded-xl border-2 border-opacity-40 border-gray-300 shadow-lg mb-6"
        />

        {/* 주소 */}
        <p className="text-lg text-center mb-6">{invitationData.main_address}</p>

        {/* 콘텐츠 컴포넌트 렌더링 */}
        <div className="space-y-6">
          {invitationData.contents.map((content, index) => renderContent(content, index))}
        </div>

        {/* 카카오톡 공유 버튼 */}
        {/* <KakaoShareButton invitationUrl={`https://invite-u.vercel.app/${params.custom_url}`} /> */}
      </div>
    </div>
  )
}

// <button
//   // onClick={() => {
//   //   window.Kakao.Link.sendDefault({
//   //     objectType: 'feed',
//   //     content: {
//   //       title: invitationData.title,
//   //       imageUrl: invitationData.primary_image,
//   //       link: {
//   //         webUrl: `https://invite-u.vercel.app/${params.custom_url}`,
//   //       },
//   //     },
//   //     buttons: [
//   //       {
//   //         title: '초대장 보기',
//   //         link: {
//   //           mobileWebUrl: `https://invite-u.vercel.app/${params.custom_url}`,
//   //           webUrl: `https://invite-u.vercel.app/${params.custom_url}`,
//   //         },
//   //       },
//   //     ],
//   //   })
//   // }}
//   className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
// >
//   카카오톡으로 공유하기
// </button>
