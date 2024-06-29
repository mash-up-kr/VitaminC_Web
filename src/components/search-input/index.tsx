import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'

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
  iconType?: 'reset' | 'search'
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  onReset?: () => void
}

const INITIAL_PLACEHOLDER = '원하는 장소를 검색해 주세요.'

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      variant,
      size,
      className,
      onReset,
      iconType = 'reset',
      placeholder = INITIAL_PLACEHOLDER,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full relative">
        <input
          {...props}
          className={cn(SearchInputVariants({ variant, size }), className)}
          ref={ref}
          placeholder={placeholder}
        />
        {/* TODO: ClearIcon */}
        {iconType === 'reset' && onReset && props.value ? (
          <span className="absolute top=1/2 translate-y-1/2 right-4">X</span>
        ) : null}
        {/* TODO: SearchIcon */}
        {iconType === 'search' ? (
          <span className="absolute top=1/2 translate-y-1/2 right-4">?</span>
        ) : null}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
