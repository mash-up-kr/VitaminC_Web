import { useCallback, useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

import type { LocationType } from '@/models/kakao-map'
import { allowUserPositionStorage } from '@/utils/storage'

/**
 * navigator.geolocation를 사용할 수 없거나 위치 정보 공유를 거절하는 경우
 * 사용하는 위도, 경도값 서울 강남으로 설정함
 */
// 강남: 37.49878379556736 127.02766127247847
// 판교: 37.3947948422615 127.110989722725
// 구름: 37.4024068885376 127.101100614005
// 선릉: 37.5045028775835 127.048942471228
const INITIAL_LATITUDE_LONGITUDE = {
  latitude: 37.49878379556736,
  longitude: 127.02766127247847,
}

const useUserGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>(
    INITIAL_LATITUDE_LONGITUDE,
  )
  const [allowLocation, setAllowLocation] = useState(false)

  const handleUserLocation = useCallback(
    (options?: { onError: (error: GeolocationPositionError) => void }) => {
      let isAllow = false
      try {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            allowUserPositionStorage.set(true)
            setLocation({ latitude, longitude })
            setAllowLocation(true)
            isAllow = true
          },
          (err) => {
            options?.onError(err)
            setAllowLocation(false)
            setLocation(INITIAL_LATITUDE_LONGITUDE)
          },
        )
      } catch (err) {
        allowUserPositionStorage.set(false)
        setLocation(INITIAL_LATITUDE_LONGITUDE)
        setAllowLocation(false)
      }
      return isAllow
    },
    [],
  )

  useIsomorphicLayoutEffect(() => {
    handleUserLocation()
  }, [])

  return { userLocation: location, allowLocation, handleUserLocation }
}

export default useUserGeoLocation
