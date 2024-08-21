import { Typography } from '@/components'
import InvitedBoardingPass from '@/components/boarding-pass/invited-boarding-pass'
import InvitedExpiredBoardingPass from '@/components/boarding-pass/invited-expired-boarding-pass'
import { getMapInviteInfo } from '@/services/invitation'
import { APIError } from '@/models/interface'

const getInfo = async (inviteCode: string) => {
  try {
    const info = await getMapInviteInfo(inviteCode)
    return { info, isExpired: false }
  } catch (error) {
    if (error instanceof APIError && error.status === 410) {
      return { info: null, isExpired: true }
    }
    return { info: null, isExpired: undefined }
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

  if (!inviteCode)
    return (
      <Typography size="h1" className="mx-5">
        초대장이 존재하지 않습니다.
      </Typography>
    )

  const { info: mapInviteInfo, isExpired } = await getInfo(inviteCode)

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
      ) : mapInviteInfo ? (
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
      ) : (
        <Typography size="h1">문제가 발생했어요</Typography>
      )}
    </div>
  )
}

export default Invite
