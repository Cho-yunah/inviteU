'use client'

import { exampleContents } from '@/lib/types'
import axios from 'axios'
import { MouseEvent, useState } from 'react'

const FormPage = () => {
  //image
  const [formData, setFormData] = useState<FormData>()
  const [userUuid, setUseruuid] = useState('')
  const [title, setTitle] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [date, setDate] = useState('2024-09-14T15:12:42.471Z')
  const [userId, setUserId] = useState('')
  const [postNumber, setPostNumber] = useState('')
  const [primaryImage, setPrimaryImage] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [contents, setContents] = useState(exampleContents)

  const onSubmitFile = async () => {
    if (!!formData && !!userUuid) {
      const response = await fetch(`/api/files?user_uuid=${userUuid}`, {
        method: 'POST',
        body: formData,
      })
      alert(`response: ${response.status}`)
      console.log(await response.json(), 'onSubmitImage_response')
    }
  }

  async function onSubmitInvitation(e: any) {
    e.preventDefault() // 폼 기본 동작 방지

    const data = {
      title,
      custom_url: customUrl,
      date: date,
      user_id: userId,
      post_number: Number(postNumber),
      primary_image: primaryImage,
      background_image: backgroundImage,
      contents: JSON.stringify(contents),
    }
    // console.log(data, 'data')
    // try {
    //   const response = await axios.post('/api/invitation', data)
    //   alert(`응답: ${response.status}`)
    //   console.log(response.data, '초대장 생성 응답')
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     alert(`오류 발생: ${error.response?.status}`)
    //     console.error('오류 상세:', error.response?.data)
    //   } else {
    //     alert('알 수 없는 오류가 발생했습니다.')
    //     console.error('오류:', error)
    //   }
    // }
    const response = await axios.post('/api/invitation', {
      body: data,
    })
    alert(`response: ${response.status}`)
    console.log(await response, 'onSubmitInvitation_response')
  }

  async function onSubmitInvitationPut(e: any) {
    e.preventDefault() // 폼 기본 동작 방지

    // console.log(data, 'data')
    // try {
    //   const response = await axios.put('/api/invitation', data)
    //   alert(`응답: ${response.status}`)
    //   console.log(response.data, '초대장 수정 응답')
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     alert(`오류 발생: ${error.response?.status}`)
    //     console.error('오류 상세:', error.response?.data)
    //   } else {
    //     alert('알 수 없는 오류가 발생했습니다.')
    //     console.error('오류:', error)
    //   }
    // }
    const response = await axios.put('/api/invitation', {
      body: data,
    })
    alert(`response: ${response.status}`)
    console.log(await response, 'onSubmitInvitation_response')
  }

  //please write down example value

  return (
    <div className="m-2 flex flex-col gap-12">
      <div className="flex flex-col gap-3 border border-black p-2">
        <h1>POST: /api/files/user_uuid={userUuid} </h1>
        <input
          type="file"
          name="file"
          onChange={async (e) => {
            if (e.target.files) {
              const formData = new FormData()
              Object.values(e.target.files).forEach((file) => {
                formData.append('file', file)
              })

              setFormData(formData)
            }
          }}
        />
        <input
          onChange={(e) => setUseruuid(e.target.value)}
          type="text"
          placeholder="user_uuid (uuid)"
          className="border border-black p-2"
        />
        <button onClick={onSubmitFile} className="border border-black p-2">
          제출하기
        </button>
      </div>

      <div className="flex flex-col gap-3 border border-black p-2">
        <h1>POST : /api/invitation</h1>
        <input
          type="text"
          placeholder="백그라운드 이미지"
          className="border border-black p-2"
          onChange={(e) => setBackgroundImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="제목"
          className="border border-black p-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="사용자 정의 URL"
          className="border border-black p-2"
          onChange={(e) => setCustomUrl(e.target.value)}
        />
        <input
          type="text"
          className="border border-black p-2"
          value={date}
          // onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="대표 이미지"
          className="border border-black p-2"
          onChange={(e) => setPrimaryImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="사용자 ID"
          className="border border-black p-2"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="콘텐츠(배열)"
          className="border border-black p-2"
          value={JSON.stringify(contents)}
          // onChange={(e) => setContents(e.target.value)}
        />
        <button onClick={onSubmitInvitation} className="border border-black p-2 w-full">
          초대장 생성 (POST)
        </button>
      </div>

      <div className="flex flex-col gap-3 border border-black p-2">
        <h1>PUT : /api/invitation</h1>
        <input
          type="text"
          placeholder="백그라운드 이미지"
          className="border border-black p-2"
          onChange={(e) => setBackgroundImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="제목"
          className="border border-black p-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="사용자 정의 URL"
          className="border border-black p-2"
          onChange={(e) => setCustomUrl(e.target.value)}
        />
        <input
          type="text"
          className="border border-black p-2"
          value={date}
          // onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="대표 이미지"
          className="border border-black p-2"
          onChange={(e) => setPrimaryImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="사용자 ID"
          className="border border-black p-2"
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="콘텐츠(배열)"
          className="border border-black p-2"
          value={JSON.stringify(contents)}
          // onChange={(e) => setContents(e.target.value)}
        />
        <button onClick={onSubmitInvitationPut} className="border border-black p-2 w-full">
          초대장 생성 (PUT)
        </button>
      </div>
    </div>
  )
}

export default FormPage
