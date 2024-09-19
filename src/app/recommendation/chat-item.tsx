import type { ClassName } from '@/models/common'
import type { Chat } from './type'
import cn from '@/utils/cn'
import Typography from '@/components/common/typography'
import { motion } from 'framer-motion'
import AIRecommendPlaceBox from './ai-recommend-place-box'

interface ChatItemProps extends ClassName {
  chat: Chat
}

export const AISuggestion = ({
  chat,
  className,
  onClickSuggestion,
}: ChatItemProps & {
  onClickSuggestion: (suggestion: string) => void
}) => {
  if (chat.type === 'user') return null

  return (
    <motion.li
      className={cn(
        'flex flex-col gap-4 overflow-x-scroll no-scrollbar max-w-[calc(100%+20px)]',
        className,
      )}
      initial={{ bottom: -5, opacity: 0.8 }}
      animate={{ bottom: 0, opacity: 1 }}
    >
      <div className="w-fit flex justify-center items-center ml-[44px] px-5 py-3 bg-purple-400 rounded-[24px] rounded-tl-[0] relative">
        <img
          src="images/ai.png"
          className="w-9 h-9 absolute top-0 left-[-44px]"
        />
        <Typography size="body2" color="neutral-000">
          {chat.value}
        </Typography>
      </div>

      {chat.suggestionPlaces && (
        <ul className="flex overflow-x-scroll no-scrollbar gap-4 ml-[44px]">
          {chat.suggestionPlaces.map((place) => {
            return (
              <AIRecommendPlaceBox
                key={place.placeId}
                place={place}
                className="w-[260px] min-w-[260px] h-[250px]"
              />
            )
          })}
        </ul>
      )}

      <ul className="flex gap-[6px] flex-wrap ml-[44px]">
        {chat.suggestionKeywords.map((suggestion) => (
          <li
            key={suggestion}
            className="w-fit rounded-full border border-neutral-500 bg-neutral-600"
            onClick={() => onClickSuggestion(suggestion)}
          >
            <button type="button" className="w-full h-full py-2 px-4">
              <Typography size="body3" color="neutral-000">
                {suggestion}
              </Typography>
            </button>
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

export const UserChat = ({ chat, className }: ChatItemProps) => {
  return (
    <motion.li
      className={cn(
        'relative flex justify-center items-center px-5 py-3 bg-orange-400 rounded-[24px] rounded-tr-[0] self-end',
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
