import BottomModal from '@/components/BottomModal'

interface PlaceDeleteModalProps {
  name?: string
  numOfLike: number
  isOpen: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

const PlaceDeleteModal = ({
  name,
  numOfLike,
  isOpen,
  onCancel,
  onConfirm,
}: PlaceDeleteModalProps) => {
  return (
    <BottomModal
      isOpen={isOpen}
      title={`${name}님 외 ${numOfLike.toLocaleString()}명이 선택한 맛집이에요\n정말 삭제할까요?`}
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
