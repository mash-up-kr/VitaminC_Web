'use client'

import React, { Suspense, use, useRef } from 'react'

import { fetchData } from '@/app/data'
import BottomSheet from '@/components/bottom-sheet/index'
import { Button } from '@/components/common'
import LoadingIndicator from '@/components/loading-indicator'
import useMap from '@/hooks/use-map'
import { ResponseOk } from '@/models/interface'
import MapBox from '@/components/map-box'

const Message = () => {
  const data: ResponseOk = use(fetchData('/api/delay'))

  return <div>{data?.message}</div>
}

const Page = () => {
  const mapContainer = useRef<HTMLDivElement>(null)

  const { addMarker, setLocation, deleteMarker } = useMap(mapContainer)
  return (
    <>
      <h1 className="text-lg font-semibold">Data received during SSR</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <Message />
      </Suspense>
      <Button className="bg-sky-400" onClick={() => alert('ok!')}>
        클릭
      </Button>
      <Button
        className="bg-sky-400"
        onClick={() =>
          addMarker(1, { latitude: 37.5664, longitude: 126.97782 })
        }
      >
        서울 시청에 마커 추가
      </Button>
      <Button className="bg-sky-400" onClick={() => deleteMarker('test')}>
        서울 시청 마커 삭제
      </Button>
      <Button
        className="bg-sky-400"
        onClick={() => {
          setLocation({ latitude: 37.5664, longitude: 126.97782 })
        }}
      >
        서울 시청으로 위치 조정
      </Button>
      <MapBox ref={mapContainer} />
      <BottomSheet body={<div>body content</div>} />
    </>
  )
}

export default Page
