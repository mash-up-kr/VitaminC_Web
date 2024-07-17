import { forwardRef, useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { AccessibleIconButton } from '@/components'
import { ClassName } from '@/models/interface'
import useWindowSize from '@/hooks/use-window-size'

interface GpsButtonProps extends ClassName {
  gpsMode: boolean
  bottomRef?: RefObject<HTMLDivElement>
  onClickGps: () => void
}

const GpsButton = forwardRef<HTMLButtonElement, GpsButtonProps>(
  ({ gpsMode, bottomRef, onClickGps }, ref) => {
    const [gpsBottomPosition, setGpsBottomPosition] = useState(16)
    const { height } = useWindowSize()

    useEffect(() => {
      const getGpsButtonPositionY = () => {
        if (bottomRef?.current) {
          setGpsBottomPosition(
            height - bottomRef.current.getBoundingClientRect().top + 16,
          )
          return
        }

        setGpsBottomPosition(16)
      }

      getGpsButtonPositionY()
    }, [bottomRef?.current, height])

    return (
      <AccessibleIconButton
        ref={ref}
        className={`absolute right-5 transition-all z-10`}
        style={{
          bottom: `${gpsBottomPosition}px`,
        }}
        label={gpsMode ? '내 위치로 이동 취소' : '내 위치로 이동'}
        icon={{
          className: 'w-11 h-11',
          type: gpsMode ? 'locationOn' : 'locationOff',
        }}
        onClick={onClickGps}
      />
    )
  },
)

GpsButton.displayName = 'GpsButton'

export default GpsButton
