'use client'

import { useState } from 'react'

const FormPage = () => {
  //image
  const [formData, setFormData] = useState<FormData>()
  const [userUuid, setUseruuid] = useState('')

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

  return (
    <div className="m-2 flex flex-col gap-3">
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
    </div>
  )
}

export default FormPage
