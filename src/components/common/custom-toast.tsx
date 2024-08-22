import toast, { Toaster, type ToastOptions } from 'react-hot-toast'
import Icon from './icon'
import Typography from './typography'

type ToastType = 'success' | 'error'

const toastCustom = ({
  type,
  message,
  options,
}: {
  type: ToastType
  message: string
  options?: ToastOptions
}) => {
  toast.custom(
    (t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'} flex max-w-[calc(420px-2*25px)] items-center justify-center gap-2 rounded-full bg-[#212124] bg-opacity-70 px-6 py-[14px] leading-tight`}
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
