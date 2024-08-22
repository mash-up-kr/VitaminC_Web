'use client'

import cn from '@/utils/cn'
import { Button, QRCode } from '@/components/common'
import BoardingBottom from './boarding-bottom'
import BoardingDivider from './boarding-divider'
import InviteBoardingPassInfo from './invite-boarding-pass-info'
import type { InvitingBoardingPassProps } from './types'
import useKakaoShare from '@/hooks/use-kakao-share'

const InvitingBoardingPass = ({
  className,
  inviteCode,
  mapName,
  creator,
  numOfCrews,
  expirationTime,
}: InvitingBoardingPassProps) => {
  const shareInvite = useKakaoShare()

  const handleClickShareButton = () => {
    shareInvite(inviteCode, expirationTime)
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <InviteBoardingPassInfo
        mapName={mapName}
        creator={creator}
        numOfCrews={numOfCrews}
        expirationTime={expirationTime}
      />

      <BoardingDivider />

      <div className="w-full flex justify-center bg-neutral-600 pt-1">
        <QRCode
          url={`${window.location.origin}/invite?code=${inviteCode}`}
          size={160}
        />
      </div>

      <div className="px-[20px] bg-neutral-600 mt-[-0.5px]">
        <Button className="my-5" onClick={handleClickShareButton}>
          카카오톡으로 공유
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitingBoardingPass
