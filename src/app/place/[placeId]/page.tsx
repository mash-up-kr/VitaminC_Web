import { redirect } from 'next/navigation'
import { getMapId } from '@/services/map-id'

const PlaceDetail = async ({
  searchParams,
}: {
  searchParams?: { mapId?: string; search?: string }
}) => {
  const recentMapId = getMapId()

  if (!searchParams?.mapId) {
    redirect(`/map/${recentMapId}`)
  }

  return <>맛집 상세 화면</>
}

export default PlaceDetail
