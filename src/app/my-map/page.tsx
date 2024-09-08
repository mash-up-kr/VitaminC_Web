'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import MyMapCard from './my-map-card'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import Icon from '@/components/common/icon'
import Link from 'next/link'

const MyMap = () => {
  const router = useSafeRouter()
  const { data: myMapList } = useFetch(api.maps.get, {
    initialData: [],
    key: ['map-list'],
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
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            내 지도
          </Typography>
        </header>

        <div className="flex flex-col pt-5 px-5 gap-4">
          {myMapList?.map((map) => <MyMapCard key={map.id} mapId={map.id} />)}
        </div>

        <div className="pb-5">
          <Link
            href="/map/create"
            className="flex justify-center items-center mx-auto gap-2 px-[24px] py-[12px] rounded-full border border-neutral-500 w-fit mt-5"
          >
            <Icon type="plus" size="md" />
            <Typography size="body1" color="neutral-000">
              새로운 지도
            </Typography>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MyMap
