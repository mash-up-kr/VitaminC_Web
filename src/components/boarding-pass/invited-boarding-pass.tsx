'use client'

import cn from '@/utils/cn'
import { InvitedBoardingPassProps } from './types'
import { APIError } from '@/models/interface'
import InviteBoardingPassInfo from './invite-boarding-pass-info'
import { Button } from '@/components/common'
import BoardingBottom from './boarding-bottom'
import useSafeRouter from '@/hooks/use-safe-router'
import { inviteCodeStorage } from '@/utils/storage'
import { notify } from '@/components/common/custom-toast'
import { ProxyImage } from '@/components'
import { boardMap } from '@/services/invitation'

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
      const data = await boardMap(inviteCode)

      router.push(`/map/${mapId}`)
      if (data === 'success') {
        notify.success(`${mapName} 지도에 오신 걸 환영합니다!`)
      }
    } catch (error) {
      if (error instanceof APIError && error.status === 401) {
        inviteCodeStorage.set(inviteCode)
        router.push('/intro')
      } else if (error instanceof Error) {
        notify.error(error.message)
      } else {
        notify.error('예상치 못한 오류가 발생했습니다.')
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
