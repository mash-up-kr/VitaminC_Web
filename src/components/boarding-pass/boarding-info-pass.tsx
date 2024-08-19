'use client'

import cn from '@/utils/cn'

import { useEffect, useState } from 'react'

import { Icon, Typography } from '@/components/common'
import BoardingDivider from './boarding-divider'
import BoardingBottom from './boarding-bottom'
import BoardingMembers from './boarding-members'
import { BoardingInfoPassProps, InvitingBoardingPassProps } from './types'
import BottomModal from '../BottomModal'
import { notify } from '@/components/common/custom-toast'
import { api } from '@/utils/api'
import { APIError } from '@/models/interface'
import Modal from '@/components/common/Modal/Modal'
import InvitingBoardingPass from './inviting-boarding-pass'
import useSafeRouter from '@/hooks/use-safe-router'
import useFetch from '@/hooks/use-fetch'

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
  mapName,
  day,
  numOfPins,
  numOfCrews,
  members,
  creator,
}: BoardingInfoPassProps) => {
  const { data: user } = useFetch(api.users.me.get, { key: ['user'] })

  const [isOpenInviteBoardingPass, setIsOpenInvitedBoardingPass] =
    useState(false)
  const [isInvited, setIsInvited] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [mapInviteInfo, setMapInviteInfo] =
    useState<InvitingBoardingPassProps>()

  const router = useSafeRouter()

  const isMyBoard = members.some(
    (member) => user && user.id === member.id && member.role === 'ADMIN',
  )

  const handleExitMap = async () => {
    try {
      const { data: mapList } = await api.maps.get()
      if (mapList.length === 1) {
        notify.error('최소 1개의 지도에는 속해있어야 합니다.')
        return
      }
      await api.users.maps.mapId.delete({ mapId })
      const { data: maps } = await api.maps.get()
      if (maps.length === 0) {
        throw new Error('지도가 존재하지 않습니다')
      }
      notify.success('지도에 나가졌습니다.')
      router.push(`/map/${maps[0].id}`)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        return
      }
      notify.error('예상치 못한 에러가 발생했습니다. ')
    }
  }

  const getMapInviteInfo = async (inviteCode: string) => {
    try {
      const res = await api.maps.inviteLinks.get(inviteCode)
      const data = res.data
      setMapInviteInfo({
        inviteCode: data.inviteLink.token,
        expirationTime: new Date(data.inviteLink.expiresAt),
        mapName: data.map.name,
        creator: data.map.createBy,
        numOfCrews: data.map.users.length,
      })
      setIsOpenInvitedBoardingPass(true)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  const handleIssuedInviteCode = async () => {
    try {
      const { data } = await api.maps.id.inviteLinks.post(mapId)
      setIsInvited(true)
      getMapInviteInfo(data.token)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        return
      }
      notify.error('예상치 못한 에러가 발생했습니다. ')
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
          <img
            src="/images/ship.png"
            aria-hidden
            className="w-[31px] h-[35px]"
          />
          <Typography size="h5" color="neutral-300">
            {day.toLocaleString()}일째 항해중
          </Typography>
        </div>

        <div className="w-full pt-5 px-5 flex bg-neutral-600 mt-[-0.5px]">
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

        <BoardingMembers
          members={members}
          creator={creator}
          userId={user?.id || -1}
        />

        <div className="flex justify-center bg-neutral-600 pb-5 mt-[-0.5px]">
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
        title={`정말 ${mapName}지도를 나가시겠어요?`}
        cancelMessage="아니요"
        confirmMessage="나가기"
        onClose={() => setIsExitModalOpen(false)}
        onCancel={() => setIsExitModalOpen(false)}
        onConfirm={handleExitMap}
      />
      {mapInviteInfo && (
        <Modal
          isOpen={isOpenInviteBoardingPass}
          onClose={() => setIsOpenInvitedBoardingPass(false)}
          dimClassName="z-[9998]"
          className="z-[9999] w-full max-w-[420px] px-5"
        >
          <InvitingBoardingPass
            inviteCode={mapInviteInfo.inviteCode}
            expirationTime={new Date(mapInviteInfo.expirationTime)}
            mapName={mapInviteInfo.mapName}
            numOfCrews={mapInviteInfo.numOfCrews}
            creator={mapInviteInfo.creator}
          />
        </Modal>
      )}
    </>
  )
}

export default BoardingInfoPass
