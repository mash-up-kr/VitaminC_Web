'use client'

import React, { Suspense, use, useRef } from 'react'

import { fetchData } from '@/app/data'
import { Button } from '@/components/button'
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

  const { addMarker, setLocation } = useMap(mapContainer)
  return (
    <>
      <h1 className="text-lg font-semibold">Data received during SSR</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <Message />
      </Suspense>
      <Button
        label="클릭 "
        className="bg-sky-400"
        onClick={() => alert('ok!')}
      />
      <Button
        label="서울 시청에 마커 추가"
        className="bg-sky-400"
        onClick={() => addMarker({ latitude: 37.5664, longitude: 126.97782 })}
      />
      <Button
        label="서울 시청으로 위치 조정"
        className="bg-sky-400"
        onClick={() => {
          setLocation({ latitude: 37.5664, longitude: 126.97782 })
        }}
      />
      <MapBox ref={mapContainer} />
    </>
  )
}

export default Page
