import { INITIAL_LATITUDE_LONGITUDE } from '@/constants/coordinates'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { getDistance } from '@/utils/location'
import { mapBoundSessionStorage } from '@/utils/storage'
import { useEffect, useMemo, useState } from 'react'

const DEFAULT_RADIUS = 10_000 // 미터(m)
const K = 1_000

const useMapCircle = () => {
  const [center, setCenter] = useState({
    lat: INITIAL_LATITUDE_LONGITUDE.latitude,
    lng: INITIAL_LATITUDE_LONGITUDE.longitude,
  })
  const [radius, setRadius] = useState(DEFAULT_RADIUS)

  const bounds = mapBoundSessionStorage.getValueOrNull()
  const boundsCenter = useMemo(() => {
    if (!bounds) return null
    return {
      lat: (bounds.latitude1 + bounds.latitude2) / 2,
      lng: (bounds.longitude1 + bounds.longitude2) / 2,
    }
  }, [bounds])

  const { userLocation } = useUserGeoLocation()
  const userLocationCenter = useMemo(
    () => ({
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    }),
    [userLocation.latitude, userLocation.longitude],
  )

  useEffect(() => {
    const handleBoundsUpdated = (event: CustomEvent) => {
      const updatedBounds = event.detail
      const newBoundsCenter = {
        lat: (updatedBounds.latitude1 + updatedBounds.latitude2) / 2,
        lng: (updatedBounds.longitude1 + updatedBounds.longitude2) / 2,
      }
      setCenter(newBoundsCenter)
    }

    // 이벤트 리스너 등록
    window.addEventListener(
      'boundsUpdated',
      handleBoundsUpdated as EventListener,
    )

    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener(
        'boundsUpdated',
        handleBoundsUpdated as EventListener,
      )
    }
  }, [])

  useEffect(() => {
    const calculatedCenter = boundsCenter || userLocationCenter
    if (calculatedCenter) {
      setCenter(calculatedCenter)
    }
  }, [boundsCenter, userLocationCenter])

  useEffect(() => {
    if (bounds) {
      const distance = getDistance(
        bounds?.latitude1,
        bounds?.longitude1,
        center.lat,
        center.lng,
      )
      const formattedDistance = Math.floor(distance * K)
      setRadius(formattedDistance)
    }
  }, [bounds, center.lat, center.lng])

  return { center, radius }
}

export default useMapCircle
