import type { ClassName } from '@/models/interface'
import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'
import {
  isPlaceType,
  isSearchPlace,
  type PlaceType,
  type SearchPlace,
} from '@/types/api/place'
import cn from '@/utils/cn'
import { removeAllSpaces } from '@/utils/category'
import type { IconKey } from './common/icon'

interface KorrkKakaoMapProps<T extends PlaceType | SearchPlace>
  extends ClassName {
  places?: T[]
  selectedPlace?: T | null
  center?: Parameters<typeof KakaoMap>[0]['center']
  topOfBottomBounds?: number
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
  places = [],
  topOfBottomBounds = 0,
  center,
  onClickMap,
  onClickPlace,
  onDragMap,
  onCenterChangeMap,
}: KorrkKakaoMapProps<T>) => {
  return (
    <>
      <div
        className={cn(
          'w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5',
          className,
        )}
      >
        <KakaoMap
          className="w-[calc(100%+40px)] h-screen"
          center={center}
          onClick={onClickMap}
          onDrag={onDragMap}
          onCenterChanged={onCenterChangeMap}
        >
          {places.map((place) => {
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
          <GpsButton topOfBottomBounds={topOfBottomBounds} />
        </KakaoMap>
      </div>
    </>
  )
}

export default KorrkKakaoMap
