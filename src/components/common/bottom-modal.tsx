import type { ReactNode } from 'react'

import Button from './button'
import Modal from './modal'
import Typography from './typography'

import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface BottomModalLayoutProps extends ClassName {
  title: string
  scrollable?: boolean
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
  scrollable,
  cancelMessage,
  confirmMessage,
  layout,
  onCancel,
  onConfirm,
}: BottomModalLayoutProps) => {
  return (
    <div
      className={cn(
        'bottom-0 top-auto flex w-full translate-y-0 flex-col gap-3 rounded-t-[20px] bg-neutral-700 px-5 pt-6',
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
        <div
          className={cn(
            'w-full',
            scrollable && 'no-scrollbar overflow-y-scroll',
          )}
        >
          {body}
        </div>
      )}

      {layout === 'confirm' ? (
        <div className="flex h-[94px] w-full items-center justify-center gap-2">
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

interface BottomModalProps extends BottomModalLayoutProps, ClassName {
  layout?: 'confirm' | 'alert'
  scrollable?: boolean
  layoutClassName?: string
  isOpen: Parameters<typeof Modal>[0]['isOpen']
  onClose: Parameters<typeof Modal>[0]['onClose']
}

const BottomModal = ({
  isOpen,
  title,
  body,
  className,
  layoutClassName,
  confirmMessage,
  cancelMessage,
  scrollable = true,
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
      className={cn(
        'bottom-0 top-auto w-full max-w-[420px] translate-y-0',
        className,
      )}
    >
      <BottomModalLayout
        title={title}
        body={body}
        layout={layout}
        scrollable={scrollable}
        className={layoutClassName}
        cancelMessage={cancelMessage}
        confirmMessage={confirmMessage}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Modal>
  )
}

export default BottomModal
