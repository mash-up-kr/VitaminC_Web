'use client'

import { sendGAEvent } from '@next/third-parties/google'
import BoardingBottom from './boarding-bottom'
import BoardingDivider from './boarding-divider'
import InviteBoardingPassInfo from './invite-boarding-pass-info'
import type { InvitingBoardingPassProps } from './types'

import Button from '@/components/common/button'
import QRCode from '@/components/common/qr-code'
import useKakaoShare from '@/hooks/use-kakao-share'
import cn from '@/utils/cn'

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

    sendGAEvent({
      category: 'invitation',
      action: 'click',
      label: 'invitation',
    })
  }

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <InviteBoardingPassInfo
        mapName={mapName}
        creator={creator}
        numOfCrews={numOfCrews}
        expirationTime={expirationTime}
      />

      <BoardingDivider />

      <div className="flex w-full justify-center bg-neutral-600 pt-1">
        <QRCode
          url={`${window.location.origin}/invite?code=${inviteCode}`}
          size={160}
        />
      </div>

      <div className="mt-[-0.5px] bg-neutral-600 px-[20px]">
        <Button className="my-5" onClick={handleClickShareButton}>
          카카오톡으로 공유
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitingBoardingPass
