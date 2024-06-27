import { useState, type RefObject, useEffect, useCallback } from 'react'

type LocationType = {
  latitude: number
  longitude: number
}

/**
 * navigator.geolocation를 사용할 수 없거나 위치 정보 공유를 거절하는 경우
 * 사용하는 위도, 경도값 서울 중구로 설정함
 */
const INITIAL_LATITUDE_LONGITUDE = {
  latitude: 37.561,
  longitude: 126.9996,
}

const useMap = <T>(
  containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>,
  initialLevel = 3,
) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [markers, setMarkers] = useState<{
    [markerId in string]: kakao.maps.Marker
  }>({})

  const setCurrentLocation = useCallback(
    ({ latitude, longitude }: LocationType) => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: initialLevel,
        }
        setMap(new window.kakao.maps.Map(containerRef.current, options))
      })
    },
    [containerRef, initialLevel],
  )

  /**
   * 지도의 위치를 재설정할 때 사용
   * @param location 재설정할 위치
   */
  const setLocation = (location: LocationType) => {
    if (!map) return

    const nextLocation = new kakao.maps.LatLng(
      location.latitude,
      location.longitude,
    )
    map.setCenter(nextLocation)
  }

  /**
   * 지도에 마커를 추가할 떄 사용함 현재 디자인 상 오버레이는 표시하지 않기 때문에 마커 추가만 표시함
   * @param placeId 생성한 맛집에 대한 id
   * @param location 마커 위치
   * @param eventType 이벤트 종류 ex) 'click'
   * @param eventHandler 이벤트 핸들러
   */
  const addMarker = (
    placeId: string,
    location: LocationType,
    eventType?: keyof WindowEventMap,
    eventHandler?: () => void,
  ) => {
    if (!map) return

    if (markers[placeId]) return

    //TODO: 마커 이미지 확정 시 설정
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(location.latitude, location.longitude),
    })
    if (eventType && eventHandler) {
      kakao.maps.event.addListener(marker, eventType, eventHandler)
    }

    setMarkers((prev) => ({ ...prev, [placeId]: marker }))
  }

  const deleteMarker = (placeId: string) => {
    if (!markers[placeId]) return

    markers[placeId].setMap(null)

    setMarkers((prev) => {
      delete prev[placeId]
      return prev
    })
  }

  const resetMarker = () => {
    Object.entries(markers).forEach(([, marker]) => {
      marker.setMap(null)
    })
    setMarkers({})
  }

  useEffect(() => {
    if (!containerRef.current) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCurrentLocation({ latitude, longitude })
        },
        () => setCurrentLocation(INITIAL_LATITUDE_LONGITUDE),
      )
    } else {
      setCurrentLocation(INITIAL_LATITUDE_LONGITUDE)
    }
  }, [containerRef, setCurrentLocation])

  return { map, setLocation, addMarker, deleteMarker, resetMarker }
}

export default useMap
