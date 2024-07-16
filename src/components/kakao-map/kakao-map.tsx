import { forwardRef, useCallback, useEffect, useState } from 'react'
import { type RefObject } from 'react'

import cn from '@/utils/cn'
import { KakaoMapProvider } from './context'
import useKakaoEvent from './use-kakao-event'
import { mergeRefs } from '@/utils/merge-refs'
import useKakaoMapInstance from './use-kakao-map-instance'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { mapBoundSessionStorage } from '@/utils/storage'
import { AccessibleIconButton } from '@/components/index'
import useWindowSize from '@/hooks/use-window-size'

type TargetEventListener = (target: kakao.maps.Map) => void
type MouseEventListener = (mouseEvent: kakao.maps.event.MouseEvent) => void

interface KakaoMapProps {
  className?: string
  bottomRef?: RefObject<HTMLDivElement>
  center?: {
    lat: number
    lng: number
  }
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
      bottomRef,
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
    const [gpsMode, setGpsMode] = useState(false)
    const [gpsBottomPosition, setGpsBottomPosition] = useState(16)
    const userLocation = useUserGeoLocation()
    const { height } = useWindowSize()
    const { map, container, setCurrentLocation, removeCurrentMarker } =
      useKakaoMapInstance({
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

    const handleClickGps = () => {
      if (gpsMode) {
        setGpsMode(false)
        removeCurrentMarker()
        return
      }
      setGpsMode(true)
      setCurrentLocation()
    }

    useKakaoEvent(map, 'click', onClick)
    useKakaoEvent(map, 'dblclick', onDoubleClick)
    useKakaoEvent(map, 'dragstart', onDragStart)
    useKakaoEvent(map, 'drag', onDrag)
    useKakaoEvent(map, 'dragend', () => saveMapBoundWithEvent(onDragEnd))
    useKakaoEvent(map, 'center_changed', onCenterChanged)
    useKakaoEvent(map, 'zoom_changed', () =>
      saveMapBoundWithTargetEvent(onZoomChanged),
    )

    useEffect(() => {
      const getGpsButtonPositionY = () => {
        if (bottomRef?.current) {
          setGpsBottomPosition(
            height - bottomRef.current.getBoundingClientRect().top + 16,
          )
          return
        }

        setGpsBottomPosition(16)
      }

      getGpsButtonPositionY()
    }, [bottomRef?.current, height])

    return (
      <>
        <section
          ref={mergeRefs([ref, container])}
          className={cn('relative hue-rotate-180 invert-[180%]', className)}
        />
        {map && <KakaoMapProvider map={map}>{children}</KakaoMapProvider>}
        <AccessibleIconButton
          className={`absolute right-5 transition-all z-10`}
          style={{
            bottom: `${gpsBottomPosition}px`,
          }}
          label={gpsMode ? '내 위치로 이동 취소' : '내 위치로 이동'}
          icon={{
            className: 'w-11 h-11',
            type: gpsMode ? 'locationOn' : 'locationOff',
          }}
          onClick={handleClickGps}
        />
      </>
    )
  },
)

KakaoMap.displayName = 'KakaoMap'

export default KakaoMap
