import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import cn from '@/utils/cn'
import Icon from './icon'
import Typography from './typography'
import type { ColorKey } from '@/types/color'

const FilterButtonVariants = cva<{
  colorScheme: Record<'neutral' | 'orange', string>
}>(
  'rounded-3xl flex justify-center items-center px-[10px] py-1 bg-neutral-600',
  {
    variants: {
      colorScheme: {
        neutral: '',
        orange: 'border-orange-400',
      },
    },
    defaultVariants: {
      colorScheme: 'neutral',
    },
  },
)

interface FilterButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof FilterButtonVariants> {
  rightIcon?: Parameters<typeof Icon>[0]
  isActive?: boolean
}

const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, children, rightIcon, isActive = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          FilterButtonVariants({
            colorScheme: isActive ? 'orange' : 'neutral',
          }),
          className,
          rightIcon ? 'gap-1' : '',
        )}
        {...props}
      >
        <Typography size="h7" color={isActive ? 'orange-400' : 'neutral-100'}>
          {children}
        </Typography>
        {rightIcon && (
          <Icon
            {...rightIcon}
            color={isActive ? 'orange-400' : 'neutral-100'}
            aria-hidden
          />
        )}
      </button>
    )
  },
)

FilterButton.displayName = 'chip-button'

export default FilterButton
