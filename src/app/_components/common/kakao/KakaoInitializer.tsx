'use client'
import { useEffect } from 'react'

function KakaoInitializer() {
  useEffect(() => {
    // Kakao SDK가 이미 초기화되었는지 확인
    if (typeof window !== 'undefined' && !window.Kakao?.isInitialized()) {
      const script = document.createElement('script')
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'
      script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4'
      script.crossOrigin = 'anonymous'
      script.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
        console.log('Kakao SDK initialized')
      }
      document.body.appendChild(script)
    }
  }, [])

  return null // 화면에 아무것도 렌더링하지 않음
}

export default KakaoInitializer
