import type { HTMLAttributes } from 'react'
import { cloneElement, forwardRef } from 'react'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'
import { icons } from './icons'
import type { ColorKey } from '@/types/color'

const IconVariants = cva<{
  size: Record<'sm' | 'md' | 'lg' | 'xl', string>
  stroke: Record<ColorKey | '', string>
  fill: Record<ColorKey | '', string>
}>('flex justify-content items-center', {
  variants: {
    size: {
      sm: 'w-[14px] h-[14px]',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    },
    stroke: {
      '': '',
      'neutral-000': '[&_path]:stroke-neutral-000',
      'neutral-100': '[&_path]:stroke-neutral-100',
      'neutral-200': '[&_path]:stroke-neutral-200',
      'neutral-300': '[&_path]:stroke-neutral-300',
      'neutral-400': '[&_path]:stroke-neutral-400',
      'neutral-500': '[&_path]:stroke-neutral-500',
      'neutral-600': '[&_path]:stroke-neutral-600',
      'neutral-700': '[&_path]:stroke-neutral-700',
      'neutral-800': '[&_path]:stroke-neutral-800',
      'orange-50': '[&_path]:stroke-orange-50',
      'orange-100': '[&_path]:stroke-orange-100',
      'orange-200': '[&_path]:stroke-orange-200',
      'orange-300': '[&_path]:stroke-orange-300',
      'orange-400': '[&_path]:stroke-orange-400',
      'orange-500': '[&_path]:stroke-orange-500',
      'orange-600': '[&_path]:stroke-orange-600',
      'orange-700': '[&_path]:stroke-orange-700',
      'orange-800': '[&_path]:stroke-orange-800',
      'purple-50': '[&_path]:stroke-purple-50',
      'purple-100': '[&_path]:stroke-purple-100',
      'purple-200': '[&_path]:stroke-purple-200',
      'purple-300': '[&_path]:stroke-purple-300',
      'purple-400': '[&_path]:stroke-purple-400',
      'purple-500': '[&_path]:stroke-purple-500',
      'purple-600': '[&_path]:stroke-purple-600',
      'purple-700': '[&_path]:stroke-purple-700',
      'purple-800': '[&_path]:stroke-purple-800',
      'yellow-100': '[&_path]:stroke-yellow-100',
      'profile-coral': '[&_path]:stroke-profile-coral',
      'profile-dark-blue': '[&_path]:stroke-profile-dark-blue',
      'profile-sky-blue': '[&_path]:stroke-profile-sky-blue',
      'profile-violet': '[&_path]:stroke-profile-violet',
      'profile-green': '[&_path]:stroke-profile-green',
    },
    fill: {
      '': '',
      'neutral-000': '[&_path]:fill-neutral-000',
      'neutral-100': '[&_path]:fill-neutral-100',
      'neutral-200': '[&_path]:fill-neutral-200',
      'neutral-300': '[&_path]:fill-neutral-300',
      'neutral-400': '[&_path]:fill-neutral-400',
      'neutral-500': '[&_path]:fill-neutral-500',
      'neutral-600': '[&_path]:fill-neutral-600',
      'neutral-700': '[&_path]:fill-neutral-700',
      'neutral-800': '[&_path]:fill-neutral-800',
      'orange-50': '[&_path]:fill-orange-50',
      'orange-100': '[&_path]:fill-orange-100',
      'orange-200': '[&_path]:fill-orange-200',
      'orange-300': '[&_path]:fill-orange-300',
      'orange-400': '[&_path]:fill-orange-400',
      'orange-500': '[&_path]:fill-orange-500',
      'orange-600': '[&_path]:fill-orange-600',
      'orange-700': '[&_path]:fill-orange-700',
      'orange-800': '[&_path]:fill-orange-800',
      'purple-50': '[&_path]:fill-purple-50',
      'purple-100': '[&_path]:fill-purple-100',
      'purple-200': '[&_path]:fill-purple-200',
      'purple-300': '[&_path]:fill-purple-300',
      'purple-400': '[&_path]:fill-purple-400',
      'purple-500': '[&_path]:fill-purple-500',
      'purple-600': '[&_path]:fill-purple-600',
      'purple-700': '[&_path]:fill-purple-700',
      'purple-800': '[&_path]:fill-purple-800',
      'yellow-100': '[&_path]:fill-yellow-100',
      'profile-coral': '[&_path]:fill-profile-coral',
      'profile-dark-blue': '[&_path]:fill-profile-dark-blue',
      'profile-sky-blue': '[&_path]:fill-profile-sky-blue',
      'profile-violet': '[&_path]:fill-profile-violet',
      'profile-green': '[&_path]:fill-profile-green',
    },
  },
  defaultVariants: {
    size: 'md',
    stroke: '',
    fill: '',
  },
})

export type IconKey = keyof typeof icons
export interface IconProps extends HTMLAttributes<HTMLElement> {
  type: IconKey
  stroke?: ColorKey
  fill?: ColorKey
  size?: 'sm' | 'md' | 'lg' | 'xl'
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
