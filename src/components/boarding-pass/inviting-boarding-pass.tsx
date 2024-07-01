'use client'

import cn from '@/utils/cn'
import { SINGLE } from './constant'
import { formatDate } from '@/utils/date'
import { Button, QRCode, Typography } from '../common'
import BoardingBottom from './boarding-bottom'
import BoardingDivider from './boarding-divider'

interface InvitingBoardingPassProps {
  className?: string
  mapName: string
  owner: string
  numOfCrew: number
  time: Date
  url: string
}

const InvitingBoardingPass = ({
  className,
  mapName,
  owner,
  numOfCrew,
  time,
  url,
}: InvitingBoardingPassProps) => {
  const handleClickShareButton = () => {
    console.log('share', url)
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <div className="pt-5 flex flex-col gap-1 justify-content items-center bg-neutral-600 rounded-t-3xl">
        <img src="/ship.png" aria-hidden className="w-[31px] h-[35px]" />
        <Typography size="h5" color="neutral-300">
          Boarding Pass
        </Typography>
      </div>

      <div className="w-full pt-5 px-5 flex bg-neutral-600">
        <div className="flex flex-col gap-1 flex-1">
          <Typography size="body4" color="neutral-300" className="text-left">
            Flight
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {mapName}
          </Typography>
        </div>
        <div className="flex flex-col gap-1 flex-1 bg-neutral-600">
          <Typography size="body4" color="neutral-300" className="text-left">
            Crew
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {numOfCrew === SINGLE
              ? owner
              : `${owner} 외 ${(numOfCrew - 1).toLocaleString()}명`}
          </Typography>
        </div>
      </div>

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
