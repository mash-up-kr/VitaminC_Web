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

        <div className="flex flex-col gap-4 px-5 pt-5">
          {myMapList?.map((map) => <MyMapCard key={map.id} mapId={map.id} />)}
        </div>

        <div className="flex items-center justify-center gap-[10px] px-[11.5px] pb-5">
          <Link
            href="/map/create"
            className="mt-5 flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-500 px-[24px] py-[12px]"
          >
            <Icon type="plus" size="md" />
            <Typography size="body1" color="neutral-000">
              새로운 지도
            </Typography>
          </Link>

          <Link
            href="/map/search"
            className="mt-5 flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-500 px-[24px] py-[12px]"
          >
            <Icon type="search" size="md" fill="neutral-000" />
            <Typography size="body1" color="neutral-000">
              지도 둘러보기
            </Typography>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MyMap
