import LoadingLottie from '../../../public/lotties/loading.json'
import Lottie from './lottie'

const LoadingIndicator = () => {
  return (
    <div
      role="status"
      className="flex h-dvh w-full flex-col items-center justify-center gap-[6px] bg-neutral-700"
    >
      <img
        src="/images/loading.png"
        width="64px"
        height="64px"
        alt="보물지도"
      />
      <Lottie animationData={LoadingLottie} className="h-[47px] w-1/3" />
    </div>
  )
}

export default LoadingIndicator
