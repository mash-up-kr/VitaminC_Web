import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import AccessibleIconButton from './accessible-icon-button'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import cn from '@/utils/cn'

const SearchInputVariants = cva<{
  variant: Record<'outlined' | 'filled', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(
  `w-full leading-none text-neutral-100 caret-orange-400 rounded-md placeholder:text-neutral-400`,
  {
    variants: {
      variant: {
        outlined: 'border border-solid border-neutral-400 bg-neutral-800',
        filled:
          'bg-neutral-600 outline-none outline-offset-0 focus:outline-1 focus:outline-neutral-300 focus-outline-offset-1',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  },
)

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof SearchInputVariants> {
  rightIcon: Parameters<typeof AccessibleIconButton>[0]
  leftIcon?: Parameters<typeof AccessibleIconButton>[0]
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

const INITIAL_PLACEHOLDER = '원하는 장소를 검색해 주세요.'

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      variant,
      size,
      rightIcon,
      leftIcon,
      className,
      placeholder = INITIAL_PLACEHOLDER,
      ...props
    },
    ref,
  ) => {
    const isShowIcon =
      (rightIcon && rightIcon.icon.type !== 'delete') ||
      (rightIcon?.icon.type === 'delete' && props.value)

    return (
      <div className="relative flex w-full items-center">
        {leftIcon && (
          <AccessibleIconButton
            className="absolute left-4 top-1/2 -translate-y-1/2"
            {...leftIcon}
          />
        )}
        <input
          {...props}
          className={cn(
            SearchInputVariants({ variant, size }),
            className,
            leftIcon?.icon.type && 'pl-[50px]',
          )}
          ref={ref}
          placeholder={placeholder}
        />
        {isShowIcon && (
          <AccessibleIconButton
            className="absolute right-4 top-1/2 -translate-y-1/2"
            {...rightIcon}
          />
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
