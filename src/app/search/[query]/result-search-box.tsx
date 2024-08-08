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
import { mapBoundSessionStorage } from '@/utils/storage'
import { api } from '@/utils/api'
import { formatBoundToRect } from '@/utils/location'
import { getMapId } from '@/services/map-id'
import ResultPlaceMapPopup from './result-place-map-popup'
import { getCorners } from '@/utils/map'

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [mapId, setMapId] = useState('')
  const [places, setPlaces] = useState<SearchPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<SearchPlace | null>(null)
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

      {isMapView ? (
        <>
          <KorrkKakaoMap<SearchPlace>
            places={places}
            selectedPlace={selectedPlace}
            topOfBottomBounds={bottomBounds.top}
            className="absolute top-0 left-0 w-[calc(100%+40px)] mx-[-20px] h-dvh z-[50]"
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
