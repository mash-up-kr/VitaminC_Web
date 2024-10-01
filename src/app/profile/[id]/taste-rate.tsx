'use client'

import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import { APIError } from '@/models/api'
import type { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'

const TasteRate = ({ userId }: { userId: User['id'] }) => {
  const [rate, setRate] = useState(0)

  useEffect(() => {
    const getRate = async () => {
      try {
        const mapId = await getMapId()
        if (!mapId) {
          throw new Error('잘못된 접근입니다.')
        }
        const { data: tasteRate } = await api.place.differ.mapId.userId.get({
          userId,
          mapId,
        })
        setRate(tasteRate ?? 0)
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        } else {
          notify.error('알 수 없는 에러가 발생했습니다. ')
        }
      }
    }

    getRate()
  }, [userId])
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-full border-[1px] px-4 py-3 ${rate <= 33 ? 'border-neutral-300' : rate <= 67 ? 'border-orange-400' : 'border-blue-200'}`}
    >
      <Icon
        type="heartStraightFilled"
        size="lg"
        fill={
          rate <= 33 ? 'neutral-400' : rate <= 67 ? 'orange-400' : 'blue-200'
        }
      />
      <Typography
        size="h5"
        color={
          rate <= 33 ? 'neutral-300' : rate <= 67 ? 'orange-300' : 'blue-100'
        }
      >{`나와 취향 유사도 ${rate}%`}</Typography>
    </div>
  )
}

export default TasteRate
