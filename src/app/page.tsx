'use client'

import BoardingInfoPass from '@/components/boarding-pass/boarding-info-pass'
import PlaceAutoSearchItem from '@/components/place/place-auto-search-item'
import PlaceListItem from '@/components/place/place-list-item'
import PlaceMapPopup from '@/components/place/place-map-popup'

const Home = () => {
  return (
    <main className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
      <BoardingInfoPass
        owner="주병호"
        numOfCrews={1330}
        day={19933}
        members={[
          '주병호',
          '손병호',
          '김병호',
          '이병호',
          '상병호',
          '고병호',
          '양병호',
        ]}
        numOfPins={19339}
      />
      <PlaceAutoSearchItem
        query="존라"
        address="서울시 성동구 장터5길"
        name="존라멘"
        review={324}
        category="일본식 라멘"
        distance="234m"
      />
      <PlaceListItem
        name="존라멘"
        address="서울시 성동구 장터5길"
        rate={0.5}
        images={[
          'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
        ]}
        pick={{
          hashtags: ['존', '존맛', '존맛탱', '존맛탱구', '존맛탱구리'],
          isLiked: false,
          isMyPick: false,
          like: 122,
          onClickLike: () => null,
        }}
      />
      <PlaceListItem
        name="존라멘"
        address="서울시 성동구 장터5길"
        rate={0.5}
        pick={{
          hashtags: ['존', '존맛', '존맛탱', '존맛탱구', '존맛탱구리'],
          isLiked: false,
          isMyPick: false,
          like: 122,
          onClickLike: () => null,
        }}
      />
      <PlaceMapPopup
        name="존라멘"
        address="서울시 성동구 장터5길"
        distance="3km"
        image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format"
      />
    </main>
  )
}

export default Home
