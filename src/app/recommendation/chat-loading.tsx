import Typography from '@/components/common/typography'
import ChatLoadingDot from './chat-loading-dot'

const ChatLoading = () => {
  return (
    <div className="w-fit flex justify-center items-center ml-[44px] px-5 py-3 bg-purple-400 rounded-[24px] rounded-tl-[0] relative">
      <img
        src="images/ai.png"
        className="w-9 h-9 absolute top-0 left-[-44px]"
      />
      <div className="flex gap-[10px] items-center">
        <Typography size="body2" color="neutral-000">
          탐색 중
        </Typography>
        <ChatLoadingDot />
      </div>
    </div>
  )
}

export default ChatLoading
