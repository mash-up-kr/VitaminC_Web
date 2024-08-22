import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import Icon from './icon'
import type { FontKey } from './typography'
import Typography from './typography'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import type { ColorKey } from '@/types/color'
import cn from '@/utils/cn'

const ChipButtonVariants = cva<{
  colorScheme: Record<'neutral' | 'orange', `bg-${ColorKey}`>
}>('rounded-3xl flex justify-center items-center px-[10px] py-2', {
  variants: {
    colorScheme: {
      neutral: 'bg-neutral-500',
      orange: 'bg-orange-400',
    },
  },
  defaultVariants: {
    colorScheme: 'neutral',
  },
})

interface ChipButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ChipButtonVariants> {
  rightIcon?: Parameters<typeof Icon>[0]
  isActive?: boolean
  fontSize?: FontKey
}

const ChipButton = forwardRef<HTMLButtonElement, ChipButtonProps>(
  (
    {
      className,
      children,
      rightIcon,
      isActive = false,
      fontSize = 'h6',
      ...props
    },
    ref,
  ) => {
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
        <Typography size={fontSize} color="neutral-100">
          {children}
        </Typography>
        {rightIcon && <Icon {...rightIcon} aria-hidden />}
      </button>
    )
  },
)

ChipButton.displayName = 'chip-button'

export default ChipButton
