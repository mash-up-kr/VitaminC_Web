'use client'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import InvitedBoardingPass from '@/components/boarding-pass/invited-boarding-pass'
import InvitedExpiredBoardingPass from '@/components/boarding-pass/invited-expired-boarding-pass'
import type { MapInviteInfo } from '@/components/boarding-pass/types'
import LoadingIndicator from '@/components/common/loading-indicator'
import Typography from '@/components/common/typography'
import { APIError } from '@/models/api/index'
import { getMapInviteInfo } from '@/services/invitation'

const Invite = () => {
  const searchParams = useSearchParams()
  const inviteCode = searchParams.get('code')

  const [mapInviteInfo, setMapInviteInfo] = useState<MapInviteInfo | null>(null)
  const [isExpired, setIsExpired] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!inviteCode) return

    const getInfo = async () => {
      try {
        const info = await getMapInviteInfo(inviteCode)
        setMapInviteInfo(info)
        setIsExpired(false)
      } catch (error) {
        if (error instanceof APIError && error.status === 410) {
          setIsExpired(true)
          return { info: null, isExpired: true }
        }
        setIsExpired(undefined)
      }
    }

    getInfo()
  }, [inviteCode])

  return (
    <div className="h-dvh bg-neutral-700 px-5">
      {!inviteCode ? (
        <Typography size="h1" className="px-5 py-12">
          초대장이 존재하지 않습니다.
        </Typography>
      ) : isExpired ? (
        <>
          <Typography size="h1" className="whitespace-pre-line pb-4 pt-12">
            {`유효기간이 만료된\n초대입니다`}
          </Typography>
          <Typography size="body1" color="neutral-200" className="pb-12">
            초대를 다시 요청해보세요.
          </Typography>
          <InvitedExpiredBoardingPass />
        </>
      ) : mapInviteInfo ? (
        <>
          <Typography size="h1" className="py-12">
            맛집 지도에 초대되었어요
          </Typography>

          <InvitedBoardingPass
            inviteCode={inviteCode}
            expirationTime={new Date(mapInviteInfo.expirationTime)}
            mapId={mapInviteInfo.mapId}
            mapName={mapInviteInfo.mapName}
            creator={mapInviteInfo.creator}
            numOfCrews={mapInviteInfo.numOfCrews}
            images={mapInviteInfo.images?.filter((photo) => !!photo)}
          />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  )
}

const InvitePage = () => {
  return <Invite />
}

export default InvitePage
