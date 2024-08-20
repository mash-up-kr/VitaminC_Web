'use client'

import { useState } from 'react'

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
import type { MapInfo } from '@/models/map.interface'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

interface ResultSearchListBoxProps extends ClassName {
  places: SearchPlace[]
  mapId: MapInfo['id']
}

const ResultSearchListBox = ({
  className,
  places,
  mapId,
}: ResultSearchListBoxProps) => {
  const { data: user } = useFetch(api.users.me.get, { key: ['user'] })
  const userLocation = useUserGeoLocation()
  const isAllowPosition = allowUserPositionStorage.getValueOrNull()
  const [likeInfoPlaces, setLikeInfoPlaces] = useState(
    [...places].map((place) => ({
      isLike: !!place.likedUserIds?.find((id) => id === user?.id) || false,
      numOfLike: place.likedUserIds?.length ?? 0,
    })),
  )

  useIsomorphicLayoutEffect(() => {
    if (places.length !== likeInfoPlaces.length) {
      setLikeInfoPlaces(
        places.map((place) => ({
          isLike: !!place.likedUserIds?.find((id) => id === user?.id) || false,
          numOfLike: place.likedUserIds?.length ?? 0,
        })),
      )
    }
  }, [likeInfoPlaces.length, places, user?.id])

  const calculateNumOfLike = (place: SearchPlace, isLikePlace: boolean) => {
    const initialNumOfLike = place.likedUserIds?.length || 0

    if (!user?.id) return initialNumOfLike
    if (place.likedUserIds?.includes(user.id)) {
      if (isLikePlace) return initialNumOfLike
      return initialNumOfLike - 1
    }
    if (isLikePlace) return initialNumOfLike + 1
    return initialNumOfLike
  }

  const optimisticUpdateLikeOrUnLike = (placeId: SearchPlace['placeId']) => {
    const willUpdateIndex = places.findIndex(
      (place) => place.placeId === placeId,
    )
    const targetPlace = places[willUpdateIndex]

    if (willUpdateIndex > -1) {
      const nextLikeInfoPlaces = [...likeInfoPlaces]
      nextLikeInfoPlaces[willUpdateIndex] = {
        isLike: !nextLikeInfoPlaces[willUpdateIndex].isLike,
        numOfLike: calculateNumOfLike(
          targetPlace,
          !nextLikeInfoPlaces[willUpdateIndex].isLike,
        ),
      }
      setLikeInfoPlaces(nextLikeInfoPlaces)
    }
  }

  const handleLikePlace = async (placeId: SearchPlace['placeId']) => {
    try {
      if (!mapId) return
      optimisticUpdateLikeOrUnLike(placeId)
      await api.place.mapId.placeId.like.put({ placeId, mapId })
    } catch (error) {}
  }

  const handleUnLikePlace = async (placeId: SearchPlace['placeId']) => {
    try {
      if (!mapId) return
      optimisticUpdateLikeOrUnLike(placeId)
      await api.place.mapId.placeId.like.delete({ placeId, mapId })
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
        places.map((place, index) => {
          const diffDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            place.y,
            place.x,
          )

          const info = likeInfoPlaces[index]

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
                      isLiked: info?.isLike,
                      numOfLikes: info?.numOfLike,
                      isMyPick: place.createdBy?.nickname === user?.nickname,
                      onClickLike: (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (info?.isLike) {
                          handleUnLikePlace(place.placeId)
                        } else {
                          handleLikePlace(place.placeId)
                        }
                      },
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
