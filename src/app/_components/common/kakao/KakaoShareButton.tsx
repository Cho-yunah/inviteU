'use client'

import { formatDateTime } from '@/lib/utils'
import { CiShare2 } from 'react-icons/ci'

interface KakaoShareButtonProps {
  invitationUrl: string
  title: string
  date: string
  time: string
  imageUrl: string
  buttonStyle?: 'text' | 'icon' // 버튼 타입을 정의
  buttonId: string // 고유한 버튼 ID
}

export default function KakaoShareButton({
  invitationUrl,
  title,
  date,
  time,
  imageUrl,
  buttonStyle,
  buttonId,
}: KakaoShareButtonProps) {
  const formattedDateTime = formatDateTime(date, time)

  const handleShare = (e: React.MouseEvent) => {
    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.')
      return
    }

    e.stopPropagation() // 이벤트 전파 차단

    window.Kakao.Share.createDefaultButton({
      container: `#${buttonId}`,
      objectType: 'feed',
      content: {
        title,
        description: `${formattedDateTime} `,
        imageUrl,
        link: {
          mobileWebUrl: invitationUrl,
          webUrl: invitationUrl,
        },
      },
      buttons: [
        {
          title: '이 초대장을 확인해보세요!',
          link: {
            mobileWebUrl: invitationUrl,
            webUrl: invitationUrl,
          },
        },
      ],
    })
  }

  return (
    <div className="flex justify-center">
      {buttonStyle === 'text' ? (
        <button
          id={buttonId}
          onClick={handleShare}
          className="mt-6 bg-amber-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md"
        >
          카카오톡으로 공유하기
        </button>
      ) : (
        <button
          id={buttonId}
          onClick={handleShare}
          className="p-2 bg-stone-300 hover:bg-stone-400 text-white rounded-full shadow-md transition-all duration-300"
        >
          <CiShare2 size={16} />
        </button>
      )}
    </div>
  )
}
