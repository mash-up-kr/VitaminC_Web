import Lottie from '@/components/common/lottie'

import { memo } from 'react'
import AIRecommendLottie from '../../../public/lotties/ai-recommend.json'

const AiRecommendLottie = () => {
  return (
    <Lottie
      animationData={AIRecommendLottie}
      loading={
        <img src="/images/ai-recommend.png" className="h-[112px] w-[213px]" />
      }
      loop={false}
      className="h-[112px] w-[213px]"
    />
  )
}

export default memo(AiRecommendLottie)
