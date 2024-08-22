import { type ButtonHTMLAttributes, forwardRef } from 'react'

import Typography from './typography'
import { cva } from 'class-variance-authority'

import type { ColorKey } from '@/types/color'
import cn from '@/utils/cn'

const ButtonVariants = cva<{
  colorScheme: Record<'orange' | 'neutral', string>
  size: Record<'sm' | 'md' | 'lg', string>
  rounded: Record<'xl' | 'full', string>
}>('flex justify-center items-center cursor-pointer', {
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
})

const darkDisableClass = 'bg-neutral-500 text-neutral-400 cursor-not-allowed'
const lightDisableClass = 'bg-neutral-100 cursor-not-allowed'

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
): { disabledClassName: string; disabledTextColor: ColorKey } => {
  if (!disabled) {
    return { disabledClassName: '', disabledTextColor: 'neutral-000' }
  }
  return disabledColor === 'dark'
    ? { disabledClassName: darkDisableClass, disabledTextColor: 'neutral-400' }
    : { disabledClassName: lightDisableClass, disabledTextColor: 'neutral-200' }
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
    const { disabledClassName, disabledTextColor } = getDisabledClassName(
      disabled,
      disabledColor,
    )

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
        <Typography
          size="h4"
          color={disabled ? disabledTextColor : 'neutral-000'}
        >
          {children}
        </Typography>
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
