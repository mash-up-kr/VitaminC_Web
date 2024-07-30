'use client'
import { useEffect, useState } from 'react'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { notify } from '@/components/common/custom-toast'
import ResultSearchListBox from './result-search-list'
import ResultSearchInput from './result-search-input'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import type { PlaceType, SearchPlace } from '@/types/api/place'
import PlaceMapPopup from '@/components/place/place-map-popup'
import useMeasure from '@/hooks/use-measure'
import { mapBoundSessionStorage } from '@/utils/storage'
import { api } from '@/utils/api'
import { formatBoundToRect } from '@/utils/location'
import { convertSearchPlaceToPlaceType } from '@/utils/format'
import { getMapId } from '@/services/map-id'

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [places, setPlaces] = useState<SearchPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)

  const [bottomRef, bottomBounds] = useMeasure()

  useEffect(() => {
    ;(async () => {
      const bounds = mapBoundSessionStorage.getValueOrNull()
      try {
        const mapId = await getMapId()

        if (!mapId) {
          throw new Error('잘못된 접근입니다.')
        }

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
  }, [query])

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
          <KorrkKakaoMap
            places={places.map((place) => convertSearchPlaceToPlaceType(place))}
            selectedPlace={selectedPlace}
            topOfBottomBounds={bottomBounds.top}
            className="absolute top-0 left-0 w-[calc(100%+40px)] mx-[-20px] h-dvh z-[50]"
            onClickMap={() => setSelectedPlace(null)}
            onClickPlace={(place) => {
              if (place.place.id === selectedPlace?.place.id) {
                setSelectedPlace(null)
              } else {
                setSelectedPlace(place)
              }
            }}
          />
          {selectedPlace && (
            <PlaceMapPopup
              ref={bottomRef}
              selectedPlace={selectedPlace}
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
