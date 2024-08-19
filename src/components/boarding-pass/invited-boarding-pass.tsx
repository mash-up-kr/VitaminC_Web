'use client'

import cn from '@/utils/cn'
import { InvitedBoardingPassProps } from './types'
import { api } from '@/utils/api'
import { APIError } from '@/models/interface'
import InviteBoardingPassInfo from './invite-boarding-pass-info'
import { Button } from '@/components/common'
import BoardingBottom from './boarding-bottom'
import useSafeRouter from '@/hooks/use-safe-router'
import { inviteCodeStorage } from '@/utils/storage'
import { notify } from '@/components/common/custom-toast'
import { ProxyImage } from '@/components'

const InvitedBoardingPass = ({
  className,
  inviteCode,
  mapId,
  mapName,
  creator,
  numOfCrews,
  expirationTime,
  images,
}: InvitedBoardingPassProps) => {
  const router = useSafeRouter()

  const handleClick = async () => {
    try {
      const res = await api.maps.inviteLinks.post(inviteCode)
      if (res.message === 'success') {
        router.push(`/map/${mapId}`)
        notify.success(`${mapName} 지도에 오신 걸 환영합니다!`)
      }
    } catch (error) {
      if (error instanceof APIError) {
        if (error.status === 409) {
          router.push(`/map/${mapId}`)
        } else {
          inviteCodeStorage.set(inviteCode)
          router.push('/intro')
        }
      }
    }
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <InviteBoardingPassInfo
        mapName={mapName}
        creator={creator}
        numOfCrews={numOfCrews}
        expirationTime={expirationTime}
      />

      {images && (
        <div className="pt-[18px] px-[20px] w-full flex gap-[10px] bg-neutral-600 overflow-x-scroll no-scrollbar">
          {images.map((image, index) => (
            <ProxyImage
              key={`${index}-${image}`}
              src={image}
              className="w-[88px] h-[88px] max-w-[88px] rounded"
              alt={`음식사진 ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="px-[20px] bg-neutral-600 mt-[-0.5px]">
        <Button className="my-5" onClick={handleClick}>
          승선하기
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitedBoardingPass
