'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import useSafeRouter from '@/hooks/use-safe-router'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import MapInfoBox from './map-info'
import CrewInfoList from './crew-info-list'
import CrewInfoBottomButton from './crew-info-bottom-button'

const MyMap = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const router = useSafeRouter()
  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
  })

  const { data: mapInfo, refetch } = useFetch(() => api.maps.id.get(mapId), {
    key: ['map', mapId],
  })

  return (
    <>
      <div className="min-h-dvh bg-neutral-700">
        <header className="relative flex items-center pt-4">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            className="p-[10px]"
            onClick={() => router.safeBack()}
          />
        </header>

        {mapInfo && user && (
          <section className="px-5">
            <MapInfoBox
              mapInfo={mapInfo}
              user={user}
              className="py-6"
              refetchMapInfo={refetch}
            />
            <CrewInfoList
              mapInfo={mapInfo}
              user={user}
              refetchMapInfo={refetch}
            />
            <CrewInfoBottomButton mapInfo={mapInfo} user={user} />
          </section>
        )}
      </div>
    </>
  )
}

export default MyMap
