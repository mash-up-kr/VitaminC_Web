import type { IconKey } from './common/icon'
import CurrentPositionSearchButton from './kakao-map/current-position-search-button'
import FloatingButtonBox from './kakao-map/floating-button-box'
import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'

import {
  type PlaceType,
  type SearchPlace,
  isPlaceType,
  isSearchPlace,
} from '@/models/api/place'
import type { ClassName } from '@/models/common'
import { removeAllSpaces } from '@/utils/category'
import cn from '@/utils/cn'

interface KorrkKakaoMapProps<T extends PlaceType | SearchPlace>
  extends ClassName {
  places?: T[] | null
  center?: Parameters<typeof KakaoMap>[0]['center']
  selectedPlace?: T | null
  topOfBottomBounds?: number
  isShowCurrentPositionSearch?: boolean
  fetchPlaceByCurrentPosition?: (map: kakao.maps.Map) => void
  onClickMap: Parameters<typeof KakaoMap>[0]['onClick']
  onDragMap?: Parameters<typeof KakaoMap>[0]['onDrag']
  onCenterChangeMap?: Parameters<typeof KakaoMap>[0]['onCenterChanged']
  onClickPlace: (place: T) => void
}

const getMarkerType = (
  category: string,
  isPick: boolean,
): Extract<
  IconKey,
  | 'cafe'
  | 'restaurant'
  | 'bar'
  | 'selectedCafe'
  | 'selectedRestaurant'
  | 'selectedBar'
> => {
  const trimmedCategory = removeAllSpaces(category)

  if (['호프', '요리주점'].includes(trimmedCategory))
    return isPick ? 'selectedBar' : 'bar'
  if (['카페', '디저트'].includes(trimmedCategory))
    return isPick ? 'selectedCafe' : 'cafe'
  return isPick ? 'selectedRestaurant' : 'restaurant'
}

const KorrkKakaoMap = <T extends PlaceType | SearchPlace>({
  className,
  selectedPlace,
  center,
  places = [],
  topOfBottomBounds = 0,
  isShowCurrentPositionSearch,
  onClickMap,
  onClickPlace,
  onDragMap,
  onCenterChangeMap,
  fetchPlaceByCurrentPosition,
}: KorrkKakaoMapProps<T>) => {
  return (
    <>
      <div
        className={cn(
          'flex min-h-dvh w-full flex-col items-center justify-center bg-neutral-700 px-5',
          className,
        )}
      >
        <KakaoMap
          className="h-dvh w-[calc(100%+40px)]"
          center={center}
          onClick={onClickMap}
          onDrag={onDragMap}
          onCenterChanged={onCenterChangeMap}
        >
          {places?.map((place) => {
            const isPlace = isPlaceType(place)
            const isSearchPlaceType = isSearchPlace(place)

            const isSelected = (() => {
              if (isPlace && isPlaceType(selectedPlace)) {
                return selectedPlace.place.id === place.place.id
              }
              if (isSearchPlaceType && isSearchPlace(selectedPlace)) {
                return selectedPlace.kakaoId === place.kakaoId
              }
              return false
            })()

            const type = getMarkerType(
              isSearchPlaceType
                ? place.category
                : place.place.kakaoPlace.category,
              isSelected,
            )
            return (
              <Marker
                key={isSearchPlaceType ? place.kakaoId : place.place.id}
                latitude={isSearchPlaceType ? place.y : place.place.y}
                longitude={isSearchPlaceType ? place.x : place.place.x}
                isSaved={
                  isSearchPlaceType
                    ? place.isRegisteredPlace
                    : !!place.createdBy
                }
                type={type}
                onClick={() => onClickPlace(place)}
              />
            )
          })}

          <FloatingButtonBox topOfBottomBounds={topOfBottomBounds} />

          {isShowCurrentPositionSearch && (
            <CurrentPositionSearchButton
              className="absolute left-1/2 top-[76px] z-[100] -translate-x-1/2"
              onClick={(map) => fetchPlaceByCurrentPosition?.(map)}
            />
          )}
        </KakaoMap>
      </div>
    </>
  )
}

export default KorrkKakaoMap
