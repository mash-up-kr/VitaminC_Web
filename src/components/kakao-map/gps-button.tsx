import { useEffect, useState } from 'react'

import { useKakaoMap } from './context'
import GpsMarker from './gps-marker'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import useWindowSize from '@/hooks/use-window-size'
import { mapBoundSessionStorage } from '@/utils/storage'
import { getCorners } from '@/utils/map'

const BUTTON_OFFSET_Y = 16
const BUTTON_HEIGHT = 11
interface GpsButtonProps {
  topOfBottomBounds: number
}

const GpsButton = ({ topOfBottomBounds }: GpsButtonProps) => {
  const userLocation = useUserGeoLocation()
  const [gpsBottomPositionY, setGpsBottomPositionY] = useState(BUTTON_OFFSET_Y)
  const [gpsMode, setGpsMode] = useState(false)
  const { height: windowHeight } = useWindowSize()
  const { map } = useKakaoMap()

  const handleGpsClick = () => {
    if (!map) return

    if (!gpsMode) {
      const location = new window.kakao.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude,
      )
      map.setCenter(location)
      if (map.getBounds()) {
        const { southEast, northWest } = getCorners(map.getBounds())

        mapBoundSessionStorage.set({
          latitude1: northWest.latitude,
          longitude1: northWest.longitude,
          latitude2: southEast.latitude,
          longitude2: southEast.longitude,
        })
      }
    }

    setGpsMode((prev) => !prev)
  }

  useEffect(() => {
    if (topOfBottomBounds) {
      setGpsBottomPositionY(
        Math.min(
          windowHeight - topOfBottomBounds + BUTTON_OFFSET_Y,
          (windowHeight * 3) / 4 - BUTTON_OFFSET_Y - BUTTON_HEIGHT / 2,
        ),
      )
    } else {
      setGpsBottomPositionY(BUTTON_OFFSET_Y)
    }
  }, [topOfBottomBounds, windowHeight])

  return (
    <>
      {gpsMode && (
        <GpsMarker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      )}
      <AccessibleIconButton
        className={`absolute right-5 z-10 transition-all duration-300 ease-in-out`}
        style={{
          bottom: `${gpsBottomPositionY}px`,
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
}

export default GpsButton
