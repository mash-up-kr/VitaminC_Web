import { INITIAL_LATITUDE_LONGITUDE } from '@/constants/coordinates'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { getDistance } from '@/utils/location'
import { mapBoundSessionStorage } from '@/utils/storage'
import { useEffect, useMemo, useState } from 'react'

const DEFAULT_RADIUS = 10_000 // 미터(m)
const K = 1_000

type Bounds = {
  latitude1: number
  longitude1: number
  latitude2: number
  longitude2: number
}

const useMapCircle = () => {
  const [center, setCenter] = useState({
    lat: INITIAL_LATITUDE_LONGITUDE.latitude,
    lng: INITIAL_LATITUDE_LONGITUDE.longitude,
  })
  const [radius, setRadius] = useState(DEFAULT_RADIUS)

  const bounds = mapBoundSessionStorage.getValueOrNull() as Bounds | null
  const boundsCenter = useMemo(() => {
    if (!bounds) return null
    return {
      lat: (bounds.latitude1 + bounds.latitude2) / 2,
      lng: (bounds.longitude1 + bounds.longitude2) / 2,
    }
  }, [bounds])

  const { userLocation } = useUserGeoLocation()
  const userLocationCenter = useMemo(() => {
    if (!userLocation?.latitude || !userLocation?.longitude) {
      return null
    }
    return {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    }
  }, [userLocation])

  useEffect(() => {
    const handleBoundsUpdated = (event: CustomEvent<Bounds>) => {
      const updatedBounds = event.detail
      if (
        updatedBounds.latitude1 == null ||
        updatedBounds.latitude2 == null ||
        updatedBounds.longitude1 == null ||
        updatedBounds.longitude2 == null
      ) {
        console.error('Invalid bounds data received')
        return
      }
      const newBoundsCenter = {
        lat: (updatedBounds.latitude1 + updatedBounds.latitude2) / 2,
        lng: (updatedBounds.longitude1 + updatedBounds.longitude2) / 2,
      }
      setCenter(newBoundsCenter)
    }

    window.addEventListener(
      'boundsUpdated',
      handleBoundsUpdated as EventListener,
    )

    return () => {
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
        bounds.latitude1,
        bounds.longitude1,
        center.lat,
        center.lng,
      )
      const formattedDistance = Math.floor(distance * K) || DEFAULT_RADIUS
      setRadius(formattedDistance)
    }
  }, [bounds, center.lat, center.lng])

  return { center, radius }
}

export default useMapCircle
