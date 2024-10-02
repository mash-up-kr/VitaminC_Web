import { ReactElement } from 'react'
import dynamic from 'next/dynamic'

import type { LottieOptions } from 'lottie-react'

import type { ClassName } from '@/models/common'

interface LottieProps extends LottieOptions, ClassName {
  loading?: ReactElement
}

const Lottie = ({
  animationData,
  loop = true,
  loading,
  className,
  ...props
}: LottieProps) => {
  const DynamicLottie = dynamic(() => import('lottie-react'), {
    ssr: false,
    loading: () => loading || <div className={className} />,
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
