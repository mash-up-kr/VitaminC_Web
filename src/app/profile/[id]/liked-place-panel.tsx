import { PlaceType } from '@/models/api/place'
import { MapInfo } from '@/models/map'
import { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import PlaceItem from './place-item'

const LikedPlacePanel = ({ userId }: { userId: User['id'] }) => {
  const [mapId, setMapId] = useState<MapInfo['id']>('')
  const [places, setPlaces] = useState<PlaceType[]>([])
  useEffect(() => {
    const getLikedPlace = async () => {
      try {
        const mapId = await getMapId()
        if (!mapId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(mapId)
        const { data } = await api.place.like.mapId.userId.get({
          mapId,
          userId,
        })
        setPlaces(data)
      } catch (error) {}
    }

    getLikedPlace()
  }, [userId])

  console.log(places)
  return (
    <div role="tabpanel" id="tappanel-liked" aria-labelledby="tap-liked">
      <div className="flex gap-2.5 py-[18px]">
        {places.map((place) => (
          <PlaceItem
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
