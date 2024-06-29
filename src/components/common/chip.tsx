import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'

const ChipVariants = cva<{
  colorScheme: Record<'neutral' | 'orange', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>('rounded px-2 py-1 text-[13px] font-medium leading-normal', {
  variants: {
    colorScheme: {
      neutral: 'bg-neutral-600 text-neutral-300',
      orange: 'bg-neutral-800 text-main-orange',
    },
    size: {
      sm: 'px-[6px] py-[2px]',
      md: 'px-2 py-1',
      lg: 'px-[10px] py-[6px]',
    },
  },
  defaultVariants: {
    colorScheme: 'neutral',
    size: 'md',
  },
})

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  colorScheme?: 'neutral' | 'orange'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, children, colorScheme, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          ChipVariants({
            colorScheme,
            size,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Chip.displayName = 'chip'

export default Chip
