import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/supabase/browser'

import { searchParamsToObject } from '@/lib/helper'
import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import client from '@/supabase/storage'
import { randomUUID } from 'crypto'

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
  const query = searchParamsToObject(searchParams)

  const { user_uuid } = query! || {
    user_uuid: '',
  }

  // Check if invitation_id exists in invitation table
  const { data: userData, error: userError } = await supabase
    .from('userinfo')
    .select('id')
    .eq('id', user_uuid)
    .single()
  console.log(userError, 'userError', 'userdata', userData)

  if (userError || !userData) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invitation ID not found',
      },
      { status: 400 },
    )
  }

  console.log(userData, 'userDataa')

  const formData = await req.formData()
  // const file = (body.file as Blob) || null;
  // const body = Object.fromEntries(formData)
  // const file = (body.file as Blob) || null
  const file = formData.get('file') as File

  console.log(file, 'filee')
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = `image/${user_uuid}/${Date.now()}`

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

    // Insert record into image table

    console.log(NextResponse.json({ hello: 'Next.js' }).body, 'hmm???')
    if (publicUrl) {
      return NextResponse.json(
        { publicUrl, message: 'Successfully added' },
        { status: 201 },
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
