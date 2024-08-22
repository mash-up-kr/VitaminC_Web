import LoadingLottie from '../../public/lotties/loading.json'

import { Lottie } from '@/components/common/lottie'

const LoadingIndicator = () => {
  return (
    <div
      role="status"
      className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-700"
    >
      <img src="/images/treasure.png" width="100%" alt="보물지도" />
      <Lottie animationData={LoadingLottie} className="h-[47px] w-1/3" />
    </div>
  )
}

export default LoadingIndicator
