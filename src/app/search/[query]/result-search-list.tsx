'use client'

import PlaceListItem from '@/components/place/place-list-item'
import type { ClassName } from '@/models/interface'
import { getMapId } from '@/services/map-id'
import type { SearchPlace } from '@/types/api/place'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import EmptyResultBox from '../empty-result-box'
import useFetch from '@/hooks/use-fetch'

interface ResultSearchListBoxProps extends ClassName {
  places: SearchPlace[]
}

const ResultSearchListBox = ({
  className,
  places,
}: ResultSearchListBoxProps) => {
  const { data: user } = useFetch(api.users.me.get, { key: ['user'] })

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
          return (
            <PlaceListItem
              key={place.kakaoId}
              category={place.category}
              categoryIconCode={place.categoryIconCode}
              placeId={place.kakaoId}
              name={place.placeName}
              rating={place.score}
              pick={
                typeof place.createdBy !== 'undefined'
                  ? {
                      isLiked:
                        !!place.likedUserIds?.find((id) => id === user?.id) ||
                        false,
                      numOfLikes: place.likedUserIds?.length ?? 0,
                      isMyPick: place.createdBy?.nickname === user?.nickname,
                      onClickLike: () => handleLikePlace(place.placeId),
                    }
                  : undefined
              }
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
