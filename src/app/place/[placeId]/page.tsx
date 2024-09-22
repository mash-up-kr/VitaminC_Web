import dynamic from 'next/dynamic'

import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'

const PlaceBox = dynamic(() => import('./place-box'), { ssr: false })

const PlaceDetail = async ({ params }: { params?: { placeId?: number } }) => {
  const mapId = (await getMapId()) || ''
  const response =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = response?.data

  return place && <PlaceBox place={place} mapId={mapId} />
}

export default PlaceDetail
