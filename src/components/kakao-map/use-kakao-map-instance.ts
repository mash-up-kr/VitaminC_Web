import { useCallback, useState, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { notify } from '../common/custom-toast'

interface UseKakaoMapInstanceProps {
  center: {
    lat: number
    lng: number
  }
  level?: number
  maxLevel?: number
  minLevel?: number
}

const useKakaoMapInstance = ({
  center,
  level,
  maxLevel,
  minLevel,
}: UseKakaoMapInstanceProps) => {
  const container = useRef<HTMLElement>(null)
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(
    null,
  )
  const isLoaded = typeof window !== 'undefined' && typeof kakao !== 'undefined'

  const setCurrentLocation = useCallback(() => {
    if (!map) return

    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const location = new window.kakao.maps.LatLng(latitude, longitude)
          const marker = new kakao.maps.Marker({
            image: new kakao.maps.MarkerImage(
              'https://kr.object.ncloudstorage.com/korrk-image/point.png',
              new kakao.maps.Size(34, 34),
            ),
            position: new kakao.maps.LatLng(latitude, longitude),
          })

          marker.setMap(map)
          map.setCenter(location)
          setCurrentMarker(marker)
        },
        () => notify.error('위치 정보를 가지고 오지 못했습니다. '),
      )
    } catch (err) {
      notify.error('위치 정보를 가지고 오지 못했습니다. ')
    }
  }, [map])

  const removeCurrentMarker = () => {
    if (!currentMarker) return
    currentMarker.setMap(null)
  }

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded || !container.current || map) return

    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level,
        maxLevel,
        minLevel,
      }
      setMap(() => new kakao.maps.Map(container.current, options))
    })
  }, [isLoaded, center, level, maxLevel, minLevel])

  return { map, container, setCurrentLocation, removeCurrentMarker }
}

export default useKakaoMapInstance
