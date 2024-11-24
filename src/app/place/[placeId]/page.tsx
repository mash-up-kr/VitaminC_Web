import dynamic from 'next/dynamic'

import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import PlaceMap from '@/app/place/[placeId]/place-map'

const PlaceDetail = dynamic(() => import('./place-detail'), { ssr: false })

const Place = async ({
  params,
  searchParams,
}: {
  params?: { placeId?: number }
  searchParams?: { view: string }
}) => {
  const mapId = (await getMapId()) || ''
  const response =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = response?.data
  const view = searchParams?.view === 'map' ? 'map' : 'detail'

  return (
    place &&
    (view === 'detail' ? (
      <PlaceDetail place={place} mapId={mapId} />
    ) : (
      <PlaceMap place={place} mapId={mapId} />
    ))
  )
}

export default Place
