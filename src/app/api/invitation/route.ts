import { supabase } from '@/supabase/browser'

import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID, UUID } from 'crypto'
import { judgeImageAndVideoValid, searchParamsToObject } from '@/lib/helper'
import { ContentDataType } from '@/lib/types'

type Data = {
  id?: string
  error?: string
}

type QueryDataType = {
  contents: string //ContentDataType[]
  background_image: string | null
  custom_url: string
  date: string | null
  id: string
  post_number: string | null
  primary_image: string | null
  title: string
  user_id: string | null
}

export const POST = async (req: NextRequest, res: NextApiResponse<Data>) => {
  // req의 body에서 값을 받아오도록 변경

  const jsonRequest = await req.json()
  //
  // next.js14에서는 body에서 데이터를 받아옵니다.
  const {
    background_image,
    // contents,
    custom_url,
    date,
    primary_image,
    title,
    user_id,
  } = jsonRequest || {}

  if (!title || !user_id) {
    return NextResponse.json({ message: '필수 항목이 없습니다.' }, { status: 400 })
  }

  const uuid = randomUUID()
  try {
    let refinedContents: {
      type: 'images' | 'videos' | 'text' | 'interval' | 'map'
      uuid: string
    }[] = []

    const contentPromises = JSON.parse(jsonRequest.contents).map(async (item: ContentDataType) => {
      console.log(1111)

      if (item.type === 'image') {
        const { isImageUrlsValid } = judgeImageAndVideoValid({
          image_urls: item.urls,
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

        const { data: imageData, error: imageError } = await supabase
          .from('images')
          .insert({
            image_url: item.urls,
            layout: item.layout,
            ratio: item.ratio,
          })
          .select('id')
          .single()

        console.log(imageData, 'hmmm????')
        if (imageError) {
          return NextResponse.json(
            {
              success: false,
              error: '이미지 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }

        if (imageData.id) {
          refinedContents.push({
            type: 'images',
            uuid: imageData.id,
          })
        }
        if (imageError) {
          return NextResponse.json(
            {
              success: false,
              error: '이미지 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }
      } else if (item.type === 'video') {
        const { isVideoUrlValid } = judgeImageAndVideoValid({
          video_url: item.urls,
        })
        if (!isVideoUrlValid) {
          return NextResponse.json(
            {
              message:
                '적절한 이미지 url이 아닙니다. 공백없이 쉼표로 나누어서 문자열로 보내주세요.',
            },
            { status: 400 },
          )
        }
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .insert({
            video_url: item.urls,
            ratio: item.ratio,
          })
          .select('id')
          .single()

        if (videoError) {
          return NextResponse.json(
            {
              success: false,
              error: '비디오 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }

        if (videoData.id) {
          refinedContents.push({
            type: 'videos',
            uuid: videoData.id,
          })
        }
      } else if (item.type === 'text') {
        const { data: textData, error: textError } = await supabase
          .from('text')
          .insert({
            text: item.text,
            font_size: item.font_size,
            font_type: item.font_type,
            layout: item.layout,
          })
          .select('id')
          .single()

        if (textError) {
          return NextResponse.json(
            {
              success: false,
              error: '텍스트 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }

        if (textData.id) {
          refinedContents.push({
            type: 'text',
            uuid: textData.id,
          })
        }
      } else if (item.type === 'interval') {
        const { data: intervalData, error: intervalError } = await supabase
          .from('interval')
          .insert({
            size: item.size,
          })
          .select('id')
          .single()

        if (intervalError) {
          return NextResponse.json(
            {
              success: false,
              error: '간격 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }

        if (intervalData.id) {
          refinedContents.push({
            type: 'interval',
            uuid: intervalData.id,
          })
        }
      } else if (item.type === 'map') {
        const { data: mapData, error: mapError } = await supabase
          .from('map')
          .insert({
            main_address: item.main_address,
            detail_address: item.detail_address,
            post_number: item.post_number,
          })
          .select('id')
          .single()

        if (mapError) {
          return NextResponse.json(
            {
              success: false,
              error: '지도 데이터 삽입 중 오류가 발생했습니다.',
            },
            { status: 500 },
          )
        }

        if (mapData.id) {
          refinedContents.push({
            type: 'map',
            uuid: mapData.id,
          })
        }
      }
      return refinedContents
    })

    // Promise.all을 사용하여 모든 콘텐츠 처리가 완료될 때까지 기다립니다.
    refinedContents = (await Promise.all(contentPromises)).filter(Boolean)

    console.log(2222, refinedContents)

    // invitation 테이블에 데이터 삽입
    const { data, error } = await supabase
      .from('invitation')
      .insert([
        {
          background_image,
          contents: refinedContents,
          custom_url,
          date,
          id: uuid,
          primary_image,
          title,
          user_id,
        },
      ])
      .select('id')
      .single()

    console.log(333, data, error)

    if (error || !data) {
      return NextResponse.json(error, { status: 500 })
    }
    return NextResponse.json({ id: uuid, message: 'Successfully added' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: '초대장 생성 중 오류가 발생했습니다.', error: error },
      { status: 500 },
    )
  }
}

export const PUT = async (req: NextRequest, res: NextResponse<Data>) => {
  // req의 body에서 값을 받아오도록 변경
  const jsonRequest = await req.json()

  // next.js14에서는 body에서 데이터를 받아옵니다.
  const { background_image, contents, custom_url, date, primary_image, title, user_id, id } =
    jsonRequest || {}

  if (!id || !user_id) {
    return NextResponse.json({ message: 'id field is missing' }, { status: 400 })
  }

  const uuid = randomUUID()

  let refinedContents: {
    type: 'images' | 'videos' | 'text' | 'interval' | 'map'
    uuid: string
  }[] = []
  const contentPromises = JSON.parse(jsonRequest.contents).map(async (item: any) => {
    if (item.type === 'image') {
      const { isImageUrlsValid } = judgeImageAndVideoValid({
        image_urls: item.urls,
      })
      if (!isImageUrlsValid) {
        return NextResponse.json(
          {
            message: '적절한 이미지 url이 아닙니다. 공백없이 쉼표로 나누어서 문자열로 보내주세요.',
          },
          { status: 400 },
        )
      }

      const { data: imageData, error: imageError } = await supabase
        .from('images')
        .insert({
          image_url: item.urls,
          layout: item.layout,
          ratio: item.ratio,
        })
        .select('id')
        .single()

      if (imageError) {
        return NextResponse.json(
          {
            success: false,
            error: '이미지 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }

      if (imageData.id) {
        refinedContents.push({
          type: 'images',
          uuid: imageData.id,
        })
      }
      if (imageError) {
        return NextResponse.json(
          {
            success: false,
            error: '이미지 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }
    } else if (item.type === 'video') {
      const { isVideoUrlValid } = judgeImageAndVideoValid({
        video_url: item.urls,
      })
      if (!isVideoUrlValid) {
        return NextResponse.json(
          {
            message: '적절한 이미지 url이 아닙니다. 공백없이 쉼표로 나누어서 문자열로 보내주세요.',
          },
          { status: 400 },
        )
      }
      const { data: videoData, error: videoError } = await supabase
        .from('videos')
        .insert({
          video_url: item.urls,
          ratio: item.ratio,
        })
        .select('id')
        .single()

      if (videoError) {
        return NextResponse.json(
          {
            success: false,
            error: '비디오 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }

      if (videoData.id) {
        refinedContents.push({
          type: 'videos',
          uuid: videoData.id,
        })
      }
    } else if (item.type === 'text') {
      const { data: textData, error: textError } = await supabase
        .from('text')
        .insert({
          text: item.text,
          font_size: item.font_size,
          font_type: item.font_type,
          layout: item.layout,
        })
        .select('id')
        .single()

      if (textError) {
        return NextResponse.json(
          {
            success: false,
            error: '텍스트 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }

      if (textData.id) {
        refinedContents.push({
          type: 'text',
          uuid: textData.id,
        })
      }
    } else if (item.type === 'interval') {
      const { data: intervalData, error: intervalError } = await supabase
        .from('interval')
        .insert({
          invitation_id: uuid,
          size: item.size,
        })
        .select('id')
        .single()

      if (intervalError) {
        return NextResponse.json(
          {
            success: false,
            error: '간격 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }

      if (intervalData.id) {
        refinedContents.push({
          type: 'interval',
          uuid: intervalData.id,
        })
      }
    } else if (item.type === 'map') {
      const { data: mapData, error: mapError } = await supabase
        .from('map')
        .insert({
          main_address: item.main_address,
          detail_address: item.detail_address,
          post_number: item.post_number,
        })
        .select('id')
        .single()

      if (mapError) {
        return NextResponse.json(
          {
            success: false,
            error: '지도 데이터 삽입 중 오류가 발생했습니다.',
          },
          { status: 500 },
        )
      }

      if (mapData.id) {
        refinedContents.push({
          type: 'map',
          uuid: mapData.id,
        })
      }
    }
  })
  refinedContents = (await Promise.all(contentPromises)).filter(Boolean)

  const { data, error } = await supabase
    .from('invitation')
    .update({
      ...jsonRequest,

      background_image: background_image ?? jsonRequest.background_image,
      contents: refinedContents ?? jsonRequest.contents,
      custom_url: custom_url ?? jsonRequest.custom_url,
      date: date ?? jsonRequest.date,
      id: uuid,
      primary_image: primary_image ?? jsonRequest.primary_image,
      title: title ?? jsonRequest.title,
      user_id: user_id ?? jsonRequest.user_id,
    })
    .eq('id', id as string)

  if (error || !data) {
    return NextResponse.json(error, { status: 500 })
  }
  return NextResponse.json({ id: uuid, message: 'Successfully added' }, { status: 200 })
}

export const GET = async (req: NextRequest, res: NextApiResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParamsToObject<{
    start: number
    limit: number
    user_id: string
    invitation_id: string
  }>(searchParams)

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

  const { data, error } = await queryBuilder.single()

  let contents = []
  if (data && data?.contents && JSON.parse(data?.contents as string).length > 0) {
    contents = await Promise.all(
      JSON.parse(data?.contents as string)?.map(async (content: any) => {
        let contentData
        switch (content.type) {
          case 'images':
            const { data: imageData } = await supabase
              .from('images')
              .select('*')
              .eq('id', content.uuid)
              .single()
            contentData = imageData
            break
          case 'videos':
            const { data: videoData } = await supabase
              .from('videos')
              .select('*')
              .eq('id', content.uuid)
              .single()
            contentData = videoData
            break
          case 'text':
            const { data: textData } = await supabase
              .from('text')
              .select('*')
              .eq('id', content.uuid)
              .single()
            contentData = textData
            break
          case 'interval':
            const { data: intervalData } = await supabase
              .from('interval')
              .select('*')
              .eq('id', content.uuid)
              .single()
            contentData = intervalData
            break
          case 'map':
            const { data: mapData } = await supabase
              .from('map')
              .select('*')
              .eq('id', content.uuid)
              .single()
            contentData = mapData
            break
        }
        return contentData
      }),
    )
  }

  if (error) {
    return NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json(
    {
      invitations: { ...data, contents },
      message: 'Successfully retrieved invitations',
    },
    { status: 200 },
  )
}

export const DELETE = async (req: NextRequest, res: NextResponse<Data>) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParamsToObject<QueryDataType>(searchParams)
  const { id, user_id } = query!

  if (!id || !user_id) {
    return NextResponse.json({ message: 'id와 user_id 필드가 누락되었습니다' }, { status: 400 })
  }

  // invitation 테이블에서 데이터 삭제
  const { error } = await supabase.from('invitation').delete().eq('id', id).eq('user_id', user_id)

  if (error) {
    return NextResponse.json(
      { message: '초대장 삭제 중 오류가 발생했습니다', error },
      { status: 500 },
    )
  }

  return NextResponse.json({ message: '초대장이 성공적으로 삭제되었습니다' }, { status: 200 })
}
