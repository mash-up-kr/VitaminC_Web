import { forwardRef, useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { AccessibleIconButton } from '@/components'
import { ClassName } from '@/models/interface'
import useWindowSize from '@/hooks/use-window-size'
import { useKakaoMap } from './context'
import GpsMarker from './gps-marker'
import useUserGeoLocation from '@/hooks/use-user-geo-location'

interface GpsButtonProps extends ClassName {
  bottomRef?: RefObject<HTMLDivElement>
}

const DEFAULT_BUTTON_BOTTOM = 16

const GpsButton = forwardRef<HTMLButtonElement, GpsButtonProps>(
  ({ bottomRef }, ref) => {
    const userLocation = useUserGeoLocation()
    const [gpsBottomPosition, setGpsBottomPosition] = useState(
      DEFAULT_BUTTON_BOTTOM,
    )
    const [gpsMode, setGpsMode] = useState(false)
    const { height } = useWindowSize()
    const { map } = useKakaoMap()

    const handleGpsClick = () => {
      if (!map) return

      if (!gpsMode) {
        const location = new window.kakao.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude,
        )
        map.setCenter(location)
      }

      setGpsMode((prev) => !prev)
    }

    useEffect(() => {
      const getGpsButtonPositionY = () => {
        if (bottomRef?.current) {
          setGpsBottomPosition(
            height -
              bottomRef.current.getBoundingClientRect().top +
              DEFAULT_BUTTON_BOTTOM,
          )
          return
        }

        setGpsBottomPosition(DEFAULT_BUTTON_BOTTOM)
      }

      getGpsButtonPositionY()
    }, [bottomRef, height])

    return (
      <>
        {gpsMode && (
          <GpsMarker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          />
        )}
        <AccessibleIconButton
          ref={ref}
          className={`absolute right-5 transition-[bottom] z-10`}
          style={{
            bottom: `${gpsBottomPosition}px`,
          }}
          label={gpsMode ? '내 위치로 이동 취소' : '내 위치로 이동'}
          icon={{
            className: 'w-11 h-11',
            type: gpsMode ? 'locationOn' : 'locationOff',
          }}
          onClick={handleGpsClick}
        />
      </>
    )
  },
)

GpsButton.displayName = 'GpsButton'

export default GpsButton
