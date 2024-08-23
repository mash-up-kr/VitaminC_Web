'use client'

import { useState } from 'react'

import EmptyResultBox from '../empty-result-box'

import PlaceListItem from '@/components/place/place-list-item'
import useFetch from '@/hooks/use-fetch'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import type { SearchPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { formatDistance, getDistance } from '@/utils/location'
import { allowUserPositionStorage } from '@/utils/storage'

interface ResultSearchListBoxProps extends ClassName {
  places: SearchPlace[]
  mapId: MapInfo['id']
}

const ResultSearchListBox = ({
  className,
  places,
  mapId,
}: ResultSearchListBoxProps) => {
  const { data: user, revalidate } = useFetch(api.users.me.get, {
    key: ['user'],
  })
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
      revalidate(['places', mapId])
    } catch (error) {}
  }

  const handleUnLikePlace = async (placeId: SearchPlace['placeId']) => {
    try {
      if (!mapId) return
      optimisticUpdateLikeOrUnLike(placeId)
      await api.place.mapId.placeId.like.delete({ placeId, mapId })
      revalidate(['places', mapId])
    } catch (error) {}
  }

  return (
    <ul
      className={cn(
        'no-scrollbar h-fit max-h-[calc(100dvh-60px)] w-full divide-y divide-neutral-600 overflow-y-scroll',
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
