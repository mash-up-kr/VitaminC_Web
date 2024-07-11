import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { Typography } from '@/components/common'
import ConfirmCancelButton from '@/components/confirm-cancel-button'
import { newMapIdStorage } from '@/utils/storage'
import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/utils/storage/index'
import InvitingBoardingPass from '@/components/boarding-pass/inviting-boarding-pass'

const Invite = () => {
  const router = useRouter()
  const [showInvitation, setShowInvitation] = useState(false)

  const goHome = () => {
    const mapId = newMapIdStorage.getValueOrNull() || ''

    newMapIdStorage.remove()
    setCookie(RECENT_MAP_ID, mapId)

    router.push(`/map/${mapId}`)
  }

  const handleShowInvitation = () => {
    setShowInvitation(!showInvitation)
  }

  const sendInvitation = () => {
    // TODO: API - GET 지도 정보 => InvitingBoardingPass props
    handleShowInvitation()
  }

  return (
    <>
      {showInvitation && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-[100dvh] flex items-center px-5 bg-black bg-opacity-85"
            onTap={handleShowInvitation}
          >
            <InvitingBoardingPass
              mapName="비타민C"
              owner="주병호"
              numOfCrews={9}
              time={new Date()}
              url=""
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
            className="h-[220px] object-contain"
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
