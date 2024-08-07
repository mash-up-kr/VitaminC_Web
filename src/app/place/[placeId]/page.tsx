'use client'

import { useEffect, useState } from 'react'

import PlaceBox from './place-box'
import type { PlaceDetail as PlaceDetailType } from '@/types/api/place'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import LoadingIndicator from '@/components/loading-indicator'
import useFetch from '@/hooks/use-fetch'

const PlaceDetail = ({ params }: { params?: { placeId?: number } }) => {
  const [mapId, setMapId] = useState('')
  const { data: place } = useFetch<PlaceDetailType>(
    () =>
      api.place.mapId.kakao.kakaoPlaceId.get({
        mapId,
        kakaoPlaceId: params?.placeId ?? -1,
      }),
    { enabled: !!mapId && !!params?.placeId },
  )

  useEffect(() => {
    ;(async () => {
      try {
        const validMapId = await getMapId()

        if (!validMapId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(validMapId)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
          return
        }
        notify.error('예상치 못한 오류가 발생했습니다. ')
      }
    })()
  }, [mapId])

  return (
    <>
      {place ? <PlaceBox place={place} mapId={mapId} /> : <LoadingIndicator />}
    </>
  )
}

export default PlaceDetail
