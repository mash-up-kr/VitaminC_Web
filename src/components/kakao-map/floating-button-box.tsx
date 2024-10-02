import useWindowSize from '@/hooks/use-window-size'
import { useEffect, useState } from 'react'
import GPSButton from './gps-button'
import AIRecommendButton from './ai-recommend-button'

const BUTTON_OFFSET_Y = 16
const BUTTON_HEIGHT = 11

interface FloatingButtonBoxProps {
  topOfBottomBounds: number
}

const FloatingButtonBox = ({ topOfBottomBounds }: FloatingButtonBoxProps) => {
  const [bottomPositionY, setBottomPositionY] = useState(BUTTON_OFFSET_Y)
  const { height: windowHeight } = useWindowSize()

  useEffect(() => {
    if (topOfBottomBounds) {
      setBottomPositionY(
        Math.min(
          windowHeight - topOfBottomBounds + BUTTON_OFFSET_Y,
          (windowHeight * 3) / 4 - BUTTON_OFFSET_Y - BUTTON_HEIGHT / 2,
        ),
      )
    } else {
      setBottomPositionY(BUTTON_OFFSET_Y)
    }
  }, [topOfBottomBounds, windowHeight])
  return (
    <div
      className={`absolute right-5 z-10 flex flex-col items-end gap-2.5 transition-all duration-300 ease-in-out`}
      style={{
        bottom: `${bottomPositionY}px`,
      }}
    >
      <GPSButton />
      <AIRecommendButton />
    </div>
  )
}

export default FloatingButtonBox
