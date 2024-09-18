import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

import AccessibleIconButton from './accessible-icon-button'
import Icon from './icon'
import Typography from './typography'

import cn from '@/utils/cn'
import { countCharacters } from '@/utils/string'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, value, onChange, minLength = 0, maxLength = 10, ...props },
    ref,
  ) => {
    const { num, offset } = countCharacters(value)
    const errorMinLength = minLength && value && num < minLength
    const errorMaxLength = maxLength && num > maxLength
    const error = errorMinLength || errorMaxLength

    return (
      <div className="relative w-full">
        <div className="relative w-full">
          <input
            {...props}
            className={cn(
              `placeholder-center flex h-[54px] w-full items-center rounded-full border-2 border-solid border-orange-300 bg-transparent px-5 text-h1 leading-none text-orange-300 placeholder-neutral-400 caret-orange-300 outline-none outline-offset-0 placeholder:text-[20px] placeholder:font-normal`,
              error && 'border-orange-400 text-orange-400',
            )}
            ref={ref}
            placeholder={placeholder ?? `최대 ${maxLength}글자`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...(maxLength && { maxLength: maxLength + offset })}
          />

          <AccessibleIconButton
            className="absolute right-4 top-1/2 -translate-y-1/2"
            label="초기화"
            onClick={() => onChange('')}
            icon={{
              type: error ? 'deleteOrange400' : 'deleteOrange300',
              size: 'md',
              'aria-hidden': true,
            }}
          />
        </div>

        {error && (
          <div className="mt-1 flex gap-1">
            <Icon type="infoCircle" fill="orange-400" aria-hidden />
            <Typography size="body3" className="text-orange-400">
              {errorMinLength
                ? `최소 ${minLength}자 이상 입력해야 해요`
                : errorMaxLength && `최대 ${maxLength}자까지 입력할 수 있어요.`}
            </Typography>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
