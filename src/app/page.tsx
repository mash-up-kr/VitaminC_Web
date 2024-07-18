'use client'

import { useState } from 'react'
import KakaoMap from '@/components/kakao-map/kakao-map'
import Marker from '@/components/kakao-map/marker'
import PlaceListItem from '@/components/place/place-list-item'
import BottomSheet from '@/components/bottom-sheet'
import { BOTTOM_SHEET_STATE } from '@/models/interface'
import useKakaoShare from '@/hooks/use-kakao-share'

const Home = () => {
  const [temp, setTemp] = useState(false)
  const shareInvite = useKakaoShare()

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

      <BottomSheet
        state={temp ? BOTTOM_SHEET_STATE.Default : BOTTOM_SHEET_STATE.Collapsed}
        body={
          <PlaceListItem
            placeId={12}
            name="존라멘"
            address="서울시 성동구 장터5길"
            rating={0.5}
            pick={{
              tags: [
                '존존맛탱구리',
                '존맛',
                '존맛탱',
                '존맛탱구',
                '존맛탱구리',
              ],
              isLiked: false,
              isMyPick: false,
              numOfLikes: 122,
              onClickLike: () => null,
            }}
          />
        }
      />
      <button onClick={() => shareInvite('dd', new Date())}>공유 테스트</button>
    </div>
  )
}

export default Home
