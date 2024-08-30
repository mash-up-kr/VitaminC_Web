import Button from '@/components/common/button'
import cn from '@/utils/cn'

interface ConfirmCancelButtonProps {
  className?: string
  cancelLabel: string
  confirmLabel: string
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

const ConfirmCancelButton = ({
  className,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmCancelButtonProps) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <Button colorScheme="neutral" onClick={onCancel} className="flex-1">
        {cancelLabel}
      </Button>
      <Button colorScheme="orange" onClick={onConfirm} className="flex-[2]">
        {confirmLabel}
      </Button>
    </div>
  )
}

export default ConfirmCancelButton
