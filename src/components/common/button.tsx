import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'

const ButtonVariants = cva<{
  colorScheme: Record<'orange' | 'neutral', string>
  padding: Record<'sm' | 'md' | 'lg', string>
  width: Record<'sm' | 'md' | 'lg' | 'full' | 'fit', string>
}>(
  'flex justify-center items-center rounded-xl cursor-pointer text-neutral-000 text-[18px] font-semibold leading-normal',
  {
    variants: {
      colorScheme: {
        orange: 'bg-main-orange',
        neutral: 'bg-neutral-500',
      },
      padding: {
        sm: 'p-[12px]',
        md: 'p-[15px]',
        lg: 'p-[18px]',
      },
      width: {
        sm: 'w-[126px]',
        md: 'w-[197px]',
        lg: 'w-[265px]',
        fit: 'w-fit',
        full: 'w-full flex-1',
      },
    },
    defaultVariants: {
      colorScheme: 'orange',
      padding: 'md',
      width: 'full',
    },
  },
)

const disabledClass = 'bg-neutral-600 text-neutral-400 cursor-not-allowed'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: 'orange' | 'neutral'
  padding?: 'sm' | 'md' | 'lg'
  width?: 'sm' | 'md' | 'lg' | 'full' | 'fit'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, disabled, padding, width, colorScheme, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        ButtonVariants({
          colorScheme,
          padding,
          width,
        }),
        className,
        disabled && disabledClass,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
