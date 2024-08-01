'use client'

import PlaceListItem from '@/components/place/place-list-item'
import useUser from '@/hooks/use-user'
import type { ClassName } from '@/models/interface'
import { getMapId } from '@/services/map-id'
import type { SearchPlace } from '@/types/api/place'
import { api } from '@/utils/api'
import { extractCategory } from '@/utils/category'
import cn from '@/utils/cn'
import EmptyResultBox from '../empty-result-box'

interface ResultSearchListBoxProps extends ClassName {
  places: SearchPlace[]
}

const ResultSearchListBox = ({
  className,
  places,
}: ResultSearchListBoxProps) => {
  const { user } = useUser()

  const handleLikePlace = async (placeId: SearchPlace['placeId']) => {
    try {
      const mapId = await getMapId()

      if (!mapId) return
      await api.place.mapId.placeId.like.put({ placeId, mapId })
    } catch (error) {}
  }

  return (
    <ul
      className={cn(
        'w-full h-fit max-h-[calc(100dvh-60px)] overflow-y-scroll divide-y divide-neutral-600 no-scrollbar',
        className,
      )}
    >
      {places.length > 0 ? (
        places.map((place) => {
          const categories = extractCategory(place.category)
          const category = categories[categories.length - 1]
          return (
            <PlaceListItem
              key={place.kakaoId}
              category={category}
              categoryIconCode={place.categoryIconCode}
              placeId={place.kakaoId}
              name={place.placeName}
              rating={place.score}
              pick={{
                isLiked:
                  !!place.likedUserIds?.find((id) => id === user?.id) || false,
                numOfLikes: place.likedUserIds?.length ?? 0,
                isMyPick: place.createdBy?.nickname === user?.nickname,
                onClickLike: () => handleLikePlace(place.placeId),
              }}
              address={place.address}
            />
          )
        })
      ) : (
        <EmptyResultBox />
      )}
    </ul>
  )
}

export default ResultSearchListBox
