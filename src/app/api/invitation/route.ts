import type { NextApiRequest, NextApiResponse } from 'next'
import getRawBody from 'raw-body'
import Cors from 'micro-cors'
import { supabase } from '@/supabase/server'

const cors = Cors()

type Data = {
  id?: string
  error?: string
}

async function parseJson(req: NextApiRequest): Promise<any> {
  const body = await getRawBody(req)
  return JSON.parse(body.toString('utf8'))
}

/**
 * @swagger
 * /api/invitation:
 *   post:
 *     summary: Create a new invitation
 *     description: Create a new invitation with the given details
 *     tags:
 *       - Invitation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               custom_url:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               post_number:
 *                 type: string
 *               address:
 *                 type: string
 *               isVertical:
 *                 type: boolean
 *               isImage:
 *                 type: boolean
 *               isMap:
 *                 type: boolean
 *               isVideo:
 *                 type: boolean
 *               videoUrl:
 *                 type: string
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
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the invitation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               custom_url:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               post_number:
 *                 type: string
 *               address:
 *                 type: string
 *               isVertical:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Invitation updated successfully
 *       500:
 *         description: Error updating invitation
 */

export const POST = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = await parseJson(req)
  console.log(body, 'bodymmm')

  const {
    title,
    description,
    subtitle,
    custom_url,
    date,
    post_number,
    address,
    isVertical,
    isImage,
    isMap,
    isVideo,
    videoUrl,
  } = body

  const { data, error } = await supabase.from('invitation').insert([
    {
      title,
      description,
      subtitle,
      custom_url,
      date,
      post_number,
      address,
      is_vertical: isVertical,
      is_image: isImage,
      is_map: isMap,
      is_video: isVideo,
      video_url: videoUrl,
    },
  ])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({ id: 'data[0].id ' })
}

export const PUT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = await parseJson(req)
  const { id } = req.query
  const {
    title,
    description,
    subtitle,
    custom_url,
    date,
    post_number,
    address,
    isVertical,
  } = body

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
    })
    .eq('id', id as string)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({})
}
