import { useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

import type { LocationType } from '@/models/kakao-map'
import { allowUserPositionStorage } from '@/utils/storage'

/**
 * navigator.geolocation를 사용할 수 없거나 위치 정보 공유를 거절하는 경우
 * 사용하는 위도, 경도값 서울 강남으로 설정함
 */
// 37.49878379556736 127.02766127247847
const INITIAL_LATITUDE_LONGITUDE = {
  latitude: 37.49878379556736,
  longitude: 127.02766127247847,
}

const useUserGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>(
    INITIAL_LATITUDE_LONGITUDE,
  )

  useIsomorphicLayoutEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          allowUserPositionStorage.set(true)
          setLocation({ latitude, longitude })
        },
        () => setLocation(INITIAL_LATITUDE_LONGITUDE),
      )
    } catch (err) {
      allowUserPositionStorage.set(false)
      setLocation(INITIAL_LATITUDE_LONGITUDE)
    }
  }, [])

  return location
}

export default useUserGeoLocation
