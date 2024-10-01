import type { PlaceType } from '@/models/api/place'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import PlaceItem from './place-item'
import { APIError } from '@/models/api'
import { notify } from '@/components/common/custom-toast'

const LikedPlacePanel = ({ userId }: { userId: User['id'] }) => {
  const [mapId, setMapId] = useState<MapInfo['id']>('')
  const [places, setPlaces] = useState<PlaceType[]>([])
  useEffect(() => {
    const getLikedPlace = async () => {
      try {
        const currentMapId = await getMapId()
        if (!currentMapId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(currentMapId)
        const { data } = await api.place.like.mapId.userId.get({
          mapId: currentMapId,
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
  }, [userId])

  console.log(places)
  return (
    <div role="tabpanel" id="tappanel-liked" aria-labelledby="tap-liked">
      <div className="flex flex-col gap-2.5 py-[18px]">
        {places.map((place) => (
          <PlaceItem
            key={place.place.id}
            className="border-1 border-neutral-500 bg-neutral-600"
            mapId={mapId}
            selectedPlace={place}
          />
        ))}
      </div>
    </div>
  )
}

export default LikedPlacePanel
