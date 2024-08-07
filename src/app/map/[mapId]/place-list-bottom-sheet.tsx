'use client'

import { FilterButton } from '@/components'
import PlaceListItem from '@/components/place/place-list-item'
import { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import type { PlaceType } from '@/types/api/place'
import type { FilterIdsType } from './page'
import useFetch from '@/hooks/use-fetch'

interface PlaceListBottomSheetProps {
  places: PlaceType[]
  mapId: string
  selectedFilter?: FilterIdsType
  onClickFilterButton: VoidFunction
}

const PlaceListBottomSheet = ({
  places,
  mapId,
  selectedFilter,
  onClickFilterButton,
}: PlaceListBottomSheetProps) => {
  const [placeList, setPlaceList] = useState<PlaceType[]>(places)
  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
  })
  const userId = user?.id

  const getIsLike = (place: PlaceType): boolean => {
    if (typeof userId === 'undefined') return false

    if (place.likedUserIds?.includes(userId)) return true

    return false
  }
  const handleLike = async (place: PlaceType) => {
    if (!userId) return
    try {
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
    setPlaceList(places)
  }, [places])

  return (
    <>
      <div className="px-5 sticky top-0 left-0 h-[40px] z-10 bg-[#212124] shadow-[rgba(33,33,36,1)_0px_1px_8px_8px]">
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
      <ul className="flex flex-col px-5">
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
            className="first:pt-0"
          />
        ))}
      </ul>
    </>
  )
}

export default PlaceListBottomSheet
