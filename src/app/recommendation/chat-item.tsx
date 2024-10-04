import { motion } from 'framer-motion'
import type { ClassName } from '@/models/common'
import type { Chat } from './type'
import cn from '@/utils/cn'
import Typography from '@/components/common/typography'
import AIRecommendPlaceBox from './ai-recommend-place-box'
import { allowUserPositionStorage } from '@/utils/storage'
import Icon from '@/components/common/icon'
import useTypewriter from './use-typewriter'
import ChatLoadingDot from './chat-loading-dot'
import { useEffect, useRef } from 'react'

interface ChatItemProps extends ClassName {
  chat: Chat
}

export const AISuggestion = ({
  chat,
  isFirst,
  isLast,
  type,
  className,
  onClickSuggestion,
}: ChatItemProps & {
  isFirst: boolean
  isLast: boolean
  type: 'gpt-typing' | 'gpt-stream'
  onClickSuggestion: (suggestion: string) => void
}) => {
  const { typingText, typingStart, typingComplete } = useTypewriter(
    chat.value,
    100,
    type === 'gpt-typing' && isLast,
  )

  const bottomChat = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    bottomChat.current?.scrollIntoView({ behavior: 'smooth' })
  }, [typingStart, typingComplete])

  if (chat.type === 'user') return null

  const isLoading =
    (type === 'gpt-typing' && !typingStart) ||
    (type === 'gpt-stream' && !chat.value)

  return (
    <motion.li
      className={cn(
        'no-scrollbar ml-5 flex max-w-[calc(100%+20px)] flex-col gap-4 overflow-x-scroll',
        className,
      )}
      initial={{ bottom: -5, opacity: 0.8 }}
      animate={{ bottom: 0, opacity: 1 }}
    >
      <div className="relative ml-[44px] flex min-h-[44px] w-fit max-w-[calc(100%-107px)] items-center justify-center rounded-[24px] rounded-tl-[0] bg-purple-400 px-5 py-3">
        {!isFirst && (
          <img
            src="images/ai.png"
            className="absolute left-[-44px] top-0 h-9 w-9"
          />
        )}
        {isLoading ? (
          <div className="flex items-center gap-[10px]">
            {type === 'gpt-stream' && (
              <Typography size="body2" color="neutral-000">
                탐색 중
              </Typography>
            )}
            <ChatLoadingDot />
          </div>
        ) : (
          <Typography
            size="body2"
            color="neutral-000"
            className="whitespace-pre-line"
          >
            {chat.type === 'gpt-typing' && isLast ? (
              <span ref={bottomChat}>{typingText}</span>
            ) : (
              <span>{chat.value}</span>
            )}
          </Typography>
        )}
      </div>

      {chat.suggestionPlaces && (
        <ul className="no-scrollbar ml-[44px] flex gap-4 overflow-x-scroll">
          {chat.suggestionPlaces.map((place) => {
            return (
              <AIRecommendPlaceBox
                key={place.id}
                place={place}
                className="h-fit w-[260px] min-w-[260px] last:mr-5"
              />
            )
          })}
        </ul>
      )}

      {typingComplete && chat.suggestionKeywords.length > 0 && (
        <ul
          className={cn(
            'ml-[44px] flex gap-[6px]',
            isLast && 'animate-fadein transition-all',
            chat.suggestionKeywords[0] === '강남에 맛있는 돈까스 식당 추천해줘'
              ? 'flex-col'
              : '',
          )}
          style={{ minHeight: chat.suggestionKeywords.length * 35 }}
        >
          {chat.suggestionKeywords.map((suggestion) => {
            if (
              suggestion === '위치권한 허용하기' &&
              !!allowUserPositionStorage.getValueOrNull()
            ) {
              return (
                <li
                  key={suggestion}
                  className="flex w-fit items-center justify-center gap-2 rounded-full bg-neutral-600 px-4 py-2 shadow-[inset_0_0_0_1px] shadow-neutral-500"
                  onClick={() => onClickSuggestion(suggestion)}
                >
                  <Typography size="body3" color="neutral-300">
                    위치권한 허용하기
                  </Typography>
                  <Icon
                    type="check"
                    className="h-[18px] w-[18px]"
                    stroke="neutral-300"
                  />
                </li>
              )
            }

            return (
              <li
                key={suggestion}
                className="w-fit rounded-full border border-neutral-500 bg-neutral-600"
                onClick={() => onClickSuggestion(suggestion)}
              >
                <button type="button" className="h-full w-full px-4 py-2">
                  <Typography size="body3" color="neutral-000">
                    {suggestion}
                  </Typography>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </motion.li>
  )
}

export const UserChat = ({ chat, className }: ChatItemProps) => {
  return (
    <motion.li
      className={cn(
        'relative mr-5 flex max-w-[calc(100%-20px)] items-center justify-center self-end rounded-[24px] rounded-tr-[0] bg-orange-400 px-5 py-3',
        className,
      )}
      initial={{ bottom: -5, opacity: 0.8 }}
      animate={{ bottom: 0, opacity: 1 }}
    >
      <Typography size="body2" color="neutral-000">
        {chat.value}
      </Typography>
    </motion.li>
  )
}
