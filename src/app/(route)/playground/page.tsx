'use client'

const FormPage = () => {
  return (
    <input
      type="file"
      name="file"
      onChange={async (e) => {
        if (e.target.files) {
          const formData = new FormData()
          Object.values(e.target.files).forEach((file) => {
            formData.append('file', file)
          })

          const response = await fetch('/api/image', {
            method: 'POST',
            body: formData,
            // params: { invitation_id: 'invitation(d' },
            // query: { invitation_id: 'invitation(d' },
          })

          console.log(response)
          const result = await response?.json()
          if (result.success) {
            alert('Upload ok : ' + result.name)
          } else {
            alert('Upload failed')
          }
        }
      }}
    />
  )
}

export default FormPage
