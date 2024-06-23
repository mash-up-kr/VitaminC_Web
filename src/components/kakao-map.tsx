'use client'

import { useEffect } from 'react'

interface KakaoMapProps {
  initialLevel?: number
}

const KakaoMap = ({ initialLevel = 3 }: KakaoMapProps) => {
  useEffect(() => {
    window.kakao.maps.load(() => {
      var container = document.getElementById('map')
      var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: initialLevel,
      }

      var map = new window.kakao.maps.Map(container, options)

      var marker = new window.kakao.maps.Marker({
        position: map.getCenter(),
      })
      marker.setMap(map)

      window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: {
          latLng: {
            getLat: () => number
            getLng: () => number
          }
        }) {
          var latlng = mouseEvent.latLng

          marker.setPosition(latlng)
        },
      )
    })
  }, [])

  //
  //
  //

  return (
    <section id="map" style={{ width: '400px', height: '400px' }}></section>
  )
}

export default KakaoMap
