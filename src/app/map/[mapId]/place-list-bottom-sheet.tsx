'use client'

import { FilterButton } from '@/components'
import PlaceListItem from '@/components/place/place-list-item'
import { useEffect, useState } from 'react'
import { User } from '@/models/user.interface'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import { getMapId } from '@/services/map-id'
import type { PlaceType } from '@/types/api/place'
import type { FilterIdsType } from './page'

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
  const [placeList, setPlaceList] = useState<PlaceType[]>(places)
  const [userId, setUserId] = useState<User['id']>()

  const getIsLike = (place: PlaceType): boolean => {
    if (typeof userId === 'undefined') return false

    if (place.likedUserIds?.includes(userId)) return true

    return false
  }
  const handleLike = async (place: PlaceType) => {
    if (!userId) return
    try {
      const mapId = await getMapId()
      if (!mapId) return
      setPlaceList((prevPlaces) =>
        prevPlaces.map((p) =>
          p.place.id === place.place.id
            ? {
                ...p,
                likedUserIds: getIsLike(place)
                  ? p.likedUserIds?.filter((id) => id !== userId)
                  : [...(p.likedUserIds ?? []), userId],
              }
            : p,
        ),
      )
      if (getIsLike(place)) {
        await api.place.mapId.placeId.like.delete({
          mapId,
          placeId: place.place.id,
        })
      } else {
        await api.place.mapId.placeId.like.put({
          mapId,
          placeId: place.place.id,
        })
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

  useEffect(() => {
    setPlaceList(places)
  }, [places])

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
      <ul className="flex flex-col">
        {placeList.map((place) => (
          <PlaceListItem
            key={`bottom-sheet-${place.place.kakaoPlace.id}`}
            placeId={place.place.kakaoPlace.id}
            address={place.place.kakaoPlace.address}
            name={place.place.kakaoPlace.name}
            rating={place.place.kakaoPlace.score ?? 0}
            category={place.place.kakaoPlace.category}
            categoryIconCode={place.place.kakaoPlace.categoryIconCode}
            images={place.place.kakaoPlace.menuList
              .map((menu) => menu.photo)
              .filter((photo) => !!photo)}
            tags={place.tags}
            pick={{
              isLiked: getIsLike(place),
              isMyPick: place.createdBy?.id === userId,
              numOfLikes: place.likedUserIds?.length || 0,

              onClickLike: (e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLike(place)
              },
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlaceListBottomSheet
