'use client'

import cn from '@/utils/cn'

import { Button, Typography } from '../common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import type { ClassName } from '../../models/interface'

const InvitedExpiredBoardingPass = ({ className }: ClassName) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="justify-content flex flex-col items-center gap-1 rounded-t-3xl bg-neutral-600 pt-5">
        <img src="/images/ship.png" aria-hidden className="h-[35px] w-[31px]" />
        <Typography size="h5" color="neutral-300">
          Boarding Pass
        </Typography>
      </div>

      <BoardingDivider />

      <div className="flex flex-col gap-1 bg-neutral-600 px-5 pt-2">
        <Typography size="body4" color="neutral-300" className="text-left">
          Boarding Time
        </Typography>
        <Typography size="h4" color="orange-300" className="text-left">
          앗.. 탑승 시간이 지나버렸어요..
        </Typography>
      </div>

      <div className="bg-neutral-600 px-[20px]">
        <Button disabled className="my-5">
          승선하기
        </Button>
      </div>

      <BoardingBottom />
    </div>
  )
}

export default InvitedExpiredBoardingPass
