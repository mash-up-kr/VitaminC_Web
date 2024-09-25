import type { TextareaHTMLAttributes } from 'react'
import { forwardRef, useCallback, useEffect, useRef } from 'react'

import AccessibleIconButton from './accessible-icon-button'
import Icon from './icon'
import Typography from './typography'

import cn from '@/utils/cn'
import { countCharacters } from '@/utils/string'
import { mergeRefs } from '@/utils/merge-refs'

interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {
  allowOverflowTextarea?: boolean
  value: string
  onChange: (value: string) => void
}

const MIN_TEXTAREA_HEIGHT = 22

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      placeholder,
      value,
      onChange,
      minLength = 0,
      maxLength = 10,
      ...props
    },
    ref,
  ) => {
    const { num } = countCharacters(value)
    const errorMinLength = minLength && value && num < minLength
    const errorMaxLength = maxLength && num > maxLength
    const error = errorMinLength || errorMaxLength

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const initializeSize = () => {
      if (!textareaRef.current) return
      textareaRef.current.style.height = '0px'
    }

    const autoResize = useCallback(() => {
      if (!textareaRef.current) return

      initializeSize()

      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }, [])

    useEffect(() => {
      autoResize()
    }, [autoResize])

    return (
      <div className="w-full space-y-2">
        <div className="flex w-full items-center space-x-4 border-b-2 border-orange-400 pb-2">
          <textarea
            {...props}
            className={cn(
              'flex w-full items-center border-solid bg-transparent text-body1 text-neutral-100 placeholder-neutral-400 outline-none outline-offset-0',
              className,
            )}
            style={{
              minHeight: MIN_TEXTAREA_HEIGHT,
              resize: 'none',
            }}
            ref={mergeRefs([textareaRef, ref])}
            placeholder={placeholder ?? `최대 ${maxLength}자 입력`}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              autoResize()
            }}
          />

          <AccessibleIconButton
            label="초기화"
            onClick={() => {
              onChange('')
              initializeSize()
            }}
            icon={{
              type: 'delete',
              size: 'md',
              'aria-hidden': true,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          {error && (
            <div className="flex gap-1">
              <Icon type="infoCircle" fill="orange-400" aria-hidden />
              <Typography size="body3" className="text-orange-400">
                {errorMinLength
                  ? `최소 ${minLength}자 이상 입력해야 해요`
                  : errorMaxLength &&
                    `최대 ${maxLength}자까지 입력할 수 있어요.`}
              </Typography>
            </div>
          )}
          <Typography size="body3" className="flex-1 text-right">
            <span
              className={cn(error ? 'text-orange-400' : 'text-neutral-200')}
            >
              {num}
            </span>
            <span className="text-neutral-200">/{maxLength}자</span>
          </Typography>
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
