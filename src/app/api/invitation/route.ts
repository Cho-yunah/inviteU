import { supabase } from '@/supabase/browser'
import { Database } from '@/supabase/type'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSwagger } from 'next-swagger-doc'
import { NextResponse } from 'next/server'
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
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isImage
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isMap
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isVideo
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: videoUrl
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation created successfully
 *       500:
 *         description: Error creating invitation
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
 *         required: true
 *         schema:
 *           type: boolean
 *
 *     responses:
 *       200:
 *         description: Invitation updated successfully
 *       500:
 *         description: Error updating invitation
 */

export const POST = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req, 'req.query', req.query)
  console.log(req?.url, 'searchParamsToObject(req.searchParams)')

  const searchParams = new URL(req.url!, `http://${req.headers.host}`)
    .searchParams

  console.log(searchParamsToObject(searchParams), 'hmmmmm')
  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = req.query ?? searchParamsToObject(searchParams)
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
      id: randomUUID(),
      user_id: user_id?.toString(),
    },
  ])

  console.log(data, 'dataaaa', error, res)
  if (error) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json({}, { status: 200 })
}

export const PUT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const searchParams = new URL(req.url!, `http://${req.headers.host}`)
    .searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = req.query ?? searchParamsToObject(searchParams)

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
    user_id,
  } = query! || {}

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
      user_id: user_id?.toString(),
      id: randomUUID(),
    })
    .eq('id', id as string)

  console.log(data, 'dataaaa', error, res)
  if (error) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json({}, { status: 200 })
}
