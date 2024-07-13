import { supabase } from '@/supabase/browser'
import { Database } from '@/supabase/type'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSwagger } from 'next-swagger-doc'
import { NextResponse } from 'next/server'

type Data = {
  id?: string
  error?: string
}

// NextApiRequest를 확장하여 query에 Invitation 스키마 포함
type Invitation = Database['public']['Tables']['invitation']['Row']

// NextApiRequest를 확장하여 query에 Invitation 스키마 포함
interface NextApiRequestInvitation extends NextApiRequest {
  query: {
    [P in keyof Invitation]?: string | string[]
  }
  searchParams: URLSearchParams
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

export const POST = async (
  req: NextApiRequestInvitation,
  res: NextApiResponse<Data>,
) => {
  console.log(req, 'req.query', req.query)
  console.log(req?.url, 'searchParamsToObject(req.searchParams)')

  const searchParams = new URL(req.url!, `http://${req.headers.host}`)
    .searchParams

  console.log(searchParamsToObject(searchParams), 'hmmmmm')
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
  } = query! || {}

  const { data, error } = await supabase.from('invitation').insert([
    {
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
    } as any,
  ])
  console.log(data, 'dataaaa', error, res)
  return NextResponse.json({}, { status: 200 })
  return { status: 200, message: 'success' }
  if (error) {
    return res.status(500)
  }

  res.status(200).json({ id: 'data[0].id' })
}

export const PUT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.query, 'req.query')

  const {
    id,
    title,
    description,
    subtitle,
    custom_url,
    date,
    post_number,
    address,
    isVertical,
  } = req.query

  const { data, error } = await supabase
    .from('invitation')
    .update({
      title,
      description,
      subtitle,
      custom_url,
      date,
      post_number,
      address,
      is_vertical: isVertical,
    } as any)
    .eq('id', id as string)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data[0])
}
