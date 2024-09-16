import { useState } from 'react'

import useEventListener from './use-event-listener'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'
import debounce from 'lodash.debounce'

interface Size {
  width: number
  height: number
}

const DEBOUNCE_WAIT = 250

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
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
