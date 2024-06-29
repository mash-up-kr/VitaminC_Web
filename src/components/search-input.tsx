import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import AccessibleIconButton from './accessible-icon-button'

const SearchInputVariants = cva<{
  variant: Record<'outlined' | 'filled', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(
  `w-full leading-none caret-orange-400 rounded-md placeholder:text-neutral-400`,
  {
    variants: {
      variant: {
        outlined: 'border border-solid border-neutral-400 bg-neutral-800',
        filled:
          'bg-neutral-600 outline-none outline-offset-0 focus:outline-1 focus:outline-neutral-300',
      },
      size: {
        sm: 'p-3 pr-[50px]',
        md: 'p-4 pr-[50px]',
        lg: 'p-5 pr-[50px]',
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
      rightIcon.icon.type !== 'delete' ||
      (rightIcon.icon.type === 'delete' && props.value)

    return (
      <div className="w-full relative">
        {leftIcon && (
          <AccessibleIconButton
            className="absolute top-1/2 -translate-y-1/2 left-4"
            {...leftIcon}
          />
        )}
        <input
          {...props}
          className={cn(
            SearchInputVariants({ variant, size }),
            className,
            leftIcon?.type ? 'pl-[50px]' : '',
          )}
          ref={ref}
          placeholder={placeholder}
        />
        {isShowIcon && (
          <AccessibleIconButton
            className="absolute top-1/2 -translate-y-1/2 right-4"
            {...rightIcon}
          />
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
