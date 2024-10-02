import { useState } from 'react'
import Icon from '../common/icon'
import Typography from '../common/typography'
import GptIntroModal from './gpt-intro-modal'
import useSafeRouter from '@/hooks/use-safe-router'

const AIRecommendButton = () => {
  const router = useSafeRouter()
  const [isOpenGptIntro, setIsOpenGptIntro] = useState(false)

  return (
    <>
      <button
        className="animate-expand relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#E5684C] to-[#5D5FEF] p-[1px]"
        onClick={() => setIsOpenGptIntro(true)}
      >
        <div className="flex h-full w-full items-center gap-2 overflow-hidden rounded-full bg-neutral-800 p-2.5 pl-[9px]">
          <Icon type="gradientLogo" size="xl" className="shrink-0" />
          <Typography
            size="h5"
            className="text-nowrap bg-gradient-to-r from-[#FBD5CD] to-[#CDCDFA] bg-clip-text text-transparent"
          >
            AI 맛집 추천 받기
          </Typography>
        </div>
      </button>
      {isOpenGptIntro && (
        <GptIntroModal
          isOpen={isOpenGptIntro}
          confirmText="AI 맛집 추천받기"
          onConfirm={() => router.push('/recommendation')}
          onClose={() => setIsOpenGptIntro(false)}
        />
      )}
    </>
  )
}

export default AIRecommendButton
