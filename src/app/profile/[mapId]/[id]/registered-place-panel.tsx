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
import { INITIAL_VISIBLE_PLACE_LENGTH } from './liked-place-panel'
import ChipButton from '@/components/common/chip-button'

const RegisterededPlacePanel = ({
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
      <>
        <div className="flex flex-col gap-2.5 py-[18px]">
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
          <div className="flex h-[71px] w-full items-center justify-center">
            <ChipButton
              fontSize="body3"
              rightIcon={{
                type: 'caretDown',
                size: 'sm',
                stroke: 'neutral-000',
              }}
              onClick={() => {
                setShowMorePlace(true)
              }}
            >
              더보기
            </ChipButton>
          </div>
        )}
      </>
    )
  }

  useEffect(() => {
    if (places) {
      setShowMorePlace(places.length <= INITIAL_VISIBLE_PLACE_LENGTH)
    }
  }, [places])

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
