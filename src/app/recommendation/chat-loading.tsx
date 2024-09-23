import Typography from '@/components/common/typography'
import ChatLoadingDot from './chat-loading-dot'

const ChatLoading = () => {
  return (
    <div className="relative ml-[44px] flex w-fit items-center justify-center rounded-[24px] rounded-tl-[0] bg-purple-400 px-5 py-3">
      <img
        src="images/ai.png"
        className="absolute left-[-44px] top-0 h-9 w-9"
      />
      <div className="flex items-center gap-[10px]">
        <Typography size="body2" color="neutral-000">
          탐색 중
        </Typography>
        <ChatLoadingDot />
      </div>
    </div>
  )
}

export default ChatLoading
