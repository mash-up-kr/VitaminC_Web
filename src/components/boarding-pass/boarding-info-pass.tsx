'use client'

import cn from '@/utils/cn'

import { Icon, Typography } from '../common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import BoardingMembers from './boarding-members'

interface BoardingInfoPassProps {
  className?: string
  day: number
  pins: number
  numOfCrew: number
  members: string[]
  owner: string
}

const ShareButton = ({ isInvited }: { isInvited: boolean }) => {
  return (
    <button
      type="button"
      className="flex justify-center items-center gap-2 rounded-full border border-neutral-500 px-6 py-3"
    >
      <Icon type="shareNetwork" size="md" />
      <Typography size="h5" color="neutral-000">
        {isInvited ? '초대장 다시 보내기' : '초대장 보내기'}
      </Typography>
    </button>
  )
}

const ExitButton = () => {
  return (
    <button
      type="button"
      className="w-full h-[34px] flex justify-center items-center"
    >
      <Typography size="h5" color="neutral-500">
        지도 나가기
      </Typography>
    </button>
  )
}

const BoardingInfoPass = ({
  className,
  day,
  pins,
  numOfCrew,
  members,
  owner,
}: BoardingInfoPassProps) => {
  // TODO: 로직 수정
  const isMyBoard = true

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <div className="pt-5 flex flex-col gap-1 justify-content items-center bg-neutral-600 rounded-t-3xl">
        <img src="/ship.png" aria-hidden className="w-[31px] h-[35px]" />
        <Typography size="h5" color="neutral-300">
          {day.toLocaleString()}일째 항해중
        </Typography>
      </div>

      <div className="w-full pt-5 px-5 flex bg-neutral-600">
        <div className="flex flex-col gap-1 flex-1">
          <Typography size="body4" color="neutral-300" className="text-left">
            Crew
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {numOfCrew.toLocaleString()}명
          </Typography>
        </div>
        <div className="flex flex-col gap-1 flex-1 bg-neutral-600">
          <Typography size="body4" color="neutral-300" className="text-left">
            Pins
          </Typography>
          <Typography size="h4" color="neutral-000" className="text-left">
            {pins.toLocaleString()}개
          </Typography>
        </div>
      </div>

      <BoardingDivider />

      <BoardingMembers members={members} owner={owner} />

      <div className="flex justify-center bg-neutral-600 pb-5">
        {isMyBoard ? <ShareButton isInvited={false} /> : <ExitButton />}
      </div>

      <BoardingBottom />
    </div>
  )
}

export default BoardingInfoPass
