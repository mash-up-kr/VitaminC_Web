import type { ReactNode } from 'react'

import cn from '@/utils/cn'
import Modal from './common/Modal/Modal'
import { Button, Typography } from './common'
import type { ClassName } from '@/models/interface'

interface BottomModalLayoutProps extends ClassName {
  title: string
  body?: string | ReactNode
  cancelMessage?: string
  confirmMessage: string
  layout?: 'confirm' | 'alert'
  onCancel?: VoidFunction
  onConfirm: VoidFunction
}

const BottomModalLayout = ({
  title,
  body,
  className,
  cancelMessage,
  confirmMessage,
  layout,
  onCancel,
  onConfirm,
}: BottomModalLayoutProps) => {
  return (
    <div
      className={cn(
        'w-full top-auto bottom-0 translate-y-0 bg-neutral-700 rounded-t-[20px] px-5 pt-6 flex flex-col gap-3',
        className,
      )}
    >
      <Typography
        as="h3"
        size="h3"
        color="neutral-000"
        className="whitespace-pre-line"
      >
        {title}
      </Typography>
      {typeof body === 'string' ? (
        <Typography
          size="body2"
          color="neutral-200"
          className="mt-1 whitespace-pre-line"
        >
          {body}
        </Typography>
      ) : (
        <div className="w-full max-h-[70dvh] overflow-y-scroll">{body}</div>
      )}

      {layout === 'confirm' ? (
        <div className="w-full h-[94px] flex justify-center items-center gap-2">
          <Button colorScheme="neutral" onClick={onCancel}>
            {cancelMessage}
          </Button>
          <Button colorScheme="orange" onClick={onConfirm}>
            {confirmMessage}
          </Button>
        </div>
      ) : (
        <div className="py-5">
          <Button onClick={onConfirm}>{confirmMessage}</Button>
        </div>
      )}
    </div>
  )
}

interface BottomModalProps extends BottomModalLayoutProps {
  layout?: 'confirm' | 'alert'
  isOpen: Parameters<typeof Modal>[0]['isOpen']
  onClose: Parameters<typeof Modal>[0]['onClose']
}

const BottomModal = ({
  isOpen,
  title,
  body,
  confirmMessage,
  cancelMessage,
  layout = 'confirm',
  onClose,
  onCancel,
  onConfirm,
}: BottomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initial={{ bottom: '-50%', opacity: 0.2 }}
      animate={{ bottom: 0, opacity: 1 }}
      exit={{ bottom: '-50%', opacity: 0.2 }}
      delayTiming={500}
      className="w-full max-w-[420px] top-auto bottom-0 translate-y-0"
    >
      <BottomModalLayout
        title={title}
        body={body}
        layout={layout}
        cancelMessage={cancelMessage}
        confirmMessage={confirmMessage}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Modal>
  )
}

export default BottomModal
