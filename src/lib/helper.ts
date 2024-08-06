/**
 * @description URLSearchParams를 일반 객체로 변환
 */
export const searchParamsToObject = (
  searchParams: URLSearchParams,
): {
  [key: string]: string | boolean
} => {
  const obj: { [key: string]: string | boolean } = {}
  searchParams.forEach((value, key) => {
    // true/false 문자열을 실제 boolean 값으로 변환
    if (value === 'true') {
      obj[key] = true
    } else if (value === 'false') {
      obj[key] = false
    } else {
      obj[key] = value
    }
  })
  return obj
}

const imageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/tiff',
  'image/svg+xml',
]

const videoMimeTypes = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
  'video/x-flv',
]

export function getFileType(fileType: string): 'image' | 'video' | undefined {
  if (imageMimeTypes.includes(fileType)) {
    return 'image'
  }
  if (videoMimeTypes.includes(fileType)) {
    return 'video'
  }
  return
}
