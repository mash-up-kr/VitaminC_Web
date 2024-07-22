import BottomModal from '@/components/BottomModal'

interface RegisterCancelModalProps {
  isOpen: Parameters<typeof BottomModal>[0]['isOpen']
  onClose: Parameters<typeof BottomModal>[0]['onClose']
  onConfirm: Parameters<typeof BottomModal>[0]['onConfirm']
}

const RegisterCancelModal = ({
  isOpen,
  onClose,
  onConfirm,
}: RegisterCancelModalProps) => {
  return (
    <BottomModal
      isOpen={isOpen}
      title="맛집 등록을 취소하시겠어요?"
      body="이탈하면 등록했던 태그는 모두 사라져요."
      cancelMessage="아니요"
      confirmMessage="취소"
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
    />
  )
}

export default RegisterCancelModal
