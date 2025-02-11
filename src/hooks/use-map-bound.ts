import { getCorners } from '@/utils/map'
import { mapBoundSessionStorage } from '@/utils/storage'
import { useCallback, useEffect, useState } from 'react'

type Bounds = {
  latitude1: number
  longitude1: number
  latitude2: number
  longitude2: number
}

const dispatchBoundsUpdatedEvent = (bounds: Bounds) => {
  const event = new CustomEvent<Bounds>('boundsUpdated', { detail: bounds })
  window.dispatchEvent(event)
}

const useMapBound = (map: kakao.maps.Map | null, saveBoundInSession = true) => {
  const [bounds, setBounds] = useState<Bounds | null>(
    mapBoundSessionStorage.getValueOrNull() as Bounds | null,
  )

  const updateMapBound = useCallback(() => {
    if (!map) return

    const mapBounds = map.getBounds()
    if (!mapBounds) {
      return
    }

    const { southEast, northWest } = getCorners(mapBounds)
    const newBounds: Bounds = {
      latitude1: northWest.latitude,
      longitude1: northWest.longitude,
      latitude2: southEast.latitude,
      longitude2: southEast.longitude,
    }

    if (saveBoundInSession) {
      mapBoundSessionStorage.set(newBounds)
    }
    setBounds(newBounds)
    dispatchBoundsUpdatedEvent(newBounds)
  }, [map, saveBoundInSession])

  useEffect(() => {
    if (map) {
      updateMapBound()
    }
  }, [map, updateMapBound])

  return { bounds, updateMapBound }
}

export default useMapBound
