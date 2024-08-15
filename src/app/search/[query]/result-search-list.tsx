'use client'

import PlaceListItem from '@/components/place/place-list-item'
import type { ClassName } from '@/models/interface'
import type { SearchPlace } from '@/types/api/place'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import EmptyResultBox from '../empty-result-box'
import useFetch from '@/hooks/use-fetch'
import { allowUserPositionStorage } from '@/utils/storage'
import { formatDistance, getDistance } from '@/utils/location'
import useUserGeoLocation from '@/hooks/use-user-geo-location'

interface ResultSearchListBoxProps extends ClassName {
  places: SearchPlace[]
  mapId: string
}

const ResultSearchListBox = ({
  className,
  places,
  mapId,
}: ResultSearchListBoxProps) => {
  const { data: user } = useFetch(api.users.me.get, { key: ['user'] })
  const userLocation = useUserGeoLocation()
  const isAllowPosition = allowUserPositionStorage.getValueOrNull()

  const handleLikePlace = async (placeId: SearchPlace['placeId']) => {
    try {
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
          const diffDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            place.y,
            place.x,
          )

          return (
            <PlaceListItem
              key={place.kakaoId}
              category={place.category}
              categoryIconCode={place.categoryIconCode}
              placeId={place.kakaoId}
              name={place.placeName}
              rating={place.score}
              distance={
                isAllowPosition ? formatDistance(diffDistance) : undefined
              }
              tags={place.tags}
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
