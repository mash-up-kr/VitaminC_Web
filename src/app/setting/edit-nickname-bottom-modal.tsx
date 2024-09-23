import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Input from '@/components/common/input'
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/constants/nickname'
import { APIError } from '@/models/api'
import { api } from '@/utils/api'
import { useState } from 'react'

interface EditNicknameBottomModalProps {
  isOpen: boolean
  onClose: VoidFunction
  onUpdateNickname: (nickname: string) => void
}

const EditNicknameBottomModal = ({
  isOpen,
  onClose,
  onUpdateNickname,
}: EditNicknameBottomModalProps) => {
  const [nickname, setNickname] = useState('')

  const handleChange = (value: string) => {
    setNickname(value)
  }

  const handleClickConfirm = async () => {
    try {
      const { data } = await api.users.me.patch({ nickname })
      onUpdateNickname(data.nickname ?? '')
      onClose()
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  return (
    <BottomModal
      layout="alert"
      isOpen={isOpen}
      disabled={nickname.length < MIN_NICKNAME_LENGTH}
      title="어떤 이름을 바꿀까요?"
      confirmMessage="이름 변경"
      body={
        <Input
          value={nickname}
          onChange={handleChange}
          minLength={MIN_NICKNAME_LENGTH}
          maxLength={MAX_NICKNAME_LENGTH}
        />
      }
      onClose={onClose}
      onConfirm={handleClickConfirm}
    />
  )
}

export default EditNicknameBottomModal
