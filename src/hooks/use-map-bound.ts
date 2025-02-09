import { getCorners } from '@/utils/map'
import { mapBoundSessionStorage } from '@/utils/storage'
import { useCallback, useEffect, useState } from 'react'

const useMapBound = (map: kakao.maps.Map | null, saveBoundInSession = true) => {
  const [bounds, setBounds] = useState(mapBoundSessionStorage.getValueOrNull())

  const updateMapBound = useCallback(() => {
    if (map?.getBounds()) {
      const { southEast, northWest } = getCorners(map.getBounds())
      const newBounds = {
        latitude1: northWest.latitude,
        longitude1: northWest.longitude,
        latitude2: southEast.latitude,
        longitude2: southEast.longitude,
      }

      if (mapBoundSessionStorage) {
        mapBoundSessionStorage.set(newBounds)
      }
      setBounds(newBounds)
    }
  }, [map, saveBoundInSession])

  useEffect(() => {
    if (map) {
      updateMapBound()
    }
  }, [map, updateMapBound])

  return { bounds, updateMapBound }
}

export default useMapBound
