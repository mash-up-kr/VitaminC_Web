import BottomModal from '@/components/common/bottom-modal'
import type { LikeUsers } from '@/components/place/types'
import type { User } from '@/models/user'

interface PlaceDeleteModalProps {
  createdUser: Omit<User, 'role'> | null
  likedUsers?: LikeUsers[]
  isOpen: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

const safeNameWith님 = (name: string) => {
  if (name === '다른 크루원') {
    return `${name}`
  }
  return `${name}님`
}

const PlaceDeleteModal = ({
  createdUser,
  likedUsers,
  isOpen,
  onCancel,
  onConfirm,
}: PlaceDeleteModalProps) => {
  const numOfLike = likedUsers?.length || 0
  const likeCount = (() => {
    if (numOfLike === 0) return 0
    const isCreateUserLike = !!likedUsers?.find(
      (likeUser) => likeUser.id === createdUser?.id,
    )
    return isCreateUserLike ? numOfLike - 1 : numOfLike
  })()

  return (
    <BottomModal
      isOpen={isOpen}
      title={
        likeCount > 0
          ? `${safeNameWith님(createdUser?.nickname ?? '다른 크루원')} 외 ${likeCount.toLocaleString()}명이 선택한 맛집이에요\n정말 삭제할까요?`
          : `${safeNameWith님(createdUser?.nickname ?? '다른 크루원')}이 선택한 맛집이에요\n정말 삭제할까요?`
      }
      body="삭제하면 등록했던 태그는 모두 사라져요."
      cancelMessage="아니요"
      confirmMessage="삭제"
      onClose={onCancel}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}

export default PlaceDeleteModal
