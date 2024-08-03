import type { ClassName } from '@/models/interface'
import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'
import {
  isSearchPlace,
  type PlaceType,
  type SearchPlace,
} from '@/types/api/place'
import cn from '@/utils/cn'
import { removeAllSpaces } from '@/utils/category'
import type { IconKey } from './common/icon'

interface KorrkKakaoMapProps extends ClassName {
  places?: PlaceType[] | SearchPlace[]
  selectedPlace?: PlaceType | SearchPlace | null
  topOfBottomBounds?: number
  onClickMap: Parameters<typeof KakaoMap>[0]['onClick']
  onClickPlace: (place: PlaceType | SearchPlace) => void
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

const KorrkKakaoMap = ({
  className,
  selectedPlace,
  places = [],
  topOfBottomBounds = 0,
  onClickMap,
  onClickPlace,
}: KorrkKakaoMapProps) => {
  return (
    <>
      <div
        className={cn(
          'w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5',
          className,
        )}
      >
        <KakaoMap className="w-[calc(100%+40px)] h-screen" onClick={onClickMap}>
          {places.map((place) =>
            isSearchPlace(place) ? (
              <Marker
                key={place.kakaoId}
                latitude={place.y}
                longitude={place.x}
                isSaved={place.likedUserIds?.length !== 0}
                type={
                  isSearchPlace(selectedPlace)
                    ? getMarkerType(
                        place.category,
                        selectedPlace.kakaoId === place.kakaoId,
                      )
                    : getMarkerType(place.category, false)
                }
                onClick={() => onClickPlace(place)}
              />
            ) : (
              <Marker
                key={place.place.id}
                latitude={place.place.y}
                longitude={place.place.x}
                isSaved={place.likedUserIds?.length !== 0}
                type={
                  !isSearchPlace(selectedPlace)
                    ? getMarkerType(
                        place.place.kakaoPlace.category,
                        selectedPlace?.place.id === place.place.id,
                      )
                    : getMarkerType(place.place.kakaoPlace.category, false)
                }
                onClick={() => onClickPlace(place)}
              />
            ),
          )}
          <GpsButton topOfBottomBounds={topOfBottomBounds} />
        </KakaoMap>
      </div>
    </>
  )
}

export default KorrkKakaoMap
