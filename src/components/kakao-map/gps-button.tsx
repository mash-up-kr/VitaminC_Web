import { useState } from 'react'

import { useKakaoMap } from './context'
import GPSMarker from './gps-marker'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { getCorners } from '@/utils/map'
import { mapBoundSessionStorage } from '@/utils/storage'
import { notify } from '../common/custom-toast'
import Icon from '../common/icon'

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
      <button
        className={`flex h-11 w-11 items-center justify-center rounded-full ${gpsMode ? 'bg-orange-400' : 'bg-neutral-900'}`}
        onClick={handleGpsClick}
      >
        <Icon type="location" size="xl" />
      </button>
    </>
  )
}

export default GPSButton
