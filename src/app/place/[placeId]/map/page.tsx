import PlaceMapBox from '@/app/place/[placeId]/map/place-map-box'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'

const PlaceMap = async ({ params }: { params?: { placeId?: number } }) => {
  const mapId = (await getMapId()) || ''
  const response =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = response?.data

  return place && <PlaceMapBox place={place} mapId={mapId} />
}

export default PlaceMap
