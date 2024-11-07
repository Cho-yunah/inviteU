'use client'

import Link from 'next/link'
import { RootState } from '@/lib/store/store'
import { useSelector } from 'react-redux'
import {
  ImageComponent,
  IntervalComponent,
  MapComponent,
  TextComponent,
  VideoComponent,
} from '@/app/_components/edit/previewModal/RenderContents'
import { formatDateTime } from '@/lib/utils'
import KakaoShareButton from '@/app/_components/common/kakao/KakaoShareButton'

const PreviewPage = () => {
  const currentInvitation = useSelector((state: RootState) => state.invitation.selected)

  const { background_image, contents } = currentInvitation ?? {}
  const formattedDateTime = currentInvitation
    ? formatDateTime(currentInvitation.date, currentInvitation.time)
    : ''

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-1">
      {/* 박스 내부 스크롤 영역 */}
      <div className="relative min-h-[78vh] bg-gray-50 flex items-center justify-center">
        {/* 페이지 중앙 배경 */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 pt-1"
          style={{
            backgroundImage: `url('/img/background_${+(background_image ?? 0) + 1}.png')`,
          }}
        />

        {/* 중앙 콘텐츠 */}
        <div className="relative z-10 w-8/12 max-w-xl rounded-xl p-1 mt-4 max-h-[52vh] overflow-y-auto scrollbar-hide smooth-scroll">
          {/* 제목 */}
          <h2 className="text-[28px] font-semibold text-center mb-4 font-batang">
            {currentInvitation && currentInvitation.title}
          </h2>

          {/* 메인 이미지 */}
          <img
            src={currentInvitation?.primary_image ?? ''}
            alt="초대장 메인 이미지"
            className="w-full h-auto rounded-xl shadow-lg mb-6"
          />
          <p className="text-center text-base mb-4 font-batang font-semibold whitespace-pre">
            {formattedDateTime}
          </p>

          {/* 콘텐츠 컴포넌트 렌더링 */}
          <div className="space-y-6">
            {contents && contents.map((content, index) => renderContent(content, index))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="w-[146px] mt-6 bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          <Link href="/invitation">목록으로 돌아가기</Link>
        </button>
        {currentInvitation && (
          <KakaoShareButton
            buttonStyle="text"
            title={currentInvitation.title}
            imageUrl={currentInvitation.primary_image}
            date={currentInvitation.date}
            time={currentInvitation.time}
            invitationUrl={`${process.env.NEXT_PUBLIC_API_URL}/${currentInvitation.custom_url}`}
            buttonId={`kakao-share-btn-${currentInvitation.id}`} // 고유한 ID 전달
          />
        )}
      </div>
    </div>
  )
}

export default PreviewPage

const renderContent = (content: any, index: number) => {
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
