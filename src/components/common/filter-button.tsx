import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'
import Icon from './icon'
import Typography from './typography'

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
  icon?: Parameters<typeof Icon>[0]
  isActive?: boolean
  numOfSelectedFilter?: number
}

const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ className, children, icon, numOfSelectedFilter = 0, ...props }, ref) => {
    const isActive = numOfSelectedFilter > 0

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          FilterButtonVariants({
            colorScheme: numOfSelectedFilter ? 'orange' : 'neutral',
          }),
          className,
          icon ? 'gap-1' : '',
          numOfSelectedFilter ? 'border border-orange-400' : '',
        )}
        {...props}
        aria-label="필터 적용"
      >
        {icon && isActive && <Icon {...icon} stroke="orange-400" aria-hidden />}
        <Typography size="h7" color={isActive ? 'orange-400' : 'neutral-100'}>
          {isActive ? numOfSelectedFilter : children}
        </Typography>
        {icon && !isActive && (
          <Icon {...icon} stroke="neutral-100" aria-hidden />
        )}
      </button>
    )
  },
)

FilterButton.displayName = 'FilterButton'

export default FilterButton
