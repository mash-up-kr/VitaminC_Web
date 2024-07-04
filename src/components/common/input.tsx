import { InputHTMLAttributes, forwardRef } from 'react'

import { Icon, Typography } from '@/components'
import AccessibleIconButton from '@/components/accessible-icon-button'
import cn from '@/utils/cn'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = '최대 6글자', value, onChange, maxLength = 6, ...props },
    ref,
  ) => {
    // 이모지(e.g. 😀)를 String: length로 계산하면 1보다 큰 값이 나오므로 길이 보정
    const utf16Length = value.length
    const numOfCharacters = Array.from(value).length
    const error = numOfCharacters > maxLength
    const offset = utf16Length - numOfCharacters

    return (
      <div className="w-full relative">
        <div className="w-full relative">
          <input
            {...props}
            className={cn(
              'w-full h-[54px] leading-none text-h1 placeholder:text-[20px] placeholder:font-normal text-orange-300 placeholder-neutral-400 caret-orange-300 border-2 border-solid border-orange-300 rounded-full outline-none outline-offset-0 px-5 bg-transparent',
              error && 'text-orange-400 border-orange-400',
            )}
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength + offset}
          />

          <AccessibleIconButton
            className="absolute top-1/2 -translate-y-1/2 right-4"
            label={'초기화'}
            onClick={() => onChange('')}
            icon={{
              type: !error ? 'deleteOrange300' : 'deleteOrange400',
              'aria-hidden': true,
              className: 'w-4 h-4',
            }}
          />
        </div>

        {error && (
          <div className="mt-1 flex gap-1">
            <Icon type="infoCircle" fill="orange-400" aria-hidden />
            <Typography size="body3" className="text-orange-400">
              최대 {maxLength}자까지 입력할 수 있어요.
            </Typography>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
