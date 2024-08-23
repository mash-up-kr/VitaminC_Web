import BottomModal from '@/components/common/bottom-modal'
import type { PlaceType } from '@/models/api/place'
import type { User } from '@/models/user'

interface PlaceDeleteModalProps {
  createdUser: Omit<User, 'role'> | null
  likedUserIds?: PlaceType['likedUserIds']
  numOfLike: number
  isOpen: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

const safeNameWith님 = (name: string) => {
  if (name === '다른 크루원') {
    return `${name}`;
  }
  return `${name}님`
}

const PlaceDeleteModal = ({
  createdUser,
  numOfLike,
  likedUserIds,
  isOpen,
  onCancel,
  onConfirm,
}: PlaceDeleteModalProps) => {
  const isShow외 = numOfLike > 0 && likedUserIds?.length === 1 && likedUserIds[0] !== createdUser?.id

  return (
    <BottomModal
      isOpen={isOpen}
      title={
        isShow외
          ? `${safeNameWith님(createdUser?.nickname ?? '다른 크루원')} 외 ${numOfLike.toLocaleString()}명이 선택한 맛집이에요\n정말 삭제할까요?`
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
