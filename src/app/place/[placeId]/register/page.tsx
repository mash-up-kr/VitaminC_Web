import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { RECENT_MAP_ID } from '@/utils/storage/index'

const PlaceRegister = ({
  searchParams,
}: {
  searchParams?: { mapId?: string; search?: string }
}) => {
  // TODO: cookie에 recentMapId가 없는 경우, api 호출을 통해 받아온 지도 중 첫 번째 지도 id 사용
  const recentMapId = cookies().get(RECENT_MAP_ID) || ''

  if (!searchParams?.mapId) {
    redirect(`/map/${recentMapId}`)
  }

  return <>맛집 등록 페이지</>
}

export default PlaceRegister
