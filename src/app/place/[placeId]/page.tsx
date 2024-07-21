import { getMapId } from '@/services/map-id'
import { PLACE_DETAIL_DATA } from '@/constants/place'
import PlaceBox from './place-box'

const PlaceDetail = async ({
  searchParams,
}: {
  searchParams?: { mapId?: string; search?: string }
}) => {
  const recentMapId = getMapId()
  // TODO: place/id api 연결
  const place = { data: PLACE_DETAIL_DATA }

  return (
    <>
      <PlaceBox place={place.data} />
    </>
  )
}

export default PlaceDetail
