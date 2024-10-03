import type { PlaceType } from '@/models/api/place'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import PlaceItem from './place-item'
import { APIError } from '@/models/api'
import { notify } from '@/components/common/custom-toast'
import EmptyPlaceList from '@/components/place/empty-place-list'
import PlacePopupSkeleton from '@/components/place/place-popup-skeleton'

const RegisterededPlacePanel = ({
  userId,
  mapId,
}: {
  userId: User['id']
  mapId: MapInfo['id']
}) => {
  const [places, setPlaces] = useState<PlaceType[]>([])

  const renderPlaces = () => {
    if (typeof places === 'undefined') {
      return (
        <div className="flex flex-col gap-2.5 py-[18px]">
          <PlacePopupSkeleton />
          <PlacePopupSkeleton />
          <PlacePopupSkeleton />
        </div>
      )
    }
    if (places.length === 0) {
      return (
        <EmptyPlaceList
          className="pt-[75px]"
          message="등록하거나 좋아요한 맛집이 없어요"
        />
      )
    }

    return (
      <div className="flex flex-col gap-2.5 py-[18px]">
        {places.map((place) => (
          <PlaceItem
            key={place.place.id}
            className="w-full border-[1px] border-neutral-500 bg-neutral-600"
            mapId={mapId}
            selectedPlace={place}
          />
        ))}
      </div>
    )
  }

  useEffect(() => {
    const getRegisteredPlace = async () => {
      try {
        const { data } = await api.place.mapId.userId.get({
          mapId,
          userId,
        })
        setPlaces(data)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        } else {
          notify.error('에러가 발생했습니다.')
        }
      }
    }

    getRegisteredPlace()
  }, [userId, mapId])

  return (
    <div
      role="tabpanel"
      id="tappanel-tappanel-register"
      aria-labelledby="tap-tappanel-register"
    >
      {renderPlaces()}
    </div>
  )
}

export default RegisterededPlacePanel
