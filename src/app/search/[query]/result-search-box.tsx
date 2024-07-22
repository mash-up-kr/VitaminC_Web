'use client'
import { useState } from 'react'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
// import { mapBoundSessionStorage } from '@/utils/storage'
import { notify } from '@/components/common/custom-toast'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import ResultSearchListBox from './result-search-list'
import ResultSearchInput from './result-search-input'
import KorrkKakaoMap from '@/components/korrk-kakao-map'
import type { PlaceType } from '@/types/api/place'
import { PLACE_LIST_DATA } from '@/constants/place'
import PlaceMapPopup from '@/components/place/place-map-popup'
import useMeasure from '@/hooks/use-measure'

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)

  const [bottomRef, bottomBounds] = useMeasure()

  useIsomorphicLayoutEffect(() => {
    ;(async () => {
      // const bounds = mapBoundSessionStorage.getValueOrNull()
      try {
        // const data = await api.search.places.get({
        //   q: query,
        //   rect: formatBoundToRect(bounds),
        // })
        setPlaces(PLACE_LIST_DATA)
      } catch {
        notify.error('예상치 못한 오류가 발생했습니다.')
      }
    })()
  }, [])

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
            places={places}
            selectedPlace={selectedPlace}
            topOfBottomBounds={bottomBounds.top}
            className="absolute top-0 left-0 w-[calc(100%+40px)] mx-[-20px] h-dvh z-[50]"
            onClickMap={() => setSelectedPlace(null)}
            onClickPlace={(place) => {
              if (place.id === selectedPlace?.id) {
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
