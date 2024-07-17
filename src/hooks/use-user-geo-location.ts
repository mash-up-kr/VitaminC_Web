import { useState } from 'react'

import type { LocationType } from '@/types/map/map'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

/**
 * navigator.geolocation를 사용할 수 없거나 위치 정보 공유를 거절하는 경우
 * 사용하는 위도, 경도값 서울 중구로 설정함
 */
const INITIAL_LATITUDE_LONGITUDE = {
  latitude: 37.561,
  longitude: 126.9996,
}

const useUserGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>(
    INITIAL_LATITUDE_LONGITUDE,
  )

  useIsomorphicLayoutEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude })
        },
        () => setLocation(INITIAL_LATITUDE_LONGITUDE),
      )
    } catch (err) {
      setLocation(INITIAL_LATITUDE_LONGITUDE)
    }
  }, [])

  return location
}

export default useUserGeoLocation
