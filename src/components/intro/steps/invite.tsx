'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Typography } from '@/components/common'
import ConfirmCancelButton from '@/components/confirm-cancel-button'
import InvitingBoardingPass from '@/components/boarding-pass/inviting-boarding-pass'
import type { MapInviteInfo } from '@/components/boarding-pass/types'
import { notify } from '@/components/common/custom-toast'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import { APIError } from '@/models/interface'
import useSafeRouter from '@/hooks/use-safe-router'
import { getMapInviteInfo } from '@/services/invitation'

const Invite = () => {
  const router = useSafeRouter()
  const [mapId, setMapId] = useState<string | undefined>()
  const [mapInviteInfo, setMapInviteInfo] = useState<MapInviteInfo | undefined>(
    undefined,
  )
  const [showInvitation, setShowInvitation] = useState(false)

  useEffect(() => {
    const getAndSetMapId = async () => {
      try {
        const id = await getMapId()

        if (!id) {
          throw new Error('잘못된 접근입니다.')
        }

        setMapId(id)
      } catch {
        notify.error('예상치 못한 오류가 발생했습니다.')
      }
    }

    getAndSetMapId()
  }, [])

  const goHome = () => {
    router.push(`/map/${mapId}`)
  }

  const handleShowInvitation = () => {
    setShowInvitation(!showInvitation)
  }

  const getMapInviteCode = async (id: string) => {
    try {
      const res = await api.maps.id.inviteLinks.post(id)
      const inviteCode = res.data.token
      if (inviteCode) {
        const info = await getMapInviteInfo(inviteCode)
        setMapInviteInfo(info)
        handleShowInvitation()
      }
    } catch (error) {
      if (error instanceof APIError || error instanceof Error) {
        notify.error(error.message)
      }
    }
  }

  const sendInvitation = () => {
    if (mapId) {
      getMapInviteCode(mapId)
    }
  }

  return (
    <>
      {showInvitation && mapInviteInfo && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-[100dvh] flex items-center px-5 bg-black bg-opacity-85"
            onTap={handleShowInvitation}
          >
            <InvitingBoardingPass
              mapName={mapInviteInfo.mapName}
              creator={mapInviteInfo.creator}
              numOfCrews={mapInviteInfo.numOfCrews}
              expirationTime={mapInviteInfo.expirationTime}
              inviteCode={mapInviteInfo.inviteCode}
            />
          </motion.div>
        </>
      )}

      <div className="flex-1">
        <div className="py-12 px-5">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line mb-4"
          >
            {`항해를 같이할\n동료를 초대해보세요`}
          </Typography>
          <Typography
            size="body1"
            color="neutral-200"
            className="whitespace-pre-line"
          >
            {`맛집지도를 함께 만들 친구에게\n초대장을 보내보세요`}
          </Typography>
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            className="w-full h-[220px] object-fill"
            src="/images/invitation.png"
            alt="초대장"
          />
        </div>
      </div>

      <div className="p-5 w-full">
        <ConfirmCancelButton
          cancelLabel="홈으로"
          confirmLabel="초대장 보내기"
          onCancel={goHome}
          onConfirm={sendInvitation}
        />
      </div>
    </>
  )
}

export default Invite
