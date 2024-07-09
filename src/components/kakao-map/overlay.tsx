import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

import { useKakaoMap } from './context'

interface OverlayProps {
  latitude: number
  longitude: number
  children: ReactNode
}

const Overlay = ({ latitude, longitude, children }: OverlayProps) => {
  const { map } = useKakaoMap()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!map || !overlayRef.current) return

    const position = new kakao.maps.LatLng(latitude, longitude)
    const customOverlay = new kakao.maps.CustomOverlay({
      position,
      content: overlayRef.current,
    })

    customOverlay.setMap(map)

    return () => {
      customOverlay.setMap(null)
    }
  }, [map, latitude, longitude])

  return <div ref={overlayRef}>{children}</div>
}

export default Overlay
