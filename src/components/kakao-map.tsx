'use client'

import React from 'react'

const KakaoMap = () => {
  React.useEffect(() => {
    window.kakao.maps.load(() => {
      var container = document.getElementById('map')
      var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      }

      var map = new window.kakao.maps.Map(container, options)

      // 지도를 클릭한 위치에 표출할 마커입니다
      var marker = new window.kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter(),
      })
      // 지도에 마커를 표시합니다
      marker.setMap(map)

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
      window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: {
          latLng: {
            getLat: () => number
            getLng: () => number
          }
        }) {
          // 클릭한 위도, 경도 정보를 가져옵니다
          var latlng = mouseEvent.latLng

          // 마커 위치를 클릭한 위치로 옮깁니다
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
