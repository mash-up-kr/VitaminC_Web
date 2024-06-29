import type { HTMLAttributes } from 'react'
import { cloneElement, forwardRef } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'
import { icons } from './icons'
import type { ColorKey } from '@/types/color'

const IconVariants = cva<{
  size: Record<'sm' | 'md' | 'lg', string>
  stroke: Record<ColorKey, string>
  fill: Record<ColorKey, string>
}>('flex justify-content items-center', {
  variants: {
    size: {
      sm: 'w-[14px] h-[14px]',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
    stroke: {
      'neutral-000': '[&_path]:stroke-neutral-000',
      'neutral-100': '[&_path]:stroke-neutral-100',
      'neutral-200': '[&_path]:stroke-neutral-200',
      'neutral-300': '[&_path]:stroke-neutral-300',
      'neutral-400': '[&_path]:stroke-neutral-400',
      'neutral-500': '[&_path]:stroke-neutral-500',
      'neutral-600': '[&_path]:stroke-neutral-600',
      'neutral-700': '[&_path]:stroke-neutral-700',
      'neutral-800': '[&_path]:stroke-neutral-800',
      orange: '[&_path]:stroke-main-orange',
      blue: '[&_path]:stroke-main-blue',
      purple: '[&_path]:stroke-main-purple',
      yellow: '[&_path]:stroke-main-yellow',
      pink: '[&_path]:stroke-main-pink',
      green: '[&_path]:stroke-main-green',
    },
    fill: {
      'neutral-000': '[&_path]:fill-neutral-000',
      'neutral-100': '[&_path]:fill-neutral-100',
      'neutral-200': '[&_path]:fill-neutral-200',
      'neutral-300': '[&_path]:fill-neutral-300',
      'neutral-400': '[&_path]:fill-neutral-400',
      'neutral-500': '[&_path]:fill-neutral-500',
      'neutral-600': '[&_path]:fill-neutral-600',
      'neutral-700': '[&_path]:fill-neutral-700',
      'neutral-800': '[&_path]:fill-neutral-800',
      orange: '[&_path]:fill-main-orange',
      blue: '[&_path]:fill-main-blue',
      purple: '[&_path]:fill-main-purple',
      yellow: '[&_path]:fill-main-yellow',
      pink: '[&_path]:fill-main-pink',
      green: '[&_path]:fill-main-green',
    },
  },
  defaultVariants: {
    size: 'md',
    stroke: 'neutral-600',
    fill: 'orange',
  },
})

export type IconKey = keyof typeof icons
export interface IconProps extends HTMLAttributes<HTMLElement> {
  type: IconKey
  stroke?: ColorKey
  fill?: ColorKey
  size?: 'sm' | 'md' | 'lg'
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ type, className, stroke, fill, size, ...props }, ref) => {
    const TargetIcon = icons[type]

    return cloneElement(<TargetIcon ref={ref} />, {
      className: cn(IconVariants({ size, fill, stroke }), className),
      ...props,
    })
  },
)

Icon.displayName = 'icon'

export default Icon
