import type { ClassName } from '@/models/interface'
import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'
import type { PlaceType } from '@/types/api/place'
import cn from '@/utils/cn'

interface KorrkKakaoMapProps extends ClassName {
  mapMode?: 'search' | 'map'
  places?: PlaceType[]
  selectedPlace?: PlaceType | null
  topOfBottomBounds?: number
  onClickPlace: (place: PlaceType) => void
}

const KorrkKakaoMap = ({
  className,
  selectedPlace,
  places = [],
  mapMode = 'map',
  topOfBottomBounds = 0,
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
        <KakaoMap
          className="w-[calc(100%+40px)] h-screen"
          center={{ lat: 37.5665, lng: 126.978 }}
        >
          {places.map((place) => (
            <Marker
              isSaved={mapMode === 'map'}
              key={place.place.id}
              latitude={place.place.y}
              longitude={place.place.x}
              type={
                selectedPlace?.place.id === place.place.id
                  ? 'selectedRestaurant'
                  : 'restaurant'
              }
              onClick={() => onClickPlace(place)}
            />
          ))}
          <GpsButton topOfBottomBounds={topOfBottomBounds} />
        </KakaoMap>
      </div>
    </>
  )
}

export default KorrkKakaoMap
