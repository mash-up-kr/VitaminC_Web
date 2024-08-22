'use client'

import { useEffect, useState } from 'react'

import ResultPlaceMapPopup from './result-place-map-popup'
import ResultSearchInput from './result-search-input'
import ResultSearchListBox from './result-search-list'

import { notify } from '@/components/common/custom-toast'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import useMeasure from '@/hooks/use-measure'
import { type SearchPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { formatBoundToRect } from '@/utils/location'
import { getCorners } from '@/utils/map'
import { mapBoundSessionStorage } from '@/utils/storage'

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
  const [mapBound, setMapBound] = useState<{
    latitude1: number
    longitude1: number
    latitude2: number
    longitude2: number
  } | null>(null)
  const [isShowCurrentPositionSearch, setIsShowCurrentPositionSearch] =
    useState(false)

  const [bottomRef, bottomBounds] = useMeasure()

  const handleClickSearchOnCurrentPosition = async () => {
    if (!mapId) return

    try {
      const { data } = await api.search.places.get({
        q: query,
        rect: formatBoundToRect(mapBound),
        mapId,
      })
      setPlaces(data)
      setIsShowCurrentPositionSearch(false)
    } catch {
      notify.error('잘못된 접근입니다.')
    }
  }

  const handleCenterChangeMap = (map: kakao.maps.Map) => {
    if (!map) return

    const { southEast, northWest } = getCorners(map.getBounds())
    const bounds = {
      latitude1: northWest.latitude,
      longitude1: northWest.longitude,
      latitude2: southEast.latitude,
      longitude2: southEast.longitude,
    }
    setMapBound(bounds)
    setIsShowCurrentPositionSearch(true)
    setCenter({
      lat: (bounds.latitude1 + bounds.latitude2) / 2,
      lng: (bounds.longitude1 + bounds.longitude2) / 2,
    })
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
        setIsShowCurrentPositionSearch(false)
        if (bounds) {
          setCenter({
            lat: (bounds.latitude1 + bounds.latitude2) / 2,
            lng: (bounds.longitude1 + bounds.longitude2) / 2,
          })
        }
      } catch {
        notify.error('잘못된 접근입니다.')
      }
    })()
  }, [mapId, query])

  return (
    <div className={cn('relative min-h-dvh w-full', className)}>
      <ResultSearchInput
        value={query}
        isMapView={isMapView}
        onToggleView={() => setIsMapView((prev) => !prev)}
        className="absolute z-[100] h-[60px]"
      />

      {isMapView ? (
        <>
          <KorrkKakaoMap<SearchPlace>
            places={places}
            selectedPlace={selectedPlace}
            topOfBottomBounds={bottomBounds.top}
            center={center}
            className="absolute left-0 top-0 z-[50] mx-[-20px] h-dvh w-[calc(100%+40px)]"
            isShowCurrentPositionSearch={isShowCurrentPositionSearch}
            onClickMap={() => setSelectedPlace(null)}
            onClickPlace={(place) => {
              if (place.kakaoId === selectedPlace?.kakaoId) {
                setSelectedPlace(null)
              } else {
                setSelectedPlace(place)
              }
            }}
            onCenterChangeMap={handleCenterChangeMap}
            fetchPlaceByCurrentPosition={handleClickSearchOnCurrentPosition}
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
