import cn from '@/utils/cn'
import { Button } from './common'

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
    <div className={cn('flex gap-3', className)}>
      <Button colorScheme="neutral" width="sm" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button colorScheme="orange" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  )
}

export default ConfirmCancelButton
