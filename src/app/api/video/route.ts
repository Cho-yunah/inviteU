import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/supabase/browser'

import { searchParamsToObject } from '@/lib/helper'
import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import client from '@/supabase/storage'
import { randomUUID } from 'crypto'

/**
 * @swagger
 * /api/video:
 *   post:
 *     summary: Upload a video
 *     description: Upload a video to Supabase storage with a 10-year expiration.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: query
 *         name: invitation_id
 *         type: string
 *         required: true
 *         description: The invitation ID.
 *       - in: query
 *         name: user_uuid
 *         type: string
 *         required: false
 *         description: The user UUID.
 *       - in: formData
 *         name: file
 *         schema:
 *           type: file
 *           format: binary
 *         required: true
 *         description: The video file to upload.
 *     responses:
 *       200:
 *         description: Successfully uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject(searchParams)

  const { invitation_id, user_uuid } = query! || {
    invitation_id: '',
    user_uuid: '',
  }

  // Check if invitation_id exists in invitation table
  const { data: invitationData, error: invitationError } = await supabase
    .from('invitation')
    .select('id')
    .eq('id', invitation_id)
    .single()

  if (invitationError || !invitationData) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invitation ID not found',
      },
      { status: 400 },
    )
  }

  const formData = await req.formData()
  // const file = (body.file as Blob) || null;
  // const body = Object.fromEntries(formData)
  // const file = (body.file as Blob) || null
  const file = formData.get('file') as File

  console.log(file, 'filee')
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `image/${invitation_id}/${Date.now()}_${file.name}`

    const uploadParams = {
      Bucket: 'inviteU', // Supabase Storage에서 사용 중인 버킷 이름
      Key: filePath, // 파일 경로 및 이름 설정
      Body: buffer,
      ACL: ObjectCannedACL.public_read, // 필요에 따라 액세스 제어 설정
    }

    const command = new PutObjectCommand(uploadParams)
    const data = await client.send(command)

    console.log(data, 'dataa')
    // const { data, error } = await supabase.storage
    //   .from('uploads')
    //   .upload(filePath, file, { upsert: false, cacheControl: '315360000' })

    const {
      data: { publicUrl },
    } = supabase.storage.from('inviteU').getPublicUrl(filePath)

    console.log(publicUrl, ' publicUrl ')
    // Insert record into image table
    const { data: imageData, error: imageError } = await supabase
      .from('image')
      .insert([
        {
          invitation_id: invitation_id as string,
          image_url: publicUrl,
          id: randomUUID(),
        },
      ])
    if (imageError) {
      console.error(imageError, 'errorImage')

      return NextResponse.json(
        {
          success: false,
          error: imageError.message,
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      { url: publicUrl, message: 'Successfully added' },
      { status: 200 },
    )
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
