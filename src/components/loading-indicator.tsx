import { Lottie } from '@/components/common/lottie'
import LoadingLottie from '../../public/lotties/loading.json'

const LoadingIndicator = () => {
  return (
    <div
      role="status"
      className="bg-neutral-700 w-full h-dvh flex flex-col justify-center items-center"
    >
      <img src="/images/treasure.png" width="100%" alt="보물지도" />
      <Lottie animationData={LoadingLottie} className="w-1/3 h-[47px]" />
    </div>
  )
}

export default LoadingIndicator
