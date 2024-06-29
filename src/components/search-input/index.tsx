import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import { AccessibleIconButton } from '..'
import { IconKey } from '../common/icon'

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
  rightIconLabel: string
  rightIconType: IconKey
  leftIconLabel?: string
  leftIconType?: IconKey
  onClickRightIcon: () => void
  onClickLeftIcon?: () => void
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

const INITIAL_PLACEHOLDER = '원하는 장소를 검색해 주세요.'

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      variant,
      size,
      className,
      rightIconLabel,
      rightIconType,
      leftIconLabel,
      leftIconType,
      onClickRightIcon,
      onClickLeftIcon,
      placeholder = INITIAL_PLACEHOLDER,
      ...props
    },
    ref,
  ) => {
    const isShowIcon =
      rightIconType !== 'delete' || (rightIconType === 'delete' && props.value)

    return (
      <div className="w-full relative">
        {leftIconType && onClickLeftIcon && (
          <AccessibleIconButton
            label={leftIconLabel ?? ''}
            className="absolute top-1/2 -translate-y-1/2 left-4"
            onClick={onClickLeftIcon}
            icon={{ type: 'caretLeft', size: 'lg', 'aria-hidden': true }}
          />
        )}
        <input
          {...props}
          className={cn(
            SearchInputVariants({ variant, size }),
            className,
            leftIconType ? 'pl-[50px]' : '',
          )}
          ref={ref}
          placeholder={placeholder}
        />
        {isShowIcon && (
          <AccessibleIconButton
            className="absolute top-1/2 -translate-y-1/2 right-4"
            label={rightIconLabel}
            onClick={onClickRightIcon}
            icon={{
              type: rightIconType,
              size: 'lg',
              'aria-hidden': 'true',
            }}
          />
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
