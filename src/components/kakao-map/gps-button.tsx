import { useState } from 'react'

import { useKakaoMap } from './context'
import GPSMarker from './gps-marker'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { getCorners } from '@/utils/map'
import { mapBoundSessionStorage } from '@/utils/storage'
import { notify } from '../common/custom-toast'

const GPSButton = () => {
  const { userLocation, allowLocation, handleUserLocation } =
    useUserGeoLocation()
  const [gpsMode, setGpsMode] = useState(false)
  const { map } = useKakaoMap()

  const handleGpsClick = () => {
    if (!map) return

    if (!allowLocation) {
      const isAllowLocation = handleUserLocation({
        onError: () => {
          notify.error('위치 권한을 허용해 주세요.')
        },
      })
      if (!isAllowLocation) return
    }

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

  return (
    <>
      {gpsMode && (
        <GPSMarker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      )}
      <AccessibleIconButton
        className="h-11 w-11"
        label={gpsMode ? '내 위치로 이동 취소' : '내 위치로 이동'}
        icon={{
          className: 'w-11 h-11',
          size: 'xl',
          type: gpsMode ? 'locationOn' : 'locationOff',
        }}
        onClick={handleGpsClick}
      />
    </>
  )
}

export default GPSButton
