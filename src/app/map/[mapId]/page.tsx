'use client'

import { useEffect, useState } from 'react'
import { Avatar, Icon, Typography } from '@/components'
import Tooltip from '@/components/tooltip'
import Link from 'next/link'
import { visitedMapIdsStorage } from '@/utils/storage'
import SearchAnchorBox from './search-anchor-box'
import { PLACE_LIST_DATA } from '@/constants/place'
import KorrkKakaoMap from '@/components/korrk-kakao-map'

const MAP_DATA = {
  id: '123',
  name: '바이타민C',
}

const MapMain = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const visitedMapIds = visitedMapIdsStorage.getValueOrNull() ?? []

  useEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  return (
    <>
      <header className="absolute inset-x-5 z-50 top-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <Link href="" className="flex items-center">
            <Typography size="h3">{MAP_DATA.name}</Typography>
            <Icon type="caretDown" size="lg" />
          </Link>
          <Avatar value="홍길동" />
        </div>
        <Tooltip
          open={isTooltipOpen}
          label="원하는 장소를 등록해서 맛집을 등록해보세요!"
          onClose={() => {
            setIsTooltipOpen(false)
            visitedMapIdsStorage.set([
              ...(visitedMapIdsStorage.getValueOrNull() ?? []),
              mapId,
            ])
          }}
        >
          <SearchAnchorBox mapId={mapId} />
        </Tooltip>
      </header>
      <KorrkKakaoMap
        bottomBodyElement={<div>BottomBody</div>}
        places={PLACE_LIST_DATA}
      />
    </>
  )
}

export default MapMain
