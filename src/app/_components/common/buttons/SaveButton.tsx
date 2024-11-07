// SaveButton.tsx
import React from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import LoginModal from '@/app/_components/common/modal/LoginModal'

type SaveButtonProps = {
  onSave: () => void
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  const user = useUser()
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false)

  const handleSaveClick = () => {
    if (!user) {
      setLoginModalOpen(true)
    } else {
      onSave() // 인증된 사용자만 onSave 실행
    }
  }

  return (
    <>
      <button
        type="button"
        className="bg-gray-700 px-[14px] py-2 rounded-md text-white font-semibold absolute top-1 right-2 z-100"
        onClick={handleSaveClick}
      >
        저장
      </button>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  )
}

export default SaveButton
