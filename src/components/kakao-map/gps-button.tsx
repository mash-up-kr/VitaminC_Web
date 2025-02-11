import { useState } from 'react'

import { useKakaoMap } from './context'
import GPSMarker from './gps-marker'

import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { notify } from '../common/custom-toast'
import Icon from '../common/icon'
import useMapBound from '@/hooks/use-map-bound'

const GPSButton = () => {
  const { userLocation, allowLocation, handleUserLocation } =
    useUserGeoLocation()
  const [gpsMode, setGpsMode] = useState(false)
  const { map } = useKakaoMap()
  const { updateMapBound } = useMapBound(map)

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
      updateMapBound()
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
