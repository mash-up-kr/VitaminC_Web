import type { PlaceType } from '@/models/api/place'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import PlaceItem from './place-item'
import { APIError } from '@/models/api'
import { notify } from '@/components/common/custom-toast'
import EmptyPlaceList from '@/components/place/empty-place-list'
import PlacePopupSkeleton from '@/components/place/place-popup-skeleton'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'

export const INITIAL_VISIBLE_PLACE_LENGTH = 1

const LikedPlacePanel = ({
  userId,
  mapId,
}: {
  userId: User['id']
  mapId: MapInfo['id']
}) => {
  const [places, setPlaces] = useState<PlaceType[]>()
  const [showMorePlace, setShowMorePlace] = useState(false)

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
      <div className="flex flex-col gap-[30px] py-[18px]">
        <div className="flex flex-col gap-2.5">
          {places
            .slice(
              0,
              showMorePlace ? places.length : INITIAL_VISIBLE_PLACE_LENGTH,
            )
            .map((place) => (
              <PlaceItem
                key={place.place.id}
                className="w-full border-[1px] border-neutral-500 bg-neutral-600"
                mapId={mapId}
                selectedPlace={place}
              />
            ))}
        </div>
        {!showMorePlace && places.length > INITIAL_VISIBLE_PLACE_LENGTH && (
          <div className="flex w-full items-center justify-center">
            <button
              className="flex items-center justify-center gap-2 rounded-full border-[1px] border-neutral-500 px-6 py-3"
              onClick={() => setShowMorePlace(true)}
            >
              <Icon type="plus" />
              <Typography size="body1">더보기</Typography>
            </button>
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (places) {
      setShowMorePlace(places.length <= INITIAL_VISIBLE_PLACE_LENGTH)
    }
  }, [places])

  useEffect(() => {
    const getLikedPlace = async () => {
      try {
        const { data } = await api.place.like.mapId.userId.get({
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

    getLikedPlace()
  }, [userId, mapId])

  return (
    <div role="tabpanel" id="tappanel-liked" aria-labelledby="tap-liked">
      {renderPlaces()}
    </div>
  )
}

export default LikedPlacePanel
