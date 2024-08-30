import { useState } from 'react'

import useEventListener from './use-event-listener'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'
import debounce from 'lodash.debounce'

interface Size {
  width: number
  height: number
}

// iPhone 6 TODO: viewport 크기 세분화해서 파일로 관리
const MIN_WIDTH = 320
const MIN_HEIGHT = 568

const DEBOUNCE_WAIT = 250

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

  const debouncedHandleResize = () => {
    debounce(() => {
      handleResize()
    }, DEBOUNCE_WAIT)()
  }

  useEventListener({ type: 'resize', listener: debouncedHandleResize })

  useIsomorphicLayoutEffect(() => {
    handleResize()
  }, [])

  return windowSize
}

export default useWindowSize
