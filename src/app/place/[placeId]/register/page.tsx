'use client'

import { useEffect, useState } from 'react'

import RegisterBox from './register-box'

import { notify } from '@/components/common/custom-toast'
import LoadingIndicator from '@/components/loading-indicator'
import { APIError } from '@/models/interface'
import { getMapId } from '@/services/map-id'
import type { TagItem } from '@/types/api/maps'
import type { PlaceDetail } from '@/types/api/place'
import { api } from '@/utils/api'

const PlaceRegister = ({ params }: { params?: { placeId?: number } }) => {
  const [place, setPlace] = useState<PlaceDetail | null>(null)
  const [tags, setTags] = useState<TagItem[]>([])
  const [mapId, setMapId] = useState<string>('')

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const validMapId = await getMapId()

        if (!validMapId || !params?.placeId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(validMapId)

        const { data: tagData } = await api.maps.id.tag.get(validMapId)
        setTags(tagData)
        const { data: placeData } =
          await api.place.mapId.kakao.kakaoPlaceId.get({
            mapId: validMapId,
            kakaoPlaceId: params.placeId,
          })
        setPlace(placeData)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
          return
        }
        notify.error('예상치 못한 오류가 발생했습니다.')
      }
    }
    fetchTags()
  }, [mapId, params?.placeId])

  return (
    <>
      {place ? (
        <RegisterBox place={place} tags={tags} mapId={mapId} />
      ) : (
        <LoadingIndicator />
      )}
    </>
  )
}

export default PlaceRegister
