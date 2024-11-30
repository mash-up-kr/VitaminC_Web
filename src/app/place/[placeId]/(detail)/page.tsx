import dynamic from 'next/dynamic'

import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'

const PlaceDetail = dynamic(() => import('./place-detail'), { ssr: false })

const Place = async ({ params }: { params?: { placeId?: number } }) => {
  const mapId = (await getMapId()) || ''
  const response =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = response?.data

  return place && <PlaceDetail place={place} mapId={mapId} />
}

export default Place
