import PlaceListItem from '@/components/place/place-list-item'
import type { ClassName } from '@/models/interface'
import type { PlaceType } from '@/types/api/place'
import { extractCategory } from '@/utils/category'
import cn from '@/utils/cn'

interface ResultSearchListBoxProps extends ClassName {
  places: PlaceType[]
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
        const categories = extractCategory(place.place.kakaoPlace.category)
        const category = categories[categories.length - 1]
        return (
          <PlaceListItem
            key={place.id}
            category={category}
            placeId={place.id}
            name={place.place.kakaoPlace.name}
            rating={4.5}
            pick={{
              isLiked: true,
              numOfLikes: 1550,
              isMyPick: true,
              onClickLike: () => console.log('like'),
            }}
            address={place.place.kakaoPlace.address}
          />
        )
      })}
    </ul>
  )
}

export default ResultSearchListBox
