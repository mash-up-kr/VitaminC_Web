import { useState, type RefObject, useEffect } from 'react'

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
  { initialLevel = 3 }: { initialLevel?: number },
) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)

  const setCurrentLocation = ({
    latitude,
    longitude,
  }: {
    latitude: number
    longitude: number
  }) => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: initialLevel,
      }
      setMap(new window.kakao.maps.Map(containerRef.current, options))
    })
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
  }, [containerRef])

  return { map }
}

export default useMap
