import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/supabase/browser'

import { getFileType, searchParamsToObject } from '@/lib/helper'
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3'
import client from '@/supabase/storage'

const BUCKET_NAME = process.env.STORAGE_BUCKET || ''
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_VIDEO_SIZE = 30 * 1024 * 1024 // 30MB

export const POST = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject<{ user_uuid: string }>(searchParams)

  const { user_uuid } = query! || {
    user_uuid: '',
  }

  // Check if invitation_id exists in invitation table

  // const { data: userData, error: userError } = await supabase
  //   .from('userinfo')
  //   .select('id')
  //   .eq('id', user_uuid)
  //   .single()

  // if (userError || !userData) {
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       error: 'Invitation ID not found',
  //     },
  //     { status: 400 },
  //   )
  // }

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

    const fileExtension = file.name.split('.').pop()
    const filePath = `${fileType}/${user_uuid || 'anonymous'}/${Date.now()}.${fileExtension}`

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
      return NextResponse.json({ publicUrl, message: 'Successfully added' }, { status: 200 })
    } else {
      return NextResponse.json({ publicUrl, message: 'Not found' }, { status: 400 })
    }
  } else {
    return NextResponse.json({
      success: false,
    })
  }
}
