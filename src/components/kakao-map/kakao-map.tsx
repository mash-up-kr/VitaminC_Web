import { forwardRef, useCallback } from 'react'

import { KakaoMapProvider } from './context'
import useKakaoEvent from './use-kakao-event'
import useKakaoMapInstance from './use-kakao-map-instance'

import useUserGeoLocation from '@/hooks/use-user-geo-location'
import cn from '@/utils/cn'
import { getCorners } from '@/utils/map'
import { mergeRefs } from '@/utils/merge-refs'
import { mapBoundSessionStorage } from '@/utils/storage'

type TargetEventListener = (target: kakao.maps.Map) => void
type MouseEventListener = (mouseEvent: kakao.maps.event.MouseEvent) => void

interface KakaoMapProps {
  className?: string
  center?: {
    lat: number
    lng: number
  } | null
  level?: number
  maxLevel?: number
  minLevel?: number
  saveBoundInSession?: boolean
  onCenterChanged?: TargetEventListener
  onZoomChanged?: TargetEventListener
  onClick?: MouseEventListener
  onDoubleClick?: MouseEventListener
  onDragStart?: VoidFunction
  onDrag?: VoidFunction
  onDragEnd?: VoidFunction
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
      saveBoundInSession = true,
      onCenterChanged,
      onClick,
      onDoubleClick,
      onDragStart,
      onDrag,
      onDragEnd,
      onZoomChanged,
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

    const saveMapBound = useCallback(() => {
      if (saveBoundInSession && map?.getBounds()) {
        const { southEast, northWest } = getCorners(map.getBounds())

        mapBoundSessionStorage.set({
          latitude1: northWest.latitude,
          longitude1: northWest.longitude,
          latitude2: southEast.latitude,
          longitude2: southEast.longitude,
        })
      }
    }, [map, saveBoundInSession])

    const saveMapBoundWithEvent = useCallback(
      (callback?: VoidFunction) => {
        saveMapBound()
        callback?.()
      },
      [saveMapBound],
    )

    const saveMapBoundWithTargetEvent = useCallback(
      (callback?: TargetEventListener) => {
        if (!map) return

        saveMapBound()
        callback?.(map)
      },
      [map, saveMapBound],
    )

    useKakaoEvent(map, 'click', onClick)
    useKakaoEvent(map, 'dblclick', onDoubleClick)
    useKakaoEvent(map, 'dragstart', onDragStart)
    useKakaoEvent(map, 'drag', onDrag)
    useKakaoEvent(map, 'dragend', () => saveMapBoundWithEvent(onDragEnd))
    useKakaoEvent(map, 'center_changed', () => {
      if (map) {
        onCenterChanged?.(map)
      }
    })
    useKakaoEvent(map, 'zoom_changed', () =>
      saveMapBoundWithTargetEvent(onZoomChanged),
    )

    return (
      <>
        <section
          ref={mergeRefs([ref, container])}
          className={cn('darkmode relative', className)}
        />
        {map && <KakaoMapProvider map={map}>{children}</KakaoMapProvider>}
      </>
    )
  },
)

KakaoMap.displayName = 'KakaoMap'

export default KakaoMap
