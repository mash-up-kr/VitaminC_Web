import { getMarkerType } from '@/services/marker'
import CurrentPositionSearchButton from './kakao-map/current-position-search-button'
import FloatingButtonBox from './kakao-map/floating-button-box'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'

import {
  type KorrkPlace,
  type PlaceItem,
  isKorrkPlace,
  isPlaceItem,
} from '@/models/api/place'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface KorrkKakaoMapProps<T extends KorrkPlace | PlaceItem>
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

const KorrkKakaoMap = <T extends KorrkPlace | PlaceItem>({
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
            const isKorrkPlaceType = isKorrkPlace(place)
            const isPlaceItemType = isPlaceItem(place)

            const isSelected = (() => {
              if (isKorrkPlaceType && isKorrkPlace(selectedPlace)) {
                return selectedPlace.place.id === place.place.id
              }
              if (isPlaceItemType && isPlaceItem(selectedPlace)) {
                return selectedPlace.kakaoId === place.kakaoId
              }
              return false
            })()

            const type = getMarkerType(
              isPlaceItemType
                ? place.category
                : place.place.kakaoPlace.category,
              isSelected,
            )
            return (
              <Marker
                key={isPlaceItemType ? place.kakaoId : place.place.id}
                latitude={isPlaceItemType ? place.y : place.place.y}
                longitude={isPlaceItemType ? place.x : place.place.x}
                isSaved={
                  isPlaceItemType ? place.isRegisteredPlace : !!place.createdBy
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
