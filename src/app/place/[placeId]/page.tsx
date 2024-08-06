'use client'

import { useEffect, useState } from 'react'

import PlaceBox from './place-box'
import type { PlaceDetail as PlaceDetailType } from '@/types/api/place'
import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/interface'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import LoadingIndicator from '@/components/loading-indicator'

const PlaceDetail = ({ params }: { params?: { placeId?: number } }) => {
  const [place, setPlace] = useState<PlaceDetailType | null>(null)
  const [mapId, setMapId] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const mapIdFromCookie = await getMapId()

        if (!mapIdFromCookie || !params?.placeId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(mapIdFromCookie)

        const response = await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params.placeId,
        })

        setPlace(response.data)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
          return
        }
        notify.error('예상치 못한 오류가 발생했습니다. ')
      }
    })()
  }, [mapId, params?.placeId])

  return (
    <>
      {place ? <PlaceBox place={place} mapId={mapId} /> : <LoadingIndicator />}
    </>
  )
}

export default PlaceDetail
