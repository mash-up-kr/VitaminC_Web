'use client'

import cn from '@/utils/cn'
import { formatDate } from '@/utils/date'
import { Button, QRCode, Typography } from '../common'
import BoardingBottom from './boarding-bottom'
import BoardingDivider from './boarding-divider'
import InviteBoardingHeader from './invite-boarding-header'
import { InvitingBoardingPassProps } from './types'

const InvitingBoardingPass = ({
  className,
  mapName,
  owner,
  numOfCrews,
  time,
  url,
}: InvitingBoardingPassProps) => {
  const handleClickShareButton = () => {
    console.log('share', url)
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <InviteBoardingHeader
        mapName={mapName}
        owner={owner}
        numOfCrews={numOfCrews}
      />

      <BoardingDivider />

      <div className="pt-2 px-5 flex flex-col gap-1 bg-neutral-600">
        <Typography size="body4" color="neutral-300" className="text-left">
          Boarding Time
        </Typography>
        <Typography size="h4" color="neutral-000" className="text-left">
          {formatDate(time)}
        </Typography>
      </div>

      <BoardingDivider />

      <div className="w-full flex justify-center bg-neutral-600 pt-1">
        <QRCode url={url} size={160} />
      </div>

      <div className="px-[20px] bg-neutral-600">
        <Button className="my-5" onClick={handleClickShareButton}>
          카카오톡으로 공유
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitingBoardingPass
