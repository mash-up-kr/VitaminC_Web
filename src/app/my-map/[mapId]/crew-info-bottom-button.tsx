import InvitingBoardingPass from '@/components/boarding-pass/inviting-boarding-pass'
import type { InvitingBoardingPassProps } from '@/components/boarding-pass/types'
import BottomModal from '@/components/common/bottom-modal'
import Button from '@/components/common/button'
import { notify } from '@/components/common/custom-toast'
import Modal from '@/components/common/modal'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import { APIError } from '@/models/api'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import { getMapInviteInfo } from '@/services/invitation'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import { getIsExpiredTime } from '@/utils/date'
import { sendedInviteCodesStorage } from '@/utils/storage'
import { useState } from 'react'

interface CrewInfoBottomButtonProps extends ClassName {
  user: User
  mapInfo: MapInfo
}

const CrewInfoBottomButton = ({
  mapInfo,
  user,
  className,
}: CrewInfoBottomButtonProps) => {
  const router = useSafeRouter()
  const { revalidate } = useFetch()

  const [isOpenInviteBoardingPass, setIsOpenInvitedBoardingPass] =
    useState(false)
  const [isOpenExitMapModal, setIsOpenExitMapModal] = useState(false)
  const [mapInviteInfo, setMapInviteInfo] =
    useState<InvitingBoardingPassProps>()

  const isInvited = (sendedInviteCodesStorage.getValueOrNull() ?? []).some(
    (code) => {
      if (
        code.mapId === mapInfo.id &&
        !getIsExpiredTime(new Date(code.expiredTime))
      ) {
        return true
      }
      return false
    },
  )

  const handleExitMap = async () => {
    try {
      const { data: mapList } = await api.maps.get()
      if (mapList.length === 1) {
        notify.error('최소 1개의 지도에는 속해있어야 합니다.')
        return
      }

      await api.users.maps.mapId.delete({ mapId: mapInfo.id })
      revalidate(['map-list'])
      notify.success(`${mapInfo.name} 지도에서 나갔습니다.`)

      router.safeBack({ defaultHref: '/my-map' })
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
        return
      }
      notify.error('예상치 못한 에러가 발생했습니다.')
    }
  }

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

  const handleIssuedInviteCode = async () => {
    const inviteList = sendedInviteCodesStorage.getValueOrNull() ?? []
    try {
      if (isInvited) {
        const inviteData = inviteList.filter(
          (code) => code.mapId === mapInfo.id,
        )[0]

        showInviteInfo(inviteData.token)
      } else {
        const { data } = await api.maps.id.inviteLinks.post(mapInfo.id)
        sendedInviteCodesStorage.set([
          ...inviteList.filter((code) => code.mapId !== mapInfo.id),
          {
            expiredTime: new Date(data.expiresAt),
            mapId: mapInfo.id,
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
      {mapInfo.createBy.id === user.id ? (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-5 h-[102px] flex justify-center items-center invitation-gradient">
          <Button colorScheme="orange" onClick={handleIssuedInviteCode}>
            초대장 보내기
          </Button>
        </div>
      ) : (
        <div className={cn('py-6 w-full', className)}>
          <button
            type="button"
            onClick={() => setIsOpenExitMapModal(true)}
            className="w-full"
          >
            <Typography size="body1" color="neutral-400">
              지도 나가기
            </Typography>
          </button>
        </div>
      )}

      <BottomModal
        layout="confirm"
        title={`정말${mapInfo.name} 지도를\n나가시겠어요?`}
        isOpen={isOpenExitMapModal}
        cancelMessage="아니요"
        confirmMessage="나가기"
        onClose={() => setIsOpenExitMapModal(false)}
        onCancel={() => setIsOpenExitMapModal(false)}
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

export default CrewInfoBottomButton
