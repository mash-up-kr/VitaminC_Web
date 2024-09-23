import type { ClassName } from '@/models/common'
import type { Chat } from './type'
import cn from '@/utils/cn'
import Typography from '@/components/common/typography'
import { motion } from 'framer-motion'
import AIRecommendPlaceBox from './ai-recommend-place-box'
import { allowUserPositionStorage } from '@/utils/storage'
import Icon from '@/components/common/icon'

interface ChatItemProps extends ClassName {
  chat: Chat
}

export const AISuggestion = ({
  chat,
  isFirst,
  className,
  onClickSuggestion,
}: ChatItemProps & {
  isFirst: boolean
  onClickSuggestion: (suggestion: string) => void
}) => {
  if (chat.type === 'user') return null

  return (
    <motion.li
      className={cn(
        'no-scrollbar flex max-w-[calc(100%+20px)] flex-col gap-4 overflow-x-scroll',
        className,
      )}
      initial={{ bottom: -5, opacity: 0.8 }}
      animate={{ bottom: 0, opacity: 1 }}
    >
      <div className="relative ml-[44px] flex w-fit max-w-[calc(100%-107px)] items-center justify-center rounded-[24px] rounded-tl-[0] bg-purple-400 px-5 py-3">
        {!isFirst && (
          <img
            src="images/ai.png"
            className="absolute left-[-44px] top-0 h-9 w-9"
          />
        )}
        <Typography
          size="body2"
          color="neutral-000"
          className="whitespace-pre-line"
        >
          {chat.value}
        </Typography>
      </div>

      {chat.suggestionPlaces && (
        <ul className="no-scrollbar ml-[44px] mr-[20px] flex gap-4 overflow-x-scroll">
          {chat.suggestionPlaces.map((place) => {
            return (
              <AIRecommendPlaceBox
                key={place.placeId}
                place={place}
                className="h-[250px] w-[260px] min-w-[260px]"
              />
            )
          })}
        </ul>
      )}

      <ul
        className={cn(
          'ml-[44px] flex gap-[6px]',
          chat.suggestionKeywords[0] === '강남에 맛있는 돈까스 식당 추천해줘'
            ? 'flex-col'
            : '',
        )}
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
    </motion.li>
  )
}

export const UserChat = ({ chat, className }: ChatItemProps) => {
  return (
    <motion.li
      className={cn(
        'relative flex max-w-[calc(100%-20px)] items-center justify-center self-end rounded-[24px] rounded-tr-[0] bg-orange-400 px-5 py-3',
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
