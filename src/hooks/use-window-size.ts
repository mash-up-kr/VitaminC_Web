import { useState } from 'react'
import useEventListener from './use-event-listener'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

interface Size {
  width: number
  height: number
}

// iPhone 6 TODO: viewport 크기 세분화해서 파일로 관리
const MIN_WIDTH = 320
const MIN_HEIGHT = 568

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEventListener({ type: 'resize', listener: handleResize })

  useIsomorphicLayoutEffect(() => {
    handleResize()
  }, [])

  return windowSize
}

export default useWindowSize
