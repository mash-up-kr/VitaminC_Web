'use client'

import cn from '@/utils/cn'

import { Icon, Typography } from '../common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import BoardingMembers from './boarding-members'
import { BoardingInfoPassProps } from './types'
import { useEffect, useState } from 'react'
import BottomModal from '../BottomModal'
import { notify } from '../common/custom-toast'
import { api } from '@/utils/api'
//TODO: 유저 정보 쿠키 저장 나오면 변경
const USER_ID = 3

const ShareButton = ({
  isInvited,
  onClickShare,
}: {
  isInvited: boolean
  onClickShare: VoidFunction
}) => {
  return (
    <button
      type="button"
      className="flex justify-center items-center gap-2 rounded-full border border-neutral-500 px-6 py-3"
      onClick={onClickShare}
    >
      <Icon type="shareNetwork" size="md" />
      <Typography size="h5" color="neutral-000">
        {isInvited ? '초대장 다시 보내기' : '초대장 보내기'}
      </Typography>
    </button>
  )
}

const ExitButton = ({ onClickExit }: { onClickExit: VoidFunction }) => {
  return (
    <button
      type="button"
      className="w-full h-[34px] flex justify-center items-center"
      onClick={onClickExit}
    >
      <Typography size="h5" color="neutral-500">
        지도 나가기
      </Typography>
    </button>
  )
}

const BoardingInfoPass = ({
  className,
  mapId,
  name,
  day,
  numOfPins,
  numOfCrews,
  members,
  owner,
  onChangeInviteLink,
}: BoardingInfoPassProps) => {
  const [isInvited, setIsInvited] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  // TODO: 사용자 정보 cookie에 저장하는 로직 완성 후 적용
  const isMyBoard =
    members.filter((member) => member.id === USER_ID)[0].role === 'ADMIN'

  const handleExitMap = async () => {
    try {
      const { data: mapList } = await api.maps.get()
      if (mapList.length === 1) {
        notify.error('최소 1개의 지도에는 속해있어야 합니다.')
        return
      }
      await api.users.maps.mapId.delete({ mapId })
      //TODO: 지도 나가기 후 어느 경로로 이동?
      notify.success('지도에 나가졌습니다.')
    } catch (err) {
      notify.error('에러가 발생했습니다. ')
    }
  }

  const handleIssuedInviteCode = async () => {
    try {
      const { data: code } = await api.maps.id.inviteLinks.post(mapId)
      setIsInvited(true)
      onChangeInviteLink(code)
    } catch (err) {
      setIsInvited(false)
    }
  }

  useEffect(() => {
    setIsInvited(false)
  }, [mapId])

  return (
    <>
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
              {numOfCrews.toLocaleString()}명
            </Typography>
          </div>
          <div className="flex flex-col gap-1 flex-1 bg-neutral-600">
            <Typography size="body4" color="neutral-300" className="text-left">
              Pins
            </Typography>
            <Typography size="h4" color="neutral-000" className="text-left">
              {numOfPins.toLocaleString()}개
            </Typography>
          </div>
        </div>

        <BoardingDivider />

        <BoardingMembers members={members} owner={owner} />

        <div className="flex justify-center bg-neutral-600 pb-5">
          {isMyBoard ? (
            <ShareButton
              isInvited={isInvited}
              onClickShare={handleIssuedInviteCode}
            />
          ) : (
            <ExitButton onClickExit={() => setIsExitModalOpen(true)} />
          )}
        </div>

        <BoardingBottom />
      </div>
      <BottomModal
        isOpen={isExitModalOpen}
        title={`정말 ${name}지도를 나가시겠어요?`}
        cancelMessage="아니요"
        confirmMessage="나가기"
        onClose={() => setIsExitModalOpen(false)}
        onCancel={() => setIsExitModalOpen(false)}
        onConfirm={handleExitMap}
      />
    </>
  )
}

export default BoardingInfoPass
