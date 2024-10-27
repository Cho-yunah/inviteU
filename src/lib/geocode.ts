// lib/geocode.ts
export async function getCoordinates(address: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/geocode?query=${address}`)

  const data = await res.json()

  if (data.addresses.length > 0) {
    const { y, x } = data.addresses[0] // 위도, 경도
    return { lat: parseFloat(y), lng: parseFloat(x) }
  } else {
    throw new Error('해당 주소를 찾을 수 없습니다.')
  }
}
