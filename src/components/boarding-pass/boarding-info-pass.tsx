'use client'

import { useState } from 'react'

import BoardingBottom from './boarding-bottom'
import BoardingDivider from './boarding-divider'
import BoardingMembers from './boarding-members'
import InvitingBoardingPass from './inviting-boarding-pass'
import type { BoardingInfoPassProps, InvitingBoardingPassProps } from './types'

import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Modal from '@/components/common/modal'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import { APIError } from '@/models/api/index'
import { getMapInviteInfo } from '@/services/invitation'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { getIsExpiredTime } from '@/utils/date'
import { sendedInviteCodesStorage } from '@/utils/storage'

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
      className="flex items-center justify-center gap-2 rounded-full border border-neutral-500 px-6 py-3"
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
      className="flex h-[34px] w-full items-center justify-center"
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
  const { data: user, revalidate } = useFetch(api.users.me.get, {
    key: ['user'],
  })

  const [isOpenInviteBoardingPass, setIsOpenInvitedBoardingPass] =
    useState(false)

  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [mapInviteInfo, setMapInviteInfo] =
    useState<InvitingBoardingPassProps>()

  const router = useSafeRouter()

  const isMyBoard = members.some(
    (member) => user && user.id === member.id && member.role === 'ADMIN',
  )

  const isInvited = (sendedInviteCodesStorage.getValueOrNull() ?? []).some(
    (code) => {
      if (
        code.mapId === mapId &&
        !getIsExpiredTime(new Date(code.expiredTime))
      ) {
        return true
      }
      return false
    },
  )

  const showInviteInfo = async (token: string) => {
    try {
      const info = await getMapInviteInfo(token)
      setMapInviteInfo(info)
      setIsOpenInvitedBoardingPass(true)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      } else {
        notify.error('예상치 못한 에러가 발생했습니다.')
      }
    }
  }

  const handleExitMap = async () => {
    try {
      const { data: mapList } = await api.maps.get()
      if (mapList.length === 1) {
        notify.error('최소 1개의 지도에는 속해있어야 합니다.')
        return
      }

      await api.users.maps.mapId.delete({ mapId })
      revalidate(['map-list'])
      notify.success(`${mapName} 지도에서 나갔습니다.`)

      const remainingMaps = mapList.filter((map) => map.id !== mapId)
      router.push(`/map/${remainingMaps[0].id}`)
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        return
      }
      notify.error('예상치 못한 에러가 발생했습니다.')
    }
  }

  const handleIssuedInviteCode = async () => {
    const inviteList = sendedInviteCodesStorage.getValueOrNull() ?? []
    try {
      if (isInvited) {
        const inviteData = inviteList.filter((code) => code.mapId === mapId)[0]

        showInviteInfo(inviteData.token)
      } else {
        const { data } = await api.maps.id.inviteLinks.post(mapId)
        sendedInviteCodesStorage.set([
          ...inviteList.filter((code) => code.mapId !== mapId),
          {
            expiredTime: new Date(data.expiresAt),
            mapId: mapId,
            token: data.token,
          },
        ])
        showInviteInfo(data.token)
      }
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      } else {
        notify.error('예상치 못한 에러가 발생했습니다.')
      }
    }
  }

  return (
    <>
      <div className={cn('flex w-full flex-col', className)}>
        <div className="justify-content flex flex-col items-center gap-1 rounded-t-3xl bg-neutral-600 pt-5">
          <img
            src="/images/ship.png"
            aria-hidden
            className="h-[35px] w-[31px]"
          />
          <Typography size="h5" color="neutral-300">
            {day.toLocaleString()}일째 항해중
          </Typography>
        </div>

        <div className="mt-[-0.5px] flex w-full bg-neutral-600 px-5 pt-5">
          <div className="flex flex-1 flex-col gap-1">
            <Typography size="body4" color="neutral-300" className="text-left">
              Crew
            </Typography>
            <Typography size="h4" color="neutral-000" className="text-left">
              {numOfCrews.toLocaleString()}명
            </Typography>
          </div>
          <div className="flex flex-1 flex-col gap-1 bg-neutral-600">
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

        <div className="mt-[-0.5px] flex justify-center bg-neutral-600 pb-5">
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
