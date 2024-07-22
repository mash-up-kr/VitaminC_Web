'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { Typography } from '@/components/common'
import ConfirmCancelButton from '@/components/confirm-cancel-button'
import InvitingBoardingPass from '@/components/boarding-pass/inviting-boarding-pass'
import { InvitingBoardingPassProps } from '@/components/boarding-pass/types'
import { notify } from '@/components/common/custom-toast'
import { api } from '@/utils/api'
import { getMapId } from '@/services/map-id'
import { APIError } from '@/models/interface'

const Invite = () => {
  const router = useRouter()
  const [mapId, setMapId] = useState<string | undefined>()
  const [mapInviteInfo, setMapInviteInfo] = useState<
    InvitingBoardingPassProps | undefined
  >(undefined)
  const [showInvitation, setShowInvitation] = useState(false)

  useEffect(() => {
    ;(async () => {
      const id = await getMapId()
      setMapId(id)
    })()
  }, [])

  const goHome = () => {
    router.push(`/map/${mapId}`)
  }

  const handleShowInvitation = () => {
    setShowInvitation(!showInvitation)
  }

  const getMapInviteInfo = async (inviteCode: string) => {
    try {
      const res = await api.maps.inviteLinks.get(inviteCode)
      const data = res.data
      setMapInviteInfo({
        inviteCode: data.inviteLink.token,
        expirationTime: new Date(data.inviteLink.expiresAt),
        mapName: data.map.name,
        owner: data.map.creator,
        numOfCrews: data.map.users.length,
      })
      handleShowInvitation()
    } catch (error) {
      if (error instanceof APIError) {
        notify.error(error.message)
      }
    }
  }

  const getMapInviteCode = async (id: string) => {
    try {
      const res = await api.maps.id.inviteLinks.post(id)
      const inviteCode = res.data.token
      if (inviteCode) {
        getMapInviteInfo(inviteCode)
      }
    } catch (error) {
      if (error instanceof APIError) {
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
              owner={mapInviteInfo.owner}
              numOfCrews={mapInviteInfo.numOfCrews}
              expirationTime={mapInviteInfo.expirationTime}
              inviteCode={mapInviteInfo.inviteCode}
            />
          </motion.div>
        </>
      )}

      <div className="flex-1">
        <div className="pt-12 px-5 mb-12">
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
            src="/image-placeholder.png"
            alt="미정"
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
