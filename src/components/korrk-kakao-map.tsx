import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import Marker from './kakao-map/marker'
import { PlaceType } from '@/types/api/place'

interface KorrkKakaoMapProps {
  mapMode?: 'search' | 'map'
  places?: PlaceType[]
  selectedPlace?: PlaceType | null
  handleClickPlace: (place: PlaceType) => VoidFunction
  topOfBottomBounds?: number
}

const KorrkKakaoMap = ({
  mapMode = 'map',
  places = [],
  selectedPlace,
  handleClickPlace,
  topOfBottomBounds = 0,
}: KorrkKakaoMapProps) => {
  return (
    <>
      <div className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
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
              onClick={handleClickPlace && handleClickPlace(place)}
            />
          ))}
          <GpsButton topOfBottomBounds={topOfBottomBounds} />
        </KakaoMap>
      </div>
    </>
  )
}

export default KorrkKakaoMap
