import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { supabase } from '@/supabase/server'
import { searchParamsToObject } from '@/lib/helper'

/**
 * @swagger
 * /api/uploadVideo:
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
 *           type: string
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

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/uploads')
export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams

  // swagger 의 query는 query 객체가 아닌 req의 query에 있음.
  const query = searchParamsToObject(searchParams)

  const { invitation_id, user_uuid } = query! || {}
  const filePath = `videos/${invitation_id}/${Date.now()}_${'test'}`
  const formData = await req.formData()
  const body = Object.fromEntries(formData)
  const file = (body.file as Blob) || null

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR)
    }

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, file, { upsert: false, cacheControl: '315360000' })

    if (error) {
      return NextResponse.json(error, { status: 500 })
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from('uploads').getPublicUrl(filePath)

    return NextResponse.json(
      { url: publicUrl, message: 'Successfully added' },
      { status: 200 },
    )
    // res.status(200).json({ url: publicURL });
    //   fs.writeFileSync(path.resolve(UPLOAD_DIR, (body.file as File).name), buffer)
  } else {
    return NextResponse.json({
      success: false,
    })
  }

  // return NextResponse.json({
  //   success: true,
  //   name: (body.file as File).name,
  // })
}
