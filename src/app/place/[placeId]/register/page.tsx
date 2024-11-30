import RegisterBox from './register-box'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'

const PlaceRegister = async ({ params }: { params?: { placeId?: number } }) => {
  const mapId = (await getMapId()) || ''
  const responsePlace =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = responsePlace?.data
  const responseTags =
    !!mapId && !!params?.placeId ? await api.maps.id.tag.get(mapId) : null
  const tags = responseTags?.data

  return (
    place && tags && <RegisterBox place={place} tags={tags} mapId={mapId} />
  )
}

export default PlaceRegister
