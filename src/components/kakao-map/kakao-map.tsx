import { forwardRef } from 'react'

import cn from '@/utils/cn'
import { KakaoMapProvider } from './context'
import useKakaoEvent from './use-kakao-event'
import { mergeRefs } from '@/utils/merge-refs'
import useKakaoMapInstance from './use-kakao-map-instance'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import useUserGeoLocation from '@/hooks/use-user-geo-location'

interface KakaoMapProps {
  className?: string
  center?: {
    lat: number
    lng: number
  }
  level?: number
  maxLevel?: number
  minLevel?: number
  onCenterChanged?: (target: kakao.maps.Map) => void
  onClick?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDoubleClick?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDragStart?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDrag?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDragEnd?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  children?: React.ReactNode
}

const DEFAULT_ZOOM = 3

const KakaoMap = forwardRef<HTMLElement, KakaoMapProps>(
  (
    {
      className,
      center,
      level = DEFAULT_ZOOM,
      maxLevel,
      minLevel,
      onCenterChanged,
      onClick,
      onDoubleClick,
      onDragStart,
      onDrag,
      onDragEnd,
      children,
    },
    ref,
  ) => {
    const userLocation = useUserGeoLocation()
    const { map, container } = useKakaoMapInstance({
      center: center || {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      },
      level,
      maxLevel,
      minLevel,
    })

    useIsomorphicLayoutEffect(() => {
      if (!map || !onCenterChanged) return

      kakao.maps.event.addListener(map, 'center_changed', () => {
        onCenterChanged(map)
      })
    }, [])

    useKakaoEvent(map, 'click', onClick)
    useKakaoEvent(map, 'dblclick', onDoubleClick)
    useKakaoEvent(map, 'dragstart', onDragStart)
    useKakaoEvent(map, 'drag', onDrag)
    useKakaoEvent(map, 'dragend', onDragEnd)

    return (
      <>
        <section
          ref={mergeRefs([ref, container])}
          className={cn('relative hue-rotate-180 invert-[180%]', className)}
        />
        {map && <KakaoMapProvider map={map}>{children}</KakaoMapProvider>}
      </>
    )
  },
)

KakaoMap.displayName = 'KakaoMap'

export default KakaoMap
