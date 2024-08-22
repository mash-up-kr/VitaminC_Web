import BoardingDivider from './boarding-divider'
import { SINGLE } from './constant'
import type { InviteBoardingPass } from './types'

import { Typography } from '@/components/common'
import { formatDate } from '@/utils/date'

const InviteBoardingPassInfo = ({
  mapName,
  creator,
  numOfCrews,
  expirationTime,
}: InviteBoardingPass) => {
  return (
    <>
      <div className="justify-content flex flex-col items-center gap-1 rounded-t-3xl bg-neutral-600 pt-5">
        <img src="/images/ship.png" aria-hidden className="h-[35px] w-[31px]" />
        <Typography size="h5" color="neutral-300">
          Boarding Pass
        </Typography>
      </div>

      <div className="mt-[-0.5px] flex w-full bg-neutral-600 px-5 pt-5">
        <div className="flex flex-1 flex-col gap-1">
          <Typography size="body4" color="neutral-300" className="text-left">
            Flight
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {mapName}
          </Typography>
        </div>
        <div className="flex flex-1 flex-col gap-1 bg-neutral-600">
          <Typography size="body4" color="neutral-300" className="text-left">
            Crew
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {numOfCrews === SINGLE
              ? creator.nickname
              : `${creator.nickname} 외 ${(numOfCrews - 1).toLocaleString()}명`}
          </Typography>
        </div>
      </div>

      <BoardingDivider />

      <div className="flex flex-col gap-1 bg-neutral-600 px-5 pt-2">
        <Typography size="body4" color="neutral-300" className="text-left">
          Boarding Time
        </Typography>
        <Typography size="h4" color="neutral-000" className="text-left">
          {formatDate(expirationTime)}
        </Typography>
      </div>
    </>
  )
}

export default InviteBoardingPassInfo
