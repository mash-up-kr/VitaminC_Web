'use client'

import { useState } from 'react'
import KakaoMap from '@/components/kakao-map/kakao-map'
import Marker from '@/components/kakao-map/marker'
import PlaceMapPopup from '@/components/place/place-map-popup'

const MapMain = () => {
  const [temp, setTemp] = useState(false)

  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
      <KakaoMap
        className="w-[calc(100%+40px)] h-screen"
        center={{ lat: 37.5665, lng: 126.978 }}
        level={3}
        onClick={(event) => console.log('Map clicked', event)}
        onDoubleClick={(event) => console.log('Map double-clicked', event)}
      >
        <Marker
          latitude={37.5665}
          longitude={126.978}
          type={temp ? 'selectedCafe' : 'cafe'}
          isSaved={true}
          onClick={() => setTemp((prev) => !prev)}
        />
      </KakaoMap>

      {temp && (
        <PlaceMapPopup
          className="absolute bottom-5 px-5"
          placeId="dsd3egg"
          name="존라멘"
          category="일식"
          address="서울시 성동구 장터5길"
          distance="3km"
          image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format"
          pick={{
            hashtags: [
              '존맛탱구리',
              '존존맛탱구리',
              '존맛존맛탱구리',
              '존맛탱존맛탱구리',
              '존맛탱구리',
            ],
            isLiked: false,
            isMyPick: false,
            numOfLikes: 122,
            onClickLike: () => null,
          }}
        />
      )}
    </div>
  )
}

export default MapMain
