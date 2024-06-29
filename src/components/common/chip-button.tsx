import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import cn from '@/utils/cn'
import Icon from './icon'

const ChipButtonVariants = cva(
  'rounded-[20px] flex justify-center items-center px-[10px] py-2 leading-tight tracking-[-0.02em]',
  {
    variants: {
      colorScheme: {
        neutral: 'bg-neutral-500 text-neutral-100',
        orange: 'bg-orange-400 text-neutral-000',
      },
    },
    defaultVariants: {
      colorScheme: 'neutral',
    },
  },
)

interface ChipButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ChipButtonVariants> {
  rightIcon?: Parameters<typeof Icon>[0]
  isActive?: boolean
}

const ChipButton = forwardRef<HTMLButtonElement, ChipButtonProps>(
  ({ className, children, rightIcon, isActive = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          ChipButtonVariants({
            colorScheme: isActive ? 'orange' : 'neutral',
          }),
          className,
          rightIcon ? 'gap-1' : '',
        )}
        {...props}
      >
        {children}
        {rightIcon && <Icon {...rightIcon} aria-hidden />}
      </button>
    )
  },
)

ChipButton.displayName = 'chip-button'

export default ChipButton
