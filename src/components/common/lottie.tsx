import lottie, { AnimationItem } from 'lottie-web'
import { memo, useEffect, useRef } from 'react'

import type { ClassName } from '@/models/interface'

interface LottieProps extends ClassName {
  src: string
  loop?: boolean
  autoplay?: boolean
  className?: string
}

const Lottie = memo(
  function Lottie({
    src,
    loop = true,
    autoplay = true,
    className,
  }: LottieProps) {
    const container = useRef<HTMLDivElement | null>(null)
    const player = useRef<AnimationItem | null>(null)
    const [, assetsPath, name] = /(.+)\/(.+)\..+/.exec(src)!

    useEffect(() => {
      if (container.current == null) {
        return
      }

      player.current = lottie.loadAnimation({
        container: container.current,
        loop,
        autoplay,
        renderer: 'svg',
        path: src,
        assetsPath,
        name,
      })

      return () => {
        player.current?.destroy()
      }
    }, [assetsPath, autoplay, loop, name, src])

    return <div className={className} ref={container} />
  },
  (prev, next) => {
    return (
      prev.src === next.src &&
      prev.loop === next.loop &&
      prev.autoplay === next.autoplay
    )
  },
)

export default Lottie
