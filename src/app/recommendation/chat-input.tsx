import SearchInput from '@/components/common/search-input'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface ChatInputProps extends ClassName {
  value: string
  isLimitReached: boolean
  isFinish: boolean
  isFetching: boolean
  onChange: (value: string) => void
  sendChat: VoidFunction
}

const ChatInput = ({
  value,
  isLimitReached,
  isFinish,
  isFetching,
  className,
  onChange,
  sendChat,
}: ChatInputProps) => {
  const disabled = !value || isFinish || isFetching || isLimitReached
  const showInput = !isFinish && !isLimitReached

  return (
    <div className={cn('flex w-full justify-center', className)}>
      {showInput ? (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
            sendChat()
          }}
        >
          <SearchInput
            value={value}
            placeholder="원하는 맛집의 위치나 특징을 적어주세요."
            onChange={(e) => onChange(e.target.value)}
            rightIcon={{
              icon: {
                type: 'paperPlaneTilt',
                fill: disabled ? 'neutral-300' : 'neutral-000',
                size: 'xl',
                className: 'transition-colors',
              },
              type: 'submit',
              disabled,
              label: '인공지능에게 물어보기',
            }}
          />
        </form>
      ) : (
        <div className="flex h-12 w-full items-center justify-center rounded-[6px] bg-neutral-600">
          <Typography size="body3" color="neutral-100">
            {isFinish
              ? '다른 질문을 하려면 [처음으로]를 눌러주세요.'
              : '추천이 종료되었습니다.'}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default ChatInput
