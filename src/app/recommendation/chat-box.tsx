import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import type { Chat } from './type'
import { AISuggestion, UserChat } from './chat-item'

interface ChatBoxProps extends ClassName {
  chats: Chat[]
  onClickSuggestion: (suggestion: string) => void
}

const ChatBox = ({ chats, className, onClickSuggestion }: ChatBoxProps) => {
  return (
    <section className={cn('h-full w-full', className)}>
      <ul className="flex flex-col gap-6">
        {chats.map((chat, index) => {
          if (chat.type === 'gpt-typing' || chat.type === 'gpt-stream') {
            return (
              <AISuggestion
                key={`${chat.type}-${index}`}
                chat={chat}
                type={chat.type}
                isFirst={index === 0}
                onClickSuggestion={(suggestion) => {
                  onClickSuggestion(suggestion)
                }}
              />
            )
          }
          return <UserChat key={`${chat.type}-${index}`} chat={chat} />
        })}
      </ul>
    </section>
  )
}

export default ChatBox
