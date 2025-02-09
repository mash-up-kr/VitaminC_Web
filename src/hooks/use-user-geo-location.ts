import { useCallback, useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

import type { LocationType } from '@/models/kakao-map'
import { allowUserPositionStorage } from '@/utils/storage'
import { INITIAL_LATITUDE_LONGITUDE } from '@/constants/coordinates'

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
