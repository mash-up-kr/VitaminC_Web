import { useState, type RefObject, useEffect } from 'react'

type LocationType = {
  latitude: number
  longitude: number
}

/**
 * navigator.geolocation를 사용할 수 없거나 위치 정보 공유를 거절하는 경우
 * 사용하는 위도, 경도값 서울 중구로 설정함
 */
const INITIAL_LAT_LNG = {
  latitude: 37.561,
  longitude: 126.9996,
}

const useMap = <T>(
  containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>,
  initialLevel = 3,
) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)

  const setCurrentLocation = ({ latitude, longitude }: LocationType) => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: initialLevel,
      }
      setMap(new window.kakao.maps.Map(containerRef.current, options))
    })
  }

  /**
   * 지도의 위치를 재설정할 때 사용
   * @param location 재설정할 위치
   */
  const setLocation = (location: LocationType) => {
    if (map) {
      const moveLatLon = new kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      )
      map.setCenter(moveLatLon)
    }
  }

  /**
   * 지도에 마커를 추가할 떄 사용함 현재 디자인 상 오버레이는 표시하지 않기 때문에 마커 추가만 표시함
   * @param location 마커 위치
   * @param eventType 이벤트 종류 ex) 'click'
   * @param eventHandler 이벤트 핸들러
   */
  const addMarker = (
    location: LocationType,
    eventType?: string,
    eventHandler?: () => void,
  ) => {
    if (map) {
      //TODO: 마커 이미지 확정 시 설정
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
      })
      if (eventType && eventHandler) {
        kakao.maps.event.addListener(marker, eventType, eventHandler)
      }
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCurrentLocation({ latitude, longitude })
          },
          () => setCurrentLocation(INITIAL_LAT_LNG),
        )
      } else {
        setCurrentLocation(INITIAL_LAT_LNG)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  return { map, setLocation, addMarker }
}

export default useMap
