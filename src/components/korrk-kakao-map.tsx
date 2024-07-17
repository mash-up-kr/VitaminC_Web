import { ReactNode, useRef, useState } from 'react'
import GpsButton from './kakao-map/gps-button'
import KakaoMap from './kakao-map/kakao-map'
import { PlaceType } from './place/types'
import Marker from './kakao-map/marker'
import BottomSheet from './bottom-sheet'
import PlaceMapPopup from './place/place-map-popup'

interface KorrkKakaoMapProps {
  mapMode?: 'search' | 'map'
  places?: PlaceType[]
  bottomBodyElement?: ReactNode
}

const KorrkKakaoMap = ({
  bottomBodyElement,
  mapMode = 'map',
  places = [],
}: KorrkKakaoMapProps) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const isOpenBottomSheet = bottomBodyElement && selectedPlace === null

  const handleClickPlace = (place: PlaceType) => () => {
    if (selectedPlace?.place.id === place.place.id) {
      setSelectedPlace(null)
      return
    }
    setSelectedPlace(place)
  }

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
              onClick={handleClickPlace(place)}
            />
          ))}
          <GpsButton bottomRef={bottomRef} />
        </KakaoMap>
      </div>
      {selectedPlace === null ? (
        isOpenBottomSheet && (
          <BottomSheet ref={bottomRef} body={bottomBodyElement} />
        )
      ) : (
        <PlaceMapPopup
          ref={bottomRef}
          className="absolute bottom-5 px-5"
          image={selectedPlace.place.kakaoPlace.photoList[0]}
          address={selectedPlace.place.kakaoPlace.address}
          name={selectedPlace.place.kakaoPlace.name}
          placeId={selectedPlace.place.kakaoPlace.id}
          category={selectedPlace.place.kakaoPlace.category}
          distance={'2'}
          pick={{
            isLiked: selectedPlace.likedUserIds.includes(1),
            isMyPick: selectedPlace.createdBy.id === 1,
            numOfLikes: selectedPlace.likedUserIds.length,
            hashtags: selectedPlace.tags.map((tag) => tag.content),
            onClickLike: () => null,
          }}
        />
      )}
    </>
  )
}

export default KorrkKakaoMap
