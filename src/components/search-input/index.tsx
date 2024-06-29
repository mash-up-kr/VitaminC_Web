import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import { AccessibleIconButton } from '..'
import { IconKey } from '../common/icon'

const SearchInputVariants = cva<{
  prevButton: Record<'on' | 'off', string>
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
      prevButton: {
        on: 'pl-[50px]',
        off: '',
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
  iconLabel: string
  iconType: IconKey
  onClickIcon: () => void
  prevButton?: 'on' | 'off'
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  onClickPrev?: () => null
}

const INITIAL_PLACEHOLDER = '원하는 장소를 검색해 주세요.'

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      variant,
      size,
      className,
      iconLabel,
      iconType,
      onClickIcon,
      onClickPrev,
      prevButton = 'off',
      placeholder = INITIAL_PLACEHOLDER,
      ...props
    },
    ref,
  ) => {
    const isShowIcon =
      iconType !== 'delete' || (iconType === 'delete' && props.value)

    return (
      <div className="w-full relative">
        {prevButton === 'on' && onClickPrev && (
          <AccessibleIconButton
            label="뒤로 가기"
            className="absolute top-1/2 -translate-y-1/2 left-4"
            onClick={onClickPrev}
            icon={{ type: 'caretLeft', size: 'lg', 'aria-hidden': true }}
          />
        )}
        <input
          {...props}
          className={cn(
            SearchInputVariants({ prevButton, variant, size }),
            className,
          )}
          ref={ref}
          placeholder={placeholder}
        />
        {isShowIcon && (
          <AccessibleIconButton
            className="absolute top-1/2 -translate-y-1/2 right-4"
            label={iconLabel}
            onClick={onClickIcon}
            icon={{
              type: iconType,
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
