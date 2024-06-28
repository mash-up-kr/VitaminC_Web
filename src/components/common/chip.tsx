import type { HTMLAttributes, ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'

const ChipVariants = cva<{
  colorScheme: Record<'neutral', string>
}>('rounded px-2 py-1 text-[13px] font-medium leading-normal', {
  variants: {
    colorScheme: {
      neutral: 'bg-neutral-600 text-neutral-300',
    },
  },
  defaultVariants: {
    colorScheme: 'neutral',
  },
})

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  colorScheme?: 'neutral'
  children: ReactNode
}

function Chip({
  className,
  children,
  colorScheme = 'neutral',
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        ChipVariants({
          colorScheme,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Chip
