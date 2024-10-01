import { PlaceType } from '@/models/api/place'
import { MapInfo } from '@/models/map'
import { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import PlaceItem from './place-item'

const RegisterededPlacePanel = ({ userId }: { userId: User['id'] }) => {
  const [mapId, setMapId] = useState<MapInfo['id']>('')
  const [places, setPlaces] = useState<PlaceType[]>([])
  useEffect(() => {
    const getRegisteredPlace = async () => {
      try {
        const mapId = await getMapId()
        if (!mapId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(mapId)
        const { data } = await api.place.mapId.userId.get({
          mapId,
          userId,
        })
        setPlaces(data)
      } catch (error) {}
    }

    getRegisteredPlace()
  }, [userId])
  return (
    <div
      role="tabpanel"
      id="tappanel-tappanel-register"
      aria-labelledby="tap-tappanel-register"
    >
      <div className="flex gap-2.5 py-[18px]">
        {places.map((place) => (
          <PlaceItem
            className="w-full border-[1px] border-neutral-500 bg-neutral-600"
            mapId={mapId}
            selectedPlace={place}
          />
        ))}
      </div>
    </div>
  )
}

export default RegisterededPlacePanel
