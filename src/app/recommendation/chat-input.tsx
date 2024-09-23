import SearchInput from '@/components/common/search-input'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface ChatInputProps extends ClassName {
  value: string
  isFinish: boolean
  isLoading: boolean
  onChange: (value: string) => void
  sendChat: VoidFunction
}

const ChatInput = ({
  value,
  isFinish,
  isLoading,
  className,
  onChange,
  sendChat,
}: ChatInputProps) => {
  const disabled = !value || isFinish || isLoading

  return (
    <div
      className={cn(
        'invitation-gradient flex w-full justify-center',
        className,
      )}
    >
      {isFinish ? (
        <div className="flex w-full items-center justify-center rounded-[6px] bg-neutral-600">
          <Typography size="body3" color="neutral-100">
            추천이 종료되었습니다.
          </Typography>
        </div>
      ) : (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
            sendChat()
          }}
        >
          <SearchInput
            value={value}
            placeholder="직접 입력하려면 여기에 입력해주세요"
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
      )}
    </div>
  )
}

export default ChatInput
