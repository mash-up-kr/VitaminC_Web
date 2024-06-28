import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
