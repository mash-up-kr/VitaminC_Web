import { forwardRef, useCallback } from 'react'

import { KakaoMapProvider } from './context'
import useKakaoEvent from './use-kakao-event'
import useKakaoMapInstance from './use-kakao-map-instance'

import useUserGeoLocation from '@/hooks/use-user-geo-location'
import cn from '@/utils/cn'
import { mergeRefs } from '@/utils/merge-refs'
import { mapBoundSessionStorage } from '@/utils/storage'
import useMapBound from '@/hooks/use-map-bound'

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
    const bounds = mapBoundSessionStorage.getValueOrNull()
    const boundsCenter = !!bounds && {
      lat: (bounds.latitude1 + bounds.latitude2) / 2,
      lng: (bounds.longitude1 + bounds.longitude2) / 2,
    }
    const { userLocation } = useUserGeoLocation()
    const userLocationCenter = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    }
    const { map, container } = useKakaoMapInstance({
      center: center || boundsCenter || userLocationCenter,
      level,
      maxLevel,
      minLevel,
    })
    const { updateMapBound } = useMapBound(map, saveBoundInSession)

    const saveMapBoundWithEvent = useCallback(
      (callback?: VoidFunction) => {
        updateMapBound()
        callback?.()
      },
      [updateMapBound],
    )

    const saveMapBoundWithTargetEvent = useCallback(
      (callback?: TargetEventListener) => {
        if (!map) return

        updateMapBound()
        callback?.(map)
      },
      [map, updateMapBound],
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
          draggable="false"
        />
        {map && <KakaoMapProvider map={map}>{children}</KakaoMapProvider>}
      </>
    )
  },
)

KakaoMap.displayName = 'KakaoMap'

export default KakaoMap
