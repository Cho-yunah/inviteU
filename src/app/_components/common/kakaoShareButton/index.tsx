'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
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

function formatDateTime(dateString: any, timeString: any) {
  let [year, month, day] = dateString.split('-')
  day = day.split('T')[0]
  const [hour, minute] = timeString.split(':')

  // 병합된 Date 객체 생성
  const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))

  // 일정과 시간 문자열로 포맷팅
  const formattedDate = format(date, 'yyyy년 M월 d일', { locale: ko })
  const formattedTime = format(date, 'a h시 mm분', { locale: ko })

  return `💛 일정 : ${formattedDate}\n💛 시간 : ${formattedTime}`
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
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false)

  const formattedDateTime = formatDateTime(date, time)

  // Kakao SDK 로드 및 초기화
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
      }
      setIsKakaoLoaded(true)
    }
    script.onerror = () => console.error('Kakao SDK 로드 실패')
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 전파 차단

    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.')
      return
    }

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

  if (!isKakaoLoaded) return <p>Loading..</p>

  return (
    <div className="flex justify-center">
      {buttonStyle === 'text' ? (
        <button
          id={buttonId}
          onClick={handleShare}
          className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md"
        >
          카카오톡으로 공유하기
        </button>
      ) : (
        <button
          id={buttonId}
          onClick={handleShare}
          className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md transition-all duration-300"
        >
          <CiShare2 size={16} />
        </button>
      )}
    </div>
  )
}
