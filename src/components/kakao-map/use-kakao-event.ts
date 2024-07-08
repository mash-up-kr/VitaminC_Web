import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

type EventType =
  | 'click'
  | 'dblclick'
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'mousemove'

const useKakaoEvent = (
  map: kakao.maps.Map | null,
  type: EventType,
  handler?: Function,
) => {
  useIsomorphicLayoutEffect(() => {
    if (!map || !handler) return

    kakao.maps.event.addListener(map, type, handler)

    return () => {
      kakao.maps.event.removeListener(map, type, handler)
    }
  }, [map, type, handler])
}

export default useKakaoEvent
