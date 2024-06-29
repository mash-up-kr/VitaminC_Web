import { InputHTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'

const SearchInputVariants = cva<{
  variant: Record<'outlined' | 'filled', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(`leading-none caret-main-orange rounded-md placeholder:text-neutral-400`, {
  variants: {
    variant: {
      outlined: 'border border-solid border-neutral-400 bg-neutral-800',
      filled:
        'bg-neutral-600 outline-none outline-offset-0 focus:outline-1 focus:outline-neutral-300',
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
})

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof SearchInputVariants> {
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

const INITIAL_PLACEHOLDER = '원하는 장소를 검색해 주세요.'

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    { variant, size, className, placeholder = INITIAL_PLACEHOLDER, ...props },
    ref,
  ) => {
    return (
      <input
        {...props}
        className={cn(SearchInputVariants({ variant, size }), className)}
        ref={ref}
        placeholder={placeholder}
      />
    )
  },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
