import { supabase } from '@/supabase/browser'
import { Database } from '@/supabase/type'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSwagger } from 'next-swagger-doc'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID, UUID } from 'crypto'

type Data = {
  id?: string
  error?: string
}

/**
 * URLSearchParams를 일반 객체로 변환
 */
function searchParamsToObject(searchParams: URLSearchParams): {
  [key: string]: string | boolean
} {
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
/**
 * @swagger
 * /api/invitation:
 *   post:
 *     summary: Create a new invitation
 *     description: Create a new invitation with the given details
 *     tags:
 *       - Invitation
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: subtitle
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: custom_url
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: post_number
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: isVertical
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isImage
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isMap
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isVideo
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: videoUrl
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: videoUrl
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 초대장이 성공적으로 생성되었습니다.
 *       500:
 *         description: 초대장 생성 중 에러가 발생했습니다.
 *   put:
 *     summary: Update an invitation
 *     description: Update an invitation with the given details
 *     tags:
 *       - Invitation
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: subtitle
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: custom_url
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: post_number
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: address
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: isVertical
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: video_url
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 초대장이 업데이트되었습니다.
 *       500:
 *         description: 초대장 업데이트 도중 에러가 발생했습니다.
 *   delete:
 *     summary: Update an invitation
 *     description: Update an invitation with the given details
 *     tags:
 *       - Invitation
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 삭제되었습니다.
 *       500:
 *         description: 삭제 도중 에러가 발생했습니다.
 */

export const POST = async (req: NextRequest, res: NextApiResponse<Data>) => {
  console.log(req?.url, 'searchParamsToObject(req.searchParams)')

  const searchParams = req.nextUrl.searchParams

  // const searchParams = new URL(req.url!, `http://${''}`).searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject(searchParams)
  const {
    title,
    description,
    subtitle,
    custom_url,
    date,
    post_number,
    address,
    is_vertical,
    is_image,
    is_map,
    is_video,
    video_url,
    user_id,
  } = query! || {}

  if (
    !title ||
    !user_id ||
    !description ||
    !subtitle ||
    !custom_url ||
    !date ||
    !post_number ||
    !address
  ) {
    return NextResponse.json(
      { message: 'id field is missing' },
      { status: 400 },
    )
  }
  const uuid = randomUUID()
  const { data, error } = await supabase.from('invitation').insert([
    {
      title: title?.toString() || '',
      description: description?.toString(),
      subtitle: subtitle?.toString(),
      custom_url: custom_url?.toString(),
      date: date?.toString(),
      post_number: post_number?.toString(),
      address: address?.toString(),
      is_vertical: Boolean(is_vertical),
      is_image: Boolean(is_image),
      is_map: Boolean(is_map),
      is_video: Boolean(is_video),
      video_url: video_url?.toString(),
      id: uuid,
      user_id: user_id?.toString(),
    },
  ])

  console.log(data, 'dataaaa', error, res)
  if (error) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json(
    { id: uuid, message: 'Successfully added' },
    { status: 200 },
  )
}

export const PUT = async (req: NextRequest, res: NextResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams
  console.log(searchParams, 'searchParams')
  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject(searchParams)

  console.log(query, 'query')
  const {
    title,
    description,
    subtitle,
    custom_url,
    date,
    post_number,
    address,
    is_vertical,
    is_image,
    is_map,
    is_video,
    video_url,
    id,
  } = query! || {}

  if (!id) {
    return NextResponse.json(
      { message: 'id field is missing' },
      { status: 400 },
    )
  }
  const { data, error } = await supabase
    .from('invitation')
    .update({
      ...query,
      title: title?.toString() || '',
      description: description?.toString(),
      subtitle: subtitle?.toString(),
      custom_url: custom_url?.toString(),
      date: date?.toString(),
      post_number: post_number?.toString(),
      address: address?.toString(),
      is_vertical: Boolean(is_vertical),
      is_image: Boolean(is_image),
      is_map: Boolean(is_map),
      is_video: Boolean(is_video),
      video_url: video_url?.toString(),
      id: id?.toString(),
    })
    .eq('id', id as string)

  console.log(data, 'dataaaa', error, res)
  if (error) {
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json(
    { id, message: 'Successfully added' },
    { status: 200 },
  )
}
