import { useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

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
  const isLoaded = typeof window !== 'undefined' && typeof kakao !== 'undefined'

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

  return { map, container }
}

export default useKakaoMapInstance
