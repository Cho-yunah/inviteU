'use client'

import { useState } from 'react'

const FormPage = () => {
  //image
  const [formData, setFormData] = useState<FormData>()
  const [invitationId, setInvitationId] = useState('')
  //video
  const [formDataVideo, setFormDataVideo] = useState<FormData>()
  const [invitationIdVideo, setInvitationIdVideo] = useState('')

  const onSubmitImage = async () => {
    if (!!formData && !!invitationId) {
      const response = await fetch(`/api/image?invitation_id=${invitationId}`, {
        method: 'POST',
        body: formData,
      })
      alert(`response: ${response.status}`)
      console.log(response, 'onSubmitImage_response')
    }
  }

  const onSubmitVideo = async () => {
    if (!!formDataVideo && !!invitationId) {
      const response = await fetch(`/api/video?invitation_id=${invitationId}`, {
        method: 'POST',
        body: formData,
      })
      alert(`response: ${response.status}`)
      console.log(response, 'onSubmitVideo_response')
    }
  }
  return (
    <div className="flex flex-col gap-3 m-2">
      <div className="flex flex-col gap-3 border border-black p-2">
        <h1>POST: /api/image/invitation_id={invitationId} </h1>
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
          onChange={(e) => setInvitationId(e.target.value)}
          type="text"
          placeholder="invitation_id (uuid)"
          className="border-black p-2 border"
        />
        <button onClick={onSubmitImage} className="p-2 border border-black">
          제출하기
        </button>
      </div>

      {/* video */}
      <div className="flex flex-col gap-3 border border-black p-2">
        <h1>POST: /api/video/invitation_id={invitationIdVideo} </h1>
        <input
          type="file"
          name="file"
          onChange={async (e) => {
            if (e.target.files) {
              const formData = new FormData()
              Object.values(e.target.files).forEach((file) => {
                formData.append('file', file)
              })

              setFormDataVideo(formData)
            }
          }}
        />
        <input
          onChange={(e) => setInvitationIdVideo(e.target.value)}
          type="text"
          placeholder="invitation_id (uuid)"
          className="border-black p-2 border"
        />
        <button onClick={onSubmitVideo} className="p-2 border border-black">
          제출하기
        </button>
      </div>
    </div>
  )
}

export default FormPage
