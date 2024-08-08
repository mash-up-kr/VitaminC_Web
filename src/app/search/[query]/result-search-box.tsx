'use client'
import { useEffect, useState } from 'react'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { notify } from '@/components/common/custom-toast'
import ResultSearchListBox from './result-search-list'
import ResultSearchInput from './result-search-input'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import { type SearchPlace } from '@/types/api/place'
import useMeasure from '@/hooks/use-measure'
import {
  allowUserPositionStorage,
  mapBoundSessionStorage,
} from '@/utils/storage'
import { api } from '@/utils/api'
import { formatBoundToRect } from '@/utils/location'
import { getMapId } from '@/services/map-id'
import ResultPlaceMapPopup from './result-place-map-popup'
import CurrentPositionSearchButton from '@/components/kakao-map/current-position-search-button'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { getCorners } from '@/utils/map'

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [mapId, setMapId] = useState('')
  const [places, setPlaces] = useState<SearchPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<SearchPlace | null>(null)
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  )
  const [userMapBound, setUserMapBound] = useState<{
    latitude1: number
    longitude1: number
    latitude2: number
    longitude2: number
  } | null>(null)
  const [isShowCurrentPositionSearch, setIsShowCurrentPositionSearch] =
    useState(false)
  const isAllowUserPosition = allowUserPositionStorage.getValueOrNull()
  const userPosition = useUserGeoLocation()

  const [bottomRef, bottomBounds] = useMeasure()

  const handleClickSearchOnCurrentPosition = async () => {
    if (!mapId) return

    try {
      const { data } = await api.search.places.get({
        q: query,
        rect: formatBoundToRect(userMapBound),
        mapId,
      })
      setCenter({ lat: userPosition.latitude, lng: userPosition.longitude })
      setPlaces(data)
    } catch {
      notify.error('잘못된 접근입니다.')
    }
  }

  const handleCenterChangeMap = (map: kakao.maps.Map) => {
    if (!map) return

    setCenter(null)

    const { southEast, northWest } = getCorners(map.getBounds())
    setUserMapBound({
      latitude1: northWest.latitude,
      longitude1: northWest.longitude,
      latitude2: southEast.latitude,
      longitude2: southEast.longitude,
    })
    // 사용자 position이 bound 안 벗어난지 검사
    if (
      userPosition.latitude > northWest.latitude ||
      userPosition.latitude < southEast.latitude ||
      userPosition.longitude < northWest.longitude ||
      userPosition.longitude > southEast.longitude
    ) {
      setIsShowCurrentPositionSearch(false)
      return
    }

    setIsShowCurrentPositionSearch(true)
  }

  useEffect(() => {
    ;(async () => {
      const bounds = mapBoundSessionStorage.getValueOrNull()

      try {
        let validMapId = mapId
        if (!validMapId) {
          validMapId = (await getMapId()) || ''
          if (!validMapId) {
            throw new Error('잘못된 접근입니다.')
          }
          setMapId(validMapId)
        }

        const { data } = await api.search.places.get({
          q: query,
          rect: formatBoundToRect(bounds),
          mapId: validMapId,
        })
        setPlaces(data)
      } catch {
        notify.error('잘못된 접근입니다.')
      }
    })()
  }, [mapId, query])

  return (
    <div className={cn('w-full min-h-dvh relative', className)}>
      <ResultSearchInput
        value={query}
        isMapView={isMapView}
        onToggleView={() => setIsMapView((prev) => !prev)}
        className="absolute h-[60px] z-[100]"
      />
      {isAllowUserPosition && isShowCurrentPositionSearch && (
        <CurrentPositionSearchButton
          className="absolute left-1/2 -translate-x-1/2 top-[76px]"
          onClick={handleClickSearchOnCurrentPosition}
        />
      )}

      {isMapView ? (
        <>
          <KorrkKakaoMap<SearchPlace>
            places={places}
            selectedPlace={selectedPlace}
            topOfBottomBounds={bottomBounds.top}
            center={center}
            className="absolute top-0 left-0 w-[calc(100%+40px)] mx-[-20px] h-dvh z-[50]"
            onClickMap={() => setSelectedPlace(null)}
            onClickPlace={(place) => {
              if (place.kakaoId === selectedPlace?.kakaoId) {
                setSelectedPlace(null)
              } else {
                setSelectedPlace(place)
              }
            }}
            onCenterChangeMap={handleCenterChangeMap}
          />
          {selectedPlace && (
            <ResultPlaceMapPopup
              ref={bottomRef}
              kakaoId={selectedPlace.kakaoId}
              mapId={mapId}
              className="absolute bottom-5 z-[100]"
            />
          )}
        </>
      ) : (
        <ResultSearchListBox
          mapId={mapId}
          places={places}
          className="absolute top-[60px]"
        />
      )}
    </div>
  )
}

export default ResultSearchBox
