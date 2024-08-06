import Lottie from './common/lottie'

const LoadingIndicator = () => {
  return (
    <div
      role="status"
      className="w-full h-dvh flex flex-col justify-center items-center gap-3.5"
    >
      <img src="/images/treasure.png" width="100%" alt="보물지도" />
      <Lottie src="/lotties/loading.json" className="w-1/3" />
    </div>
  )
}

export default LoadingIndicator
