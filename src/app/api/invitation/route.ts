import { supabase } from '@/supabase/browser'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSwagger } from 'next-swagger-doc'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID, UUID } from 'crypto'
import { judgeImageAndVideoValid, searchParamsToObject } from '@/lib/helper'

type Data = {
  id?: string
  error?: string
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
 *         name: is_vertical
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: video_url
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: ratio
 *         required: false
 *         schema:
 *           type: number
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
 *         name: is_vertical
 *         required: false
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: video_url
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: ratio
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: image_urls
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 초대장이 업데이트되었습니다.
 *       500:
 *         description: 초대장 업데이트 도중 에러가 발생했습니다.
 */

/**
 * @swagger
 * /api/invitation:
 *   delete:
 *     summary: Delete an invitation
 *     description: Delete an invitation with the given details
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

/**
 * @swagger
 * /api/invitation:
 *   get:
 *     summary: Retrieve all invitations
 *     description: Retrieve all invitations with pagination
 *     tags:
 *       - Invitation
 *     parameters:
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: user_id
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: invitation_id
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 조회되었습니다.
 *       500:
 *         description: 조회 도중 에러가 발생했습니다.
 */
export const POST = async (req: NextRequest, res: NextApiResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams

  // next.js14의 query는 query 객체가 아닌 searchParams에 있습니다.
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
    video_url,
    ratio,
    user_id,
    image_urls,
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
      { message: '필수 항목이 없습니다.' },
      { status: 400 },
    )
  }

  const { isVideoUrlValid, isImageUrlsValid } = judgeImageAndVideoValid({
    image_urls,
    video_url,
  })
  if (!isImageUrlsValid) {
    return NextResponse.json(
      {
        message:
          '적절한 이미지 url이 아닙니다. 공백없이 쉼표로 나누어서 문자열로 보내주세요.',
      },
      { status: 400 },
    )
  }
  if (!isVideoUrlValid) {
    return NextResponse.json(
      {
        message: '적절한 비디오 url이 아닙니다.',
      },
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
      video_url: video_url?.toString(),
      ratio: Number(ratio),
      id: uuid,
      image_urls: image_urls?.toString(),
      user_id: user_id?.toString(),
    },
  ])

  if (error || !data) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json(
    { id: uuid, message: 'Successfully added' },
    { status: 200 },
  )
}

export const PUT = async (req: NextRequest, res: NextResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams
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
    ratio,
    video_url,
    id,
    image_urls,
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
      ratio: Number(ratio),
      video_url: video_url?.toString(),
      id: id?.toString(),
      image_urls: image_urls?.toString(),
    })
    .eq('id', id as string)

  if (error) {
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json(
    { id, message: 'Successfully added' },
    { status: 200 },
  )
}

export const GET = async (req: NextRequest, res: NextApiResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParamsToObject(searchParams)

  const { start, limit, user_id, invitation_id } = query!

  let queryBuilder = supabase.from('invitation').select('*')
  //Limit이 있을 경우 페이지네이션 로직을 추가, 기본 값은 10

  if (invitation_id) {
    queryBuilder = queryBuilder.eq('id', invitation_id)
  }
  queryBuilder = queryBuilder.range(
    Number(start || 0),
    Number(start || 0) + Number(limit || 10) - 1,
  )

  // userid가 있을 경우 해당 유저의 초대장 리스트를 조회
  if (user_id) {
    queryBuilder = queryBuilder.eq('user_id', user_id.toString())
  }

  const { data, error } = await queryBuilder

  if (error) {
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json(
    { invitations: data, message: 'Successfully retrieved invitations' },
    { status: 200 },
  )
}
