import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'

const ButtonVariants = cva<{
  colorScheme: Record<'orange' | 'neutral', string>
  size: Record<'sm' | 'md' | 'lg', string>
  rounded: Record<'xl' | 'full', string>
}>(
  'flex justify-center items-center cursor-pointer text-neutral-000 text-[18px] font-semibold leading-tight',
  {
    variants: {
      colorScheme: {
        orange: 'bg-orange-400',
        neutral: 'bg-neutral-500',
      },
      size: {
        sm: 'py-[12px]',
        md: 'py-[15px]',
        lg: 'py-[18px]',
      },
      rounded: {
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      colorScheme: 'orange',
      size: 'md',
      rounded: 'full',
    },
  },
)

const darkDisableClass = 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
const lightDisableClass = 'bg-neutral-100 text-neutral-200 cursor-not-allowed'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'orange' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'xl' | 'full'
  disabledColor?: 'dark' | 'light'
  fullWidth?: boolean
}

const getDisabledClassName = (
  disabled: boolean,
  disabledColor: 'dark' | 'light',
) => {
  if (!disabled) {
    return ''
  }
  return disabledColor === 'dark' ? darkDisableClass : lightDisableClass
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      size,
      colorScheme,
      rounded,
      disabled = false,
      fullWidth = true,
      disabledColor = 'dark',
      ...props
    },
    ref,
  ) => {
    const disabledClassName = getDisabledClassName(disabled, disabledColor)

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
          ButtonVariants({
            colorScheme,
            size,
            rounded,
          }),
          className,
          disabledClassName,
          fullWidth && 'w-full',
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
