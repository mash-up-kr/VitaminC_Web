import { redirect } from 'next/navigation'
import { getMapId } from '@/services/map-id'

const PlaceRegister = ({
  searchParams,
}: {
  searchParams?: { mapId?: string; search?: string }
}) => {
  const recentMapId = getMapId()

  if (!searchParams?.mapId) {
    redirect(`/map/${recentMapId}`)
  }

  return <>맛집 등록 페이지</>
}

export default PlaceRegister
