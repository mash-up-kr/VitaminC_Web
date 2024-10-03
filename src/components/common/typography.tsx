import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes } from 'react'

import { cva } from 'class-variance-authority'

import type { ColorKey } from '@/models/color'
import cn from '@/utils/cn'

export type FontKey =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h5-2'
  | 'h6'
  | 'h7'
  | 'body0-2'
  | 'body0'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'

export const TypographyVariants = cva<{
  size: Record<FontKey, string>
  color: Record<ColorKey, string>
}>('', {
  variants: {
    size: {
      h0: 'text-h0',
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      'h5-2': 'text-h5-2',
      h6: 'text-h6',
      h7: 'text-h7',
      'body0-2': 'text-body0-2',
      body0: 'text-body0',
      body1: 'text-body1',
      body2: 'text-body2',
      body3: 'text-body3',
      body4: 'text-body4',
    },
    color: {
      'neutral-000': 'text-neutral-000',
      'neutral-100': 'text-neutral-100',
      'neutral-200': 'text-neutral-200',
      'neutral-300': 'text-neutral-300',
      'neutral-400': 'text-neutral-400',
      'neutral-500': 'text-neutral-500',
      'neutral-600': 'text-neutral-600',
      'neutral-700': 'text-neutral-700',
      'neutral-800': 'text-neutral-800',
      'orange-50': 'text-orange-50',
      'orange-100': 'text-orange-100',
      'orange-200': 'text-orange-200',
      'orange-300': 'text-orange-300',
      'orange-400': 'text-orange-400',
      'orange-500': 'text-orange-500',
      'orange-600': 'text-orange-600',
      'orange-700': 'text-orange-700',
      'orange-800': 'text-orange-800',
      'purple-50': 'text-purple-50',
      'purple-100': 'text-purple-100',
      'purple-200': 'text-purple-200',
      'purple-300': 'text-purple-300',
      'purple-400': 'text-purple-400',
      'purple-500': 'text-purple-500',
      'purple-600': 'text-purple-600',
      'purple-700': 'text-purple-700',
      'purple-800': 'text-purple-800',
      'yellow-100': 'text-yellow-100',
      'profile-coral': 'text-profile-coral',
      'profile-dark-blue': 'text-profile-dark-blue',
      'profile-sky-blue': 'text-profile-sky-blue',
      'profile-violet': 'text-profile-violet',
      'profile-green': 'text-profile-green',
      'blue-100': 'text-blue-100',
      'blue-200': 'text-blue-200',
      'blue-300': 'text-blue-300',
    },
  },
  defaultVariants: {
    size: 'h4',
    color: 'neutral-000',
  },
})

interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  size: FontKey
  color?: ColorKey
  as?: ElementType
}

const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  ({ size, className, children, color, as, ...props }, ref) => {
    const Component = as || 'div'

    return (
      <Component
        ref={ref}
        className={cn(TypographyVariants({ size, color }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Typography.displayName = 'typography'

export default Typography
