import { Typography } from '@/components'
import InvitedBoardingPass from '@/components/boarding-pass/invited-boarding-pass'
import InvitedExpiredBoardingPass from '@/components/boarding-pass/invited-expired-boarding-pass'
import type { MapInviteInfo } from '@/components/boarding-pass/types'
import { getMapInviteInfo } from '@/services/invitation'

const getInfo = async (inviteCode: string) => {
  try {
    const info = await getMapInviteInfo(inviteCode)
    return info
  } catch (err) {
    return undefined
  }
}

const Invite = async ({
  searchParams,
}: {
  searchParams?: {
    code?: string
  }
}) => {
  const inviteCode = searchParams?.code

  if (!inviteCode) return <>초대장이 존재하지 않습니다.</>

  const mapInviteInfo: MapInviteInfo | undefined = await getInfo(inviteCode)

  const isExpired = !mapInviteInfo || !mapInviteInfo.expirationTime

  return (
    <div className="mx-5">
      {isExpired ? (
        <>
          <Typography size="h1" className="mt-12 mb-4 whitespace-pre-line">
            {`유효기간이 만료된\n초대입니다`}
          </Typography>
          <Typography size="body1" color="neutral-200" className="mb-12">
            초대를 다시 요청해보세요.
          </Typography>
          <InvitedExpiredBoardingPass />
        </>
      ) : (
        <>
          <Typography size="h1" className="my-12">
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
      )}
    </div>
  )
}

export default Invite
