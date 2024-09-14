import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/supabase/browser'

import { getFileType, searchParamsToObject } from '@/lib/helper'
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3'
import client from '@/supabase/storage'

const BUCKET_NAME = process.env.STORAGE_BUCKET || ''
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_VIDEO_SIZE = 30 * 1024 * 1024 // 30MB

/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to Supabase storage and return its public URL.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: query
 *         name: user_uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user UUID.
 *       - in: formData
 *         name: file
 *         schema:
 *           type: string
 *           format: binary
 *         required: true
 *         description: The file to upload.
 *     responses:
 *       201:
 *         description: Successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publicUrl:
 *                   type: string
 *                   description: The public URL of the uploaded file.
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status.
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status.
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject<{ user_uuid: string }>(searchParams)

  const { user_uuid } = query! || {
    user_uuid: '',
  }

  // Check if invitation_id exists in invitation table
  // 사용자가 인증되었는지 확인
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    return NextResponse.json(
      {
        success: false,
        error: '인증되지 않은 사용자입니다.',
      },
      { status: 401 },
    )
  }

  // 인증된 사용자의 UUID와 요청의 user_uuid가 일치하는지 확인
  if (authData.user.id !== user_uuid) {
    return NextResponse.json(
      {
        success: false,
        error: '사용자 인증 정보가 일치하지 않습니다.',
      },
      { status: 403 },
    )
  }

  const formData = await req.formData()

  const file = formData.get('file') as File

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileType = getFileType(file.type)
    const fileSize = file.size
    if (!fileType)
      return NextResponse.json(
        {
          success: false,
          error: `지원되지 않는 파일 타입입니다.`,
        },
        { status: 400 },
      )
    if (
      (fileType === 'image' && fileSize > MAX_IMAGE_SIZE) ||
      (fileType === 'video' && fileSize > MAX_VIDEO_SIZE)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `파일 사이즈가 초과되었습니다. ${fileType} 의 최대 사이즈는 ${
            fileType === 'image' ? '5MB' : '30MB'
          }. 입니다`,
        },
        { status: 400 },
      )
    }

    const filePath = `${fileType}/${user_uuid}/${Date.now()}`

    const uploadParams = {
      Bucket: BUCKET_NAME, // Supabase Storage에서 사용 중인 버킷 이름
      Key: filePath, // 파일 경로 및 이름 설정
      Body: buffer,
      ACL: ObjectCannedACL.public_read, // 필요에 따라 액세스 제어 설정
    }

    const command = new PutObjectCommand(uploadParams)
    await client.send(command)

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

    // Insert record into image table

    if (publicUrl) {
      return NextResponse.json(
        { publicUrl, message: 'Successfully added' },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { publicUrl, message: 'Not found' },
        { status: 400 },
      )
    }
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
