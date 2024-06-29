import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import { AccessibleIconButton } from '..'
import Icon from '../common/icon'

const SearchInputVariants = cva<{
  variant: Record<'outlined' | 'filled', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(
  `w-full leading-none caret-main-orange rounded-md placeholder:text-neutral-400`,
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
  rightIcon: Parameters<typeof Icon>[0]
  leftIcon?: Parameters<typeof Icon>[0]
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
      rightIcon.type !== 'delete' ||
      (rightIcon.type === 'delete' && props.value)

    return (
      <div className="w-full relative">
        {leftIcon?.type && leftIcon.onClick && (
          <AccessibleIconButton
            label={leftIcon['aria-label'] ?? ''}
            className="absolute top-1/2 -translate-y-1/2 left-4"
            onClick={leftIcon.onClick}
            icon={{ ...leftIcon }}
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
            label={rightIcon['aria-label'] ?? ''}
            onClick={rightIcon.onClick}
            icon={{ ...rightIcon }}
          />
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
