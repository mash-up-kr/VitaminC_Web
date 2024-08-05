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

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [mapId, setMapId] = useState('')
  const [places, setPlaces] = useState<SearchPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<SearchPlace | null>(null)

  const [bottomRef, bottomBounds] = useMeasure()

  useEffect(() => {
    ;(async () => {
      const data = await getMapId()

      if (!data) {
        throw new Error('잘못된 접근입니다.')
      }
      setMapId(data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!mapId) return
      const bounds = mapBoundSessionStorage.getValueOrNull()
      try {
        const { data } = await api.search.places.get({
          q: query,
          rect: formatBoundToRect(bounds),
          mapId,
        })
        setPlaces(data)
      } catch {
        notify.error('예상치 못한 오류가 발생했습니다.')
      }
    })()
  }, [query, mapId])

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
            onClickMap={() => setSelectedPlace(null)}
            onClickPlace={(place) => {
              if (place.kakaoId === selectedPlace?.kakaoId) {
                setSelectedPlace(null)
              } else {
                setSelectedPlace(place)
              }
            }}
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
        <ResultSearchListBox places={places} className="absolute top-[60px]" />
      )}
    </div>
  )
}

export default ResultSearchBox
