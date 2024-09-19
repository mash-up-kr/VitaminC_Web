import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import type { Chat } from './type'
import { AISuggestion, UserChat } from './chat-item'
import ChatLoading from './chat-loading'
import { notify } from '@/components/common/custom-toast'

interface ChatBoxProps extends ClassName {
  chats: Chat[]
  isLoading: boolean
  isFinish: boolean
  onClickSuggestion: (suggestion: string) => void
}

const ChatBox = ({
  chats,
  isLoading,
  isFinish,
  className,
  onClickSuggestion,
}: ChatBoxProps) => {
  return (
    <section className={cn('h-full w-full', className)}>
      <ul className="flex flex-col gap-6">
        {chats.map((chat, index) => {
          if (chat.type === 'gpt') {
            return (
              <AISuggestion
                key={chat.value}
                chat={chat}
                className="w-fit"
                isFirst={index === 0}
                onClickSuggestion={(suggestion) => {
                  if (isFinish && suggestion !== '지도 홈으로') {
                    notify.error('채팅이 종료되었습니다.')
                    return
                  }
                  onClickSuggestion(suggestion)
                }}
              />
            )
          }
          return <UserChat key={chat.value} chat={chat} className="w-fit" />
        })}

        {isLoading && <ChatLoading />}
      </ul>
    </section>
  )
}

export default ChatBox
