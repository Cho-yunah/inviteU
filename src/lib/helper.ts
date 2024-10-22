/**
 * @description URLSearchParams를 일반 객체로 변환
 */
export const searchParamsToObject = <T>(searchParams: URLSearchParams) => {
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
  return obj as T
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

function isValidUrl(url: string) {
  // Check if the URL format is valid
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i', // fragment locator
  )

  return urlPattern.test(url)
}

export function judgeImageAndVideoValid({
  urls,
  video_url,
}: {
  urls?: string | boolean // input type
  video_url?: string | boolean
}) {
  const isImageUrlsValid = urls
    ?.toString()
    ?.split(',')
    ?.every((url) => isValidUrl(url))
  const isVideoUrlValid = isValidUrl(video_url?.toString() || '')
  return { isImageUrlsValid, isVideoUrlValid }
}
