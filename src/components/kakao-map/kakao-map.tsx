import { forwardRef, useCallback } from 'react'

import cn from '@/utils/cn'
import { KakaoMapProvider } from './context'
import useKakaoEvent from './use-kakao-event'
import { mergeRefs } from '@/utils/merge-refs'
import useKakaoMapInstance from './use-kakao-map-instance'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { mapBoundSessionStorage } from '@/utils/storage'

interface KakaoMapProps {
  className?: string
  center?: {
    lat: number
    lng: number
  }
  level?: number
  maxLevel?: number
  minLevel?: number
  saveBoundInSession?: boolean
  onCenterChanged?: (target: kakao.maps.Map) => void
  onClick?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDoubleClick?: (mouseEvent: kakao.maps.event.MouseEvent) => void
  onDragStart?: VoidFunction
  onDrag?: VoidFunction
  onDragEnd?: VoidFunction
  children?: React.ReactNode
}

const DEFAULT_ZOOM = 3

const getCorners = (bounds: kakao.maps.LatLngBounds) => {
  const northEast = bounds.getNorthEast()
  const southWest = bounds.getSouthWest()

  const northWest = {
    latitude: northEast.getLat(),
    longitude: southWest.getLng(),
  }

  const southEast = {
    latitude: southWest.getLat(),
    longitude: northEast.getLng(),
  }

  return {
    northWest,
    southEast,
  }
}

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

    const saveMapBoundWithOnDrag = useCallback(() => {
      if (saveBoundInSession && map?.getBounds()) {
        const { southEast, northWest } = getCorners(map.getBounds())
        mapBoundSessionStorage.set({
          latitude1: northWest.latitude,
          longitude1: northWest.longitude,
          latitude2: southEast.latitude,
          longitude2: southEast.longitude,
        })
      }
      onDragEnd?.()
    }, [map, onDragEnd, saveBoundInSession])

    useKakaoEvent(map, 'click', onClick)
    useKakaoEvent(map, 'dblclick', onDoubleClick)
    useKakaoEvent(map, 'dragstart', onDragStart)
    useKakaoEvent(map, 'drag', onDrag)
    useKakaoEvent(map, 'dragend', saveMapBoundWithOnDrag)

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
