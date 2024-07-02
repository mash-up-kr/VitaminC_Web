import { Button, Chip, ChipButton, QRCode, Typography } from '@/components'
import PlaceMapPopup from '@/components/place-map-popup'

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-600">
      <PlaceMapPopup
        name="맛집이름식당명"
        distance="123m"
        address="서울시 성동구 장터5길"
        category="일본식 라멘"
        image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
        pick={{
          hashtags: ['존맛', '존맛탱', '존맛탱구리', '핵존맛', '쏘 딜리셔스'],
          isLiked: false,
          isMyPick: true,
          like: 23,
          onClickLike: () => null,
        }}
      />
    </main>
  )
}

export default Home
