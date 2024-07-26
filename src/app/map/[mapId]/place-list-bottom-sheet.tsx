'use client'

import { FilterButton } from '@/components'
import PlaceListItem from '@/components/place/place-list-item'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { PlaceType } from '@/types/api/place'
import { formatDistance, getDistance } from '@/utils/location'
import { FilterIdsType } from './page'
import { useEffect, useState } from 'react'
import { User } from '@/models/user.interface'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import { MapInfo } from '@/models/map.interface'
import { getMapId } from '@/services/map-id'

interface PlaceListBottomSheetProps {
  places: PlaceType[]
  selectedFilter?: FilterIdsType
  onClickFilterButton: VoidFunction
}

const PlaceListBottomSheet = ({
  places,
  selectedFilter,
  onClickFilterButton,
}: PlaceListBottomSheetProps) => {
  const userLocation = useUserGeoLocation()
  const [userId, setUserId] = useState<User['id']>()

  const getIsLike = (place: PlaceType): boolean => {
    if (typeof userId === 'undefined') return false

    if (place.likedUserIds.includes(userId)) return true

    return false
  }
  const handleLike = async (place: PlaceType) => {
    try {
      const mapId = await getMapId()
      if (!mapId) return
      if (getIsLike(place)) {
        await api.place.mapId.placeId.like.delete({ mapId, placeId: place.id })
      } else {
        await api.place.mapId.placeId.like.put({ mapId, placeId: place.id })
      }
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  useEffect(() => {
    const getUserId = async () => {
      try {
        const {
          data: { id },
        } = await api.users.me.get()
        setUserId(id)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        }
      }
    }

    getUserId()
  }, [])

  return (
    <div className="flex flex-col px-5">
      <div>
        <FilterButton
          numOfSelectedFilter={
            (selectedFilter?.category.length ?? 0) +
            (selectedFilter?.tags.length ?? 0)
          }
          icon={{ type: 'filter' }}
          onClick={onClickFilterButton}
        >
          필터
        </FilterButton>
      </div>
      <ul className="flex flex-col ">
        {places.map((place) => (
          <PlaceListItem
            key={`bottom-sheet-${place.place.id}`}
            placeId={place.place.id}
            address={place.place.kakaoPlace.address}
            name={place.place.kakaoPlace.name}
            rating={1}
            category={place.place.kakaoPlace.category}
            distance={formatDistance(
              getDistance(
                userLocation.latitude,
                userLocation.longitude,
                place.place.y,
                place.place.x,
              ),
            )}
            images={place.place.kakaoPlace.photoList}
            tags={place.tags}
            pick={{
              isLiked: getIsLike(place),
              isMyPick: place.createdBy.id === userId,
              numOfLikes: place.likedUserIds.length,

              onClickLike: () => handleLike(place),
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlaceListBottomSheet
