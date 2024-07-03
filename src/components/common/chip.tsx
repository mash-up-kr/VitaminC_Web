import { forwardRef } from 'react'
import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'
import Typography, { type FontKey } from './typography'

const ChipVariants = cva<{
  colorScheme: Record<
    | 'neutral-400'
    | 'neutral-500'
    | 'neutral-600'
    | 'neutral-800'
    | 'orange'
    | 'purple',
    string
  >
  size: Record<'sm' | 'md' | 'lg', string>
}>('rounded-full', {
  variants: {
    colorScheme: {
      'neutral-400': 'bg-neutral-400 text-neutral-000',
      'neutral-500': 'bg-neutral-500 text-neutral-400',
      'neutral-600': 'bg-neutral-600 text-neutral-300',
      'neutral-800': 'bg-neutral-800 text-orange-400',
      orange: 'bg-orange-400 text-neutral-000',
      purple: 'bg-purple-300 text-neutral-000',
    },
    size: {
      sm: 'px-2 py-1',
      md: 'px-[10px] py-2',
      lg: 'px-5 py-2',
    },
  },
  defaultVariants: {
    colorScheme: 'neutral-400',
    size: 'md',
  },
})

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  colorScheme?:
    | 'neutral-400'
    | 'neutral-500'
    | 'neutral-600'
    | 'neutral-800'
    | 'orange'
    | 'purple'
  size?: 'sm' | 'md' | 'lg'
  fontSize?: FontKey
  children: ReactNode
}

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      children,
      colorScheme,
      size,
      fontSize = 'h7',
      color,
      ...props
    },
    ref,
  ) => {
    return (
      <Typography
        as="span"
        size={fontSize}
        ref={ref as ForwardedRef<HTMLDivElement>}
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
      </Typography>
    )
  },
)

Chip.displayName = 'chip'

export default Chip
