import PlaceListItem from '@/components/place/place-list-item'
import type { ClassName } from '@/models/interface'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import cn from '@/utils/cn'

interface ResultSearchListBoxProps extends ClassName {
  places: KakaoPlaceItem[]
}

const ResultSearchListBox = ({
  className,
  places,
}: ResultSearchListBoxProps) => {
  return (
    <ul
      className={cn(
        'w-full h-fit max-h-[calc(100dvh-60px)] overflow-y-scroll divide-y divide-neutral-600 no-scrollbar',
        className,
      )}
    >
      {places.map((place) => {
        const categories = place.category_name.split(' > ')
        const category = categories[categories.length - 1]
        return (
          <PlaceListItem
            key={place.id}
            category={category}
            placeId={place.id}
            name={place.place_name}
            rating={4.5}
            pick={{
              isLiked: true,
              numOfLikes: 1550,
              isMyPick: true,
              onClickLike: () => console.log('like'),
              hashtags: ['하이', '키키'],
            }}
            address={place.road_address_name}
          />
        )
      })}
    </ul>
  )
}

export default ResultSearchListBox
