'use client'

import cn from '@/utils/cn'

import { formatDate } from '@/utils/date'
import { Button, Typography } from '../common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import InviteBoardingHeader from './invite-boarding-header'
import { InvitedBoardingPassProps } from './types'

const InvitedBoardingPass = ({
  className,
  mapName,
  owner,
  numOfCrews,
  time,
  isExpired,
  images,
  onClick,
}: InvitedBoardingPassProps) => {
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
        {isExpired ? (
          <Typography size="h4" color="orange-300" className="text-left">
            앗.. 탑승 시간이 지나버렸어요..
          </Typography>
        ) : (
          <Typography size="h4" color="neutral-000" className="text-left">
            {formatDate(time)}
          </Typography>
        )}
      </div>

      {images && !isExpired && (
        <div className="pt-[18px] px-[20px] w-full flex gap-[10px] bg-neutral-600 overflow-x-scroll no-scrollbar">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              className="w-[88px] h-[88px] max-w-[88px] rounded"
              alt={`음식사진 ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="px-[20px] bg-neutral-600">
        <Button disabled={isExpired} className="my-5" onClick={onClick}>
          승선하기
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitedBoardingPass
