import Lottie from 'lottie-react'

export function Loader() {
  return (
    <div className=" flex justify-center items-center m-5">
      <div className="size-10 border-4 border-t-[#faa2c1] rounded-full animate-spin"></div>
    </div>
  )
}

export const LottieLoder = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Lottie
        animationData={'/public/lottie/loading.json'}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
      <p className="mt-4 text-lg text-gray-700">로그인 처리 중...</p>
    </div>
  )
}
