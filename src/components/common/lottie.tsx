import dynamic from 'next/dynamic'
import { ClassName } from '@/models/interface'
import type { LottieOptions } from 'lottie-react'

interface LottieProps extends LottieOptions, ClassName {}

export const Lottie = ({
  animationData,
  loop = true,
  className,
  ...props
}: LottieProps) => {
  const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false,
    loading: () => <div className={className} />,
  })

  return (
    <DynamicLottie
      className={className}
      animationData={animationData}
      loop={loop}
      {...props}
    />
  )
}
