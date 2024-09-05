import toast, { type ToastOptions, Toaster } from 'react-hot-toast'

import Icon from './icon'
import Typography from './typography'
import { cva } from 'class-variance-authority'
import cn from '@/utils/cn'
import type { ClassName } from '@/models/common'

type ToastType = 'success' | 'error'

const ToastVariants = cva<{
  type: Record<ToastType, string>
}>(
  'flex max-w-[calc(420px-2*25px)] items-center justify-center gap-2 rounded-full bg-opacity-85 px-6 py-[14px] leading-tight',
  {
    variants: {
      type: {
        success: 'bg-[#0D0D2B]',
        error: 'bg-[#2C0F09]',
      },
    },
    defaultVariants: {
      type: 'success',
    },
  },
)

interface ToastProps extends ClassName {
  type: ToastType
  message: string
  options?: ToastOptions
}

const toastCustom = ({ type, message, options, className }: ToastProps) => {
  toast.custom(
    (t) => (
      <div
        className={cn(
          ToastVariants({ type }),
          className,
          `${t.visible ? 'animate-enter' : 'animate-leave'}`,
        )}
      >
        {type === 'success' ? (
          <Icon type="info" fill="profile-sky-blue" aria-hidden />
        ) : (
          <Icon type="infoCircle" fill="orange-400" aria-hidden />
        )}

        <Typography size="h6" color="neutral-100">
          {message}
        </Typography>
      </div>
    ),
    options,
  )
}

const notify = {
  success: (message: string, options?: ToastOptions) =>
    toastCustom({
      type: 'success',
      message,
      options: { id: 'toast-success', ...options },
    }),
  error: (message: string, options?: ToastOptions) =>
    toastCustom({
      type: 'error',
      message,
      options: { id: 'toast-error', ...options },
    }),
}

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
      }}
      containerStyle={{
        top: 20,
        left: 25,
        bottom: 20,
        right: 25,
        position: 'fixed',
      }}
    />
  )
}

export { CustomToaster, notify }
