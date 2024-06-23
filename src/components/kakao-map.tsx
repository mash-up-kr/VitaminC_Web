'use client'

import { useEffect, useRef } from 'react'

interface KakaoMapProps {
  initialLevel?: number
}

const KakaoMap = ({ initialLevel = 3 }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = mapContainer.current
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: initialLevel,
      }

      const map = new window.kakao.maps.Map(container, options)

      const marker = new window.kakao.maps.Marker({
        position: map.getCenter(),
      })
      marker.setMap(map)

      window.kakao.maps.event.addListener(
        map,
        'click',
        (mouseEvent: {
          latLng: {
            getLat: () => number
            getLng: () => number
          }
        }) => {
          var latlng = mouseEvent.latLng

          marker.setPosition(latlng)
        },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={mapContainer} style={{ width: '400px', height: '400px' }} />
  )
}

export default KakaoMap
