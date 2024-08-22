import dynamic from 'next/dynamic'

import type { LottieOptions } from 'lottie-react'

import type { ClassName } from '@/models/interface'

interface LottieProps extends LottieOptions, ClassName {}

const Lottie = ({
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

export default Lottie
